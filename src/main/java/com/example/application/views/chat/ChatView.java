package com.example.application.views.chat;

import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.data.ChatMessage;
import com.example.application.services.ChatMessageService;
import com.example.application.services.ConversationService;
import com.example.application.data.Conversation;
import com.example.application.data.Block;
import com.example.application.services.BlockService;

import com.example.application.views.BottomSheet;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.DetachEvent;
import com.vaadin.flow.function.SerializableSupplier;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.server.VaadinSession;

import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;

import org.springframework.beans.factory.annotation.Autowired;
import jakarta.annotation.security.PermitAll;
import jakarta.mail.MessagingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.UnicastProcessor;

import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.Collections;
import java.util.concurrent.atomic.AtomicBoolean;

import java.time.LocalDateTime;
import java.time.Duration;

@PermitAll
@Route("chatView")
public class ChatView extends AppLayout implements HasUrlParameter<Long> {
    private final Logger logger = LoggerFactory.getLogger(ChatView.class);

    private final UnicastProcessor<ChatMessage> publisher;
    private final UnicastProcessor<ChatMessage> publisherLatest;
    private final UnicastProcessor<TypingEvent> publisherTyping;
    private final Flux<ChatMessage> messages;
    private final Flux<TypingEvent> typings;
    private Disposable messagesSubscription;
    private Disposable typingsSubscription;

    @Autowired
    private ConversationService conversationService;
    private final ChatMessageService chatService;
    private final UserServices userService;
    private final BlockService blockService;

    private VerticalLayout messageList = new VerticalLayout();
    private Span statusIndicator = new Span();
    private TextField messageField = new TextField();
    private Span typingIndicatorSpan = new Span();
    private BottomSheet sheet = new BottomSheet();

    private LocalDateTime previousTimestamp = null; // Track the timestamp of the last message in the group

    public ChatView(UnicastProcessor<ChatMessage> publisher, Flux<ChatMessage> messages,
    	ChatMessageService chatService, UserServices userService, UnicastProcessor<ChatMessage> publisherLatest,
    	UnicastProcessor<TypingEvent> publisherTyping, Flux<TypingEvent> typings, BlockService blockService) {
        this.publisher = publisher;
        this.messages = messages;
        this.publisherLatest = publisherLatest;
        this.publisherTyping = publisherTyping;
        this.typings = typings;
        this.chatService = chatService;
        this.userService = userService;
        this.blockService = blockService;
        addClassName("chat-app-layout");
        messageList.addClassName("chat-message-list");
        messageList.scrollIntoView();
        messageList.getElement().executeJs("this.scrollTop = this.scrollHeight;");
    }

    @Override
    public void setParameter(BeforeEvent event, Long receiverId) {
        User sender = userService.findCurrentUser();
        User receiver = userService.getUserById(receiverId);
	Conversation conversation = conversationService.getOrCreateConversation(sender, receiver);
        createHeader(receiver);
	createFooter(sender, receiver);
        loadPreviousMessages(sender, receiver);
        subscribeRealTimeChat(sender, receiver);
        subscribeTypingIndicator(sender, receiver);

        messageList.add(sheet);
        setContent(messageList);
    }

    @Override
    protected void onDetach(DetachEvent detachEvent) {
        super.onDetach(detachEvent);

        if (messagesSubscription != null) {
            messagesSubscription.dispose();
        }

        if (typingsSubscription != null) {
            typingsSubscription.dispose();
        }
    }

    private void updateTypingIndicator(boolean isTyping) {
    	if (isTyping) {
            typingIndicatorSpan.setText("Typing...");
    	} else {
            typingIndicatorSpan.setText("");
    	}
    }

    public Flux<ChatMessage> getPublisher() {
    	return publisherLatest.asFlux().share();
    }

    private void loadPreviousMessages(User sender, User receiver) {
    	Long conversationId = conversationService.getOrCreateConversation(receiver, sender).getId();
    	List<ChatMessage> messages = chatService.getMessagesForConversation(conversationId);

    	for (int i = 0; i < messages.size(); i++) {
            ChatMessage message = messages.get(i);
            Div messageDiv = new Div();
            messageDiv.addClassName("message");

            // Calculate the time gap between messages
            boolean showTimestamp = shouldShowTimestamp(previousTimestamp, message.getTime());
            if (showTimestamp) {
            	Span dateTimeSpan = new Span(ChatUtils.formatDateTime(message.getTime()));
            	dateTimeSpan.addClassName("message-timestamp-group");
            	messageList.add(dateTimeSpan);
            	previousTimestamp = message.getTime(); // Update the previous timestamp
            }

            // Display the message
            displayMessages(message, sender, messageDiv);
            messageList.add(messageDiv);

            // Add status indicator only for the last message
            if (i == messages.size() - 1) {
            	if (message.isSeen()) {
                    String imageUrl = receiver.getProfileImage();
                    var avatar = new Avatar();
                    avatar.addClassName("chat-status-avatar");
                    avatar.setImage(imageUrl);
                    statusIndicator.add(avatar);
            	} else if (message.isDelivered()) {
                    statusIndicator.add(new Span("Delivered"));
            	} else {
                    statusIndicator.add(new Span("Sent"));
            	}
            	messageList.add(statusIndicator);
            }
    	}
    }

    /**
     * Checks if the timestamp should be shown based on the time gap.
     * Only shows a new timestamp if the time difference is more than 5 minutes.
     */
    private boolean shouldShowTimestamp(LocalDateTime previousTimestamp, LocalDateTime currentTimestamp) {
    	if (previousTimestamp == null) {
            return true; // Show timestamp for the first message in the conversation
    	}
    	Duration duration = Duration.between(previousTimestamp, currentTimestamp);
    	return duration.toMinutes() > 5; // Show new timestamp if more than 5 minutes apart
    }

    private void subscribeTypingIndicator(User sender, User receiver) {
    	typingsSubscription = typings
            .filter(m -> m.getSenderId().equals(receiver.getId()))
            .subscribe(m -> {
                getUI().ifPresent(ui -> ui.access(() -> {
                    logger.info("{}", m.isTyping() ? "Typing..." : "Not Typing");

                    updateTypingIndicator(m.isTyping());
                }));
            });
    }

    private void subscribeRealTimeChat(User sender, User receiver) {
    	messagesSubscription = messages
            .filter(m -> (m.getSender().getId().equals(sender.getId()) && m.getReceiver().getId().equals(receiver.getId())) ||
                     (m.getSender().getId().equals(receiver.getId()) && m.getReceiver().getId().equals(sender.getId())))
            .subscribe(message -> {
            	getUI().ifPresent(ui -> ui.access(() -> {
                    Div messageDiv = new Div();
                    messageDiv.addClassName("message");

		    Span dateTimeSpan = new Span();
                    // Calculate the time gap between messages
                    boolean showTimestamp = shouldShowTimestamp(previousTimestamp, message.getTime());
                    if (showTimestamp) {
                    	dateTimeSpan.setText(ChatUtils.formatDateTime(message.getTime()));
                    	dateTimeSpan.addClassName("message-timestamp-group");

                    	// Add the timestamp before the message
                    	messageDiv.add(new Div(dateTimeSpan));
                    	previousTimestamp = message.getTime();
                    }

                    // Display the message
                    displayMessages(message, sender, messageDiv);
                    // Add the messageDiv after the dateTimeSpan
                    messageList.add(messageDiv);

                    // Update the status indicator for the last message from sender
                    if (message.getSender().getId().equals(sender.getId())) {
                    	updateStatusIndicator(message, receiver);
                    }

                    // Add status indicator if necessary
                    messageList.add(statusIndicator);

                    // Scroll to the bottom
                    messageList.getElement().executeJs("this.scrollTop = this.scrollHeight;");
            	}));
            });
    }

    private void updateStatusIndicator(ChatMessage message, User receiver) {
    	// Clear previous status indicators
    	statusIndicator.removeAll();
    	messageList.remove(statusIndicator);

    	if (message.isSeen()) {
            // Display profile image if message is seen
            String imageUrl = receiver.getProfileImage();
            Avatar avatar = new Avatar();
            avatar.addClassName("chat-status-avatar");
            avatar.setImage(imageUrl);
            statusIndicator.add(avatar);
    	} else if (message.isDelivered()) {
            // Display "Delivered" if message is delivered but not seen
            statusIndicator.add(new Span("Delivered"));
    	} else {
            // Display "Sent" if message is only sent
            statusIndicator.add(new Span("Sent"));
    	}
    }

    private void displayMessages(ChatMessage message, User sender, Div messageDiv) {
    	Span reaction = new Span();
    	reaction.addClassName("chat-reaction");
    	reaction.setVisible(false);

    	Span messageSpan = new Span();
    	messageSpan.addClickListener(event -> {
    	    handleMessageClickListener(messageDiv, reaction);
    	});

    	// Check if the message is sent by the current user
	boolean isOutgoing = message.getSender().getId().equals(sender.getId());
	if (isOutgoing) {
	    messageSpan.setText(message.getMessage());
	    reaction.addClassName("outgoing-reaction");
	    messageDiv.addClassName("outgoing-message");
	    messageDiv.add(messageSpan, reaction);
	} else {
	    String imageUrl = message.getSender().getProfileImage();

	    Avatar avatar = new Avatar();
	    avatar.setImage(imageUrl);

	    messageSpan.setText(message.getMessage());

	    Div _messageDiv = new Div(messageSpan, reaction);
	    _messageDiv.addClassName("chat-message-span");

	    reaction.addClassName("incoming-reaction");
	    messageDiv.addClassName("incoming-message");
	    messageDiv.add(avatar, _messageDiv);
	}
    }

    private void handleMessageClickListener(Div messageDiv, Span reaction) {
    	sheet.removeAllContent();
    	Div emojisLayout = new Div();
    	emojisLayout.addClassName("chat-emojis-div");

    	String[] emojis = {"❤️", "😆", "😯", "😢", "😠", "👍", "👎"};

    	for (String emoji : emojis) {
    	    Span emojiSpan = new Span(emoji);
    	    emojiSpan.addClickListener(event -> {
    	    	if (!emoji.equals(reaction.getText())) {
    	    	    reaction.setText(emojiSpan.getText());
                    reaction.setVisible(true);
    	    	} else {
    	    	    reaction.setText("");
                    reaction.setVisible(false);
    	    	}
    	    	sheet.close();
    	    });
    	    emojisLayout.add(emojiSpan);
    	}
    	sheet.addContent(emojisLayout);
    	sheet.open();
    }

    private void createFooter(User sender, User receiver) {
    	Icon addIcon = new Icon("vaadin", "plus-circle");
    	Icon cameraIcon = new Icon("vaadin", "camera");
	Icon imageIcon = new Icon("vaadin", "picture");
	Icon voiceIcon = new Icon("vaadin", "microphone");

    	messageField.setSuffixComponent(new Icon("vaadin", "smiley-o"));
    	messageField.setPlaceholder("Message");
    	messageField.setValueChangeMode(ValueChangeMode.EAGER);
    	messageField.addValueChangeListener(event -> {
	    if (event.getValue().length() > 0) {
	        messageField.getStyle().set("width", "304px")
	        		       .set("transition", "width 1s ease");
	        addIcon.setVisible(false);
	        cameraIcon.setVisible(false);
	        imageIcon.setVisible(false);
	        voiceIcon.setVisible(false);

	        publisherTyping.onNext(new TypingEvent(sender.getId(), receiver.getId(), true));
	    } else {
	        messageField.getStyle().set("width", "160px")
	        		       .set("transition", "none");
	        addIcon.setVisible(true);
                cameraIcon.setVisible(true);
                imageIcon.setVisible(true);
                voiceIcon.setVisible(true);

                publisherTyping.onNext(new TypingEvent(sender.getId(), receiver.getId(), false));
	    }
	});

    	Icon sendIcon = new Icon("vaadin", "paperplane");
    	sendIcon.addClickShortcut(Key.ENTER);
    	sendIcon.addClickListener(event -> {
    	    Conversation conversation = conversationService.getOrCreateConversation(sender, receiver);
    	    String message = messageField.getValue();
    	    //chatService.sendMessage(sender, receiver, message);
    	    typingsSubscription.dispose();
            // Publish the message to the other user
            publisher.onNext(new ChatMessage(conversation, sender, receiver, message));
            publisherLatest.onNext(new ChatMessage(conversation, sender, receiver, message));
            messageField.clear();
            chatService.sendMessage(sender, receiver, message);
        });

    	HorizontalLayout inputLayout = new HorizontalLayout(
    	    new Div(addIcon, cameraIcon, imageIcon, voiceIcon),
    	    new Div(messageField, sendIcon)
    	);
    	inputLayout.addClassName("chat-footer-layout");

    	Div unblockLayout = new Div(
    	    new Span(receiver.getFirstName() + " is blocked."),
    	    new Span("You can't contact each other in this chat."),
    	    new Button("Unblock " + receiver.getFullName(), e  -> {
    	    	VaadinSession.getCurrent().getSession().setAttribute("unblockChat", receiver.getId());
    	    	UI.getCurrent().navigate(BlockView.class, receiver.getId());
    	    })
    	);
    	unblockLayout.addClassName("chat-unblock-layout");

    	boolean isBlocked = blockService.isMessageOrFullBlocked(sender, receiver, Block.BlockType.MESSAGES_ONLY);

    	if (isBlocked) {
    	    addToNavbar(true, unblockLayout);
    	} else {
    	    addToNavbar(true, inputLayout);
    	}
    }

    private void createHeader(User receiver) {
    	Icon backIcon = new Icon("lumo", "arrow-left");
    	backIcon.addClickListener(event -> {
    	    UI.getCurrent().navigate(MessageView.class);
    	});

	HorizontalLayout headerLayout = new HorizontalLayout(
	    new Div(
	    	backIcon,
	    	new Avatar("", receiver.getProfileImage()),
	    	new Div(
	    	    new Span(ChatUtils.truncate(receiver.getFirstName(), 16)),
	    	    typingIndicatorSpan
	    	)
	    ),
	    new Div(
	    	new Icon("lumo", "phone"),
	    	new Icon("lumo", "phone"),
	    	new Icon("vaadin", "cog")
	    )
	);
    	headerLayout.addClassName("chat-header-layout");
    	addToNavbar(headerLayout);
    }
}
