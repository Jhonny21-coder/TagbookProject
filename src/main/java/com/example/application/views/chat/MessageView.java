package com.example.application.views.chat;

import com.example.application.data.Conversation;
import com.example.application.services.ConversationService;
import com.example.application.services.ChatMessageService;
import com.example.application.services.FollowerService;
import com.example.application.services.UserServices;
import com.example.application.data.ChatMessage;
import com.example.application.data.Follower;
import com.example.application.data.User;
import com.example.application.data.Block;
import com.example.application.services.BlockService;
import com.example.application.services.chat.MuteService;
import com.example.application.views.MainLayout;
import com.example.application.views.chat.message_requests.MessageRequestsView;
import com.example.application.views.BottomSheet;
import com.example.application.views.CustomEvent;
import com.example.application.views.chat.utils.MessageBottomSheet;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.DetachEvent;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.component.Component;

import org.springframework.beans.factory.annotation.Autowired;
import jakarta.annotation.security.PermitAll;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import reactor.core.publisher.UnicastProcessor;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.time.LocalDateTime;

import java.util.Optional;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

@PermitAll
@Route(value = "messageView", layout=MainLayout.class)
public class MessageView extends AppLayout {
    private final Logger logger = LoggerFactory.getLogger(MessageView.class);

    private final ConversationService conversationService;
    private final FollowerService followerService;
    private final UserServices userService;
    private final ChatMessageService chatService;
    private final BlockService blockService;
    private final MuteService muteService;

    private final UnicastProcessor<ChatMessage> publisherStatus;
    private final Flux<ChatMessage> status;
    private final Flux<ChatMessage> latestMessages;
    private final Flux<TypingEvent> typings;

    private Div messagesLayout = new Div();
    private BottomSheet sheet = new BottomSheet();
    private BottomSheet muteSheet = new BottomSheet();
    private BottomSheet customDurationSheet = new BottomSheet();

    private Map<Long, Div> messageDivs = new HashMap<>();
    private Map<Long, Div> messageStatusIndicators = new HashMap<>();
    private Map<Long, Span> messageSpans = new HashMap<>();
    private Set<String> subscribedConversations = new HashSet<>();

    public MessageView(FollowerService followerService, UserServices userService, ChatMessageService chatService, ConversationService conversationService,
   	UnicastProcessor<ChatMessage> publisherStatus, Flux<ChatMessage> status, Flux<ChatMessage> latestMessages,
   	Flux<TypingEvent> typings, BlockService blockService, MuteService muteService) {
   	this.followerService = followerService;
   	this.userService = userService;
   	this.chatService = chatService;
   	this.conversationService = conversationService;
   	this.publisherStatus = publisherStatus;
   	this.status = status;
   	this.latestMessages = latestMessages;
   	this.typings = typings;
   	this.blockService = blockService;
	this.muteService = muteService;

   	addClassName("message-app-layout");
   	messagesLayout.add(sheet, muteSheet, customDurationSheet);
   	createHeader();
   	createMainLayout();
    }

    private void createMainLayout() {
   	User user = userService.findCurrentUser();
   	FormLayout formLayout = new FormLayout();
   	formLayout.addClassName("message-form-layout");
	subscribeRealtimeStatusUpdates(user);
	createNewMessageRequests(user);
	createMessagesLayout();
   	formLayout.add(createAvatarsLayout(user), messagesLayout);
   	setContent(formLayout);
    }

    private void createNewMessageRequests(User user) {
   	List<Conversation> messageRequests = conversationService.getRequestedConversationsByUser(user.getId());

   	Span unreadRequestsSpan = new Span(String.valueOf(messageRequests.size()));
   	SvgIcon messageRequestsIcon = new SvgIcon(new StreamResource("message-requests.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/message-requests.svg")));
   	Div unreadRequestsDiv = new Div(messageRequestsIcon, unreadRequestsSpan);

   	Div mainDiv = new Div(unreadRequestsDiv, new Span("New message requests"));
   	mainDiv.addClassName("unread-requests-main-div");
   	mainDiv.addClickListener(event -> {
   	    VaadinSession.getCurrent().getSession().setAttribute("unreadRequests", user.getId());
   	    UI.getCurrent().navigate(MessageRequestsView.class);
   	});

   	if (messageRequests.isEmpty()) {
   	    mainDiv.setVisible(false);
   	} else {
   	    mainDiv.setVisible(true);
   	}
   	messagesLayout.add(mainDiv);
    }

    private void updateTypingIndicator(boolean isTyping, boolean isFromMe, User otherUser, ChatMessage latestMessage, ChatMessage senderStatus) {
    	Span messageSpan = messageSpans.get(latestMessage.getId());
        if (isTyping) {
            messageSpan.setText("Typing");
            messageSpan.addClassName("message-typing");
        } else {
            messageSpan.removeClassName("loading-span");
            createMessageSpan(isFromMe, latestMessage, otherUser, senderStatus, messageSpan);
	}
    }

    private void subscribeTypingIndicator(boolean isFromMe, User otherUser, ChatMessage latestMessage, ChatMessage senderStatus) {
        typings
            .filter(m -> m.getSenderId().equals(otherUser.getId()))
            .subscribe(m -> {
                getUI().ifPresent(ui -> ui.access(() -> {
                    logger.info("{}", m.isTyping() ? "Typing..." : "Not Typing");

                    updateTypingIndicator(m.isTyping(), isFromMe, otherUser, latestMessage, senderStatus);
                }));
            });
    }

    private void subscribeLatestMessageUpdates(User sender, User receiver) {
    	latestMessages
            .filter(m -> (m.getSender().getId().equals(sender.getId()) && m.getReceiver().getId().equals(receiver.getId()))
                    || (m.getSender().getId().equals(receiver.getId()) && m.getReceiver().getId().equals(sender.getId())))
            .subscribe(latestMessage -> {
                getUI().ifPresent(ui -> ui.access(() -> {
                    messagesLayout.removeAll();
                    createMessagesLayout();
                }));
            });
    }

    private void subscribeRealtimeStatusUpdates(User user) {
    	status
            .filter(m -> m.getSender().getId().equals(user.getId()))
            .subscribe(m -> {
                getUI().ifPresent(ui -> ui.access(() -> updateStatusIndicator(m, user.getId())));
            }, error -> logger.error("Error updating unread notification count for user ID: {}", user.getId(), error));
    }

    private void updateStatusIndicator(ChatMessage m, Long currentUserId) {
    	boolean isFromMe = m.getSender().getId().equals(currentUserId);
    	User otherUser = isFromMe ? m.getReceiver() : m.getSender();
    	ChatMessage receiverStatus = chatService.findMessageByReceiver(m.getId(), otherUser.getId());

    	Div messageDiv = messageDivs.get(m.getId());
    	Div oldStatus = messageStatusIndicators.get(m.getId());
    	Div newStatus = createStatusIndicatorIcon(isFromMe, otherUser, receiverStatus);

    	messageDiv.replace(oldStatus, newStatus);

    	messageStatusIndicators.put(m.getId(), newStatus);
    }

    private void createMessagesLayout() {
    	// Create a parent layout
    	messagesLayout.addClassName("messages-layout");

    	// Fetch current user
    	User user = userService.findCurrentUser();

    	// Fetch latest conversations for current user
    	List<Conversation> userConversations = conversationService.getConversationsForUser(user);

    	// Display conversation
    	for (Conversation conversation : userConversations) {
    	    if (ChatUtils.isConversationVisibleToCurrentUser(conversation, user)) {
            	// Determine the other user in the conversation
		User otherUser = conversation.getUser1().getId().equals(user.getId()) ? conversation.getUser2() : conversation.getUser1();

		// Fetch the latest message for the conversation
		ChatMessage latestMessage = chatService.getLatestMessageInConversation(conversation.getId());

             	// Check if the latest message is from the current user
            	boolean isFromMe = latestMessage.getSender().getId().equals(user.getId());

            	// For receiver status
            	ChatMessage receiverStatus = chatService.findMessageByReceiver(latestMessage.getId(), otherUser.getId());
            	// For sender status
            	ChatMessage senderStatus = chatService.findMessageByReceiver(latestMessage.getId(), user.getId());

            	Div statusIndicatorIcon = createStatusIndicatorIcon(isFromMe, otherUser, receiverStatus);

            	Avatar avatar = new Avatar();
            	avatar.setImage(otherUser.getProfileImage());

		boolean isRead = conversationService.isReadByUser(conversation.getId(), user);
		Span messageSpan = new Span();
		String textColor = isRead ? "var(--secondary)" : "white";
		String textShadow = isRead ? "none" : "0.5px 0.5px white";
		messageSpan.getStyle().set("color", textColor)
				      .set("text-shadow", textShadow);

		// Create a span for the latest message
		createMessageSpan(isFromMe, latestMessage, otherUser, senderStatus, messageSpan);
            	subscribeTypingIndicator(isFromMe, otherUser, latestMessage, senderStatus);

	        List<ChatMessage> unseenMessages = chatService.getAllUnseenMessagesForUser(user.getId(), conversation.getId());
            	Div unseenSpan = new Div();
            	unseenSpan.addClassName("unseen-messages");
		if (!isRead && unseenMessages.isEmpty()) {
		    unseenSpan.setText(String.valueOf(1));
		} else if (isRead && !unseenMessages.isEmpty()) {
		    unseenSpan.setText(String.valueOf(unseenMessages.size()));
		} else {
		    unseenSpan.setVisible(false);
		}

		Span otherUserFullName = new Span(truncate(otherUser.getFullName(), 26));
		String fullNameShadow = isRead ? "none" : "0.5px 0.5px currentColor";
            	otherUserFullName.getStyle().set("text-shadow", fullNameShadow);

		Icon mutedIcon = createMuteIcon(conversation.getId(), user);

            	Div messageDiv = new Div(
            	    new Div(avatar, new Div()),
            	    new Div(otherUserFullName, new Div(unseenSpan, messageSpan)),
            	    new Div(mutedIcon, statusIndicatorIcon)
            	);
            	messageDiv.addClassName("main-messages-div");

            	messageSpans.put(latestMessage.getId(), messageSpan);
            	messageDivs.put(latestMessage.getId(), messageDiv);
            	messageStatusIndicators.put(latestMessage.getId(), statusIndicatorIcon);

		MessageBottomSheet messageSheet = new MessageBottomSheet(
		    sheet, muteSheet, customDurationSheet,
		    userService, conversationService, chatService,
		    muteService, blockService, messagesLayout
		);

		CustomEvent.handleLongPressEvent(messageDiv);
        	messageDiv.getElement().addEventListener("long-press", e -> {
        	    messageSheet.showBottomSheet(
        		otherUser, user, messageDiv,
        		conversation, mutedIcon, messageSpan,
        		otherUserFullName, unseenSpan, unseenMessages
        	    );
        	});
            	messageDiv.addClickListener(event -> {
            	    // Handle message click
	            if (!isFromMe) {
                    	if (!unseenMessages.isEmpty()) {
                    	    chatService.markUnseenMessagesAsSeen(unseenMessages);
                    	    ChatMessage updatedMessage = chatService.getMessageById(senderStatus.getId());
                    	    publisherStatus.onNext(updatedMessage);
                    	}
		    }
		    if (!isRead) {
			conversationService.setReadByUser(conversation.getId(), user, true);
		    }
	            UI.getCurrent().navigate(ChatView.class, otherUser.getId());
            	});

            	// Check if conversation is already subscribed
            	String conversationKey = user.getId() + "-" + otherUser.getId();
            	if (!subscribedConversations.contains(conversationKey)) {
            	    subscribeLatestMessageUpdates(user, otherUser);
            	    subscribedConversations.add(conversationKey);
            	}
            	messagesLayout.add(messageDiv);
    	    }
    	}
    }

    // Method to create and update visibility for mute icon
    private Icon createMuteIcon(Long conversationId, User user) {
    	Icon mutedIcon = new Icon("vaadin", "bell-slash");
    	if (!isMuted(conversationId, user)) {
    	    mutedIcon.setVisible(false);
    	}
    	return mutedIcon;
    }

    // Method to check if conversation is muted
    private boolean isMuted(Long conversationId, User user) {
        return muteService.isConversationMuted(conversationId, user);
    }

    // Method to truncate long texts
    private String truncate(String text, int length) {
        return text.length() > length ? text.substring(0, length) + "…" : text;
    }

    // Method to create avatars
    private Div createAvatarsLayout(User user) {
   	Icon plusIcon = new Icon("lumo", "plus");

   	Div avatarsLayout = new Div(plusIcon);
        avatarsLayout.addClassName("message-avatars-layout");

        List<Follower> followers = followerService.getFollowersByFollowedUserId(user.getId());
        followers.forEach(follower -> {
             User followerUser = follower.getFollower();

             Avatar avatar = new Avatar();
             avatar.setImage(followerUser.getProfileImage());

             String firstName = truncate(followerUser.getFirstName(), 7);

             Div followerDiv = new Div(
             	new Div(avatar),
             	new Div(),
             	new Span(firstName)
             );
             avatarsLayout.add(followerDiv);
        });
        return avatarsLayout;
    }

    /*private Div createMessagesLayout() {
    	var messagesLayout = new Div();
    	messagesLayout.addClassName("messages-layout");

    	User user = userService.findCurrentUser();
    	//List<ChatMessage> userConversations = chatService.getMessagesForUser(user.getId());
    	List<ChatMessage> userConversations = chatService.getRecentConversations(user.getId());

	Map<Long, ChatMessage> latestMessages = userConversations.stream()
	    .collect(Collectors.groupingBy(
                conversation -> {
                    User otherUser = conversation.getSender().getId().equals(user.getId()) ?
                    	conversation.getReceiver() : conversation.getSender();
                    return otherUser.getId();
                },
                Collectors.reducing((ChatMessage) null,
                    (conversation, latest) -> conversation == null || latest == null ?
                    	conversation != null ? conversation : latest : conversation.getId() > latest.getId() ?
                    	conversation : latest)
            ));

    	latestMessages.values().forEach(latestMessage -> {
    	});
    }*/

    // Method to create an status indicator whether the message is sent, delivered or seen
    private Div createStatusIndicatorIcon(boolean isFromMe, User otherUser, ChatMessage receiverStatus) {
   	Div statusIndicatorIcon = new Div();
        if (isFromMe) {
            if (receiverStatus != null && receiverStatus.isSeen()) {
                String imageUrl = otherUser.getProfileImage();
                var icon = new Avatar();
                icon.setImage(imageUrl);
                statusIndicatorIcon.add(icon);
                statusIndicatorIcon.addClassName("message-seen-icon");
            } else if (receiverStatus != null && receiverStatus.isDelivered()) {
                var icon = new Icon("vaadin", "check-circle");
                statusIndicatorIcon.add(icon);
                statusIndicatorIcon.addClassName("message-delivered-icon");
            } else {
                var icon = new Icon("vaadin", "check-circle-o");
                statusIndicatorIcon.add(icon);
                statusIndicatorIcon.addClassName("message-not-delivered-icon");
            }
	}

	return statusIndicatorIcon;
    }

    // Method to create a span for message
    private void createMessageSpan(boolean isFromMe, ChatMessage latestMessage, User otherUser, ChatMessage senderStatus, Span messageSpan) {
	if (isFromMe) {
            messageSpan.setText(createMessageText(isFromMe, latestMessage, otherUser, senderStatus));
	} else {
            if (senderStatus != null && !senderStatus.isSeen()) {
                messageSpan.addClassName("message-sender-not-seen");
            }
            messageSpan.setText(createMessageText(isFromMe, latestMessage, otherUser, senderStatus));
	}
    }

    // Helper method for message span to format message with user name
    private String createMessageText(boolean isFromMe, ChatMessage latestMessage, User otherUser, ChatMessage senderStatus) {
        String message = isFromMe ? "You: " + latestMessage.getMessage() : otherUser.getFirstName() + ": " + latestMessage.getMessage();
        return truncate(message, 25);
    }

    // Method to create a header for the view
    private void createHeader() {
    	Span messageText = new Span("Messages");
   	Icon settingsIcon = new Icon("lumo", "cog");
   	settingsIcon.addClickListener(event -> UI.getCurrent().navigate(SettingsView.class));

   	Icon searchIcon = new Icon("lumo", "search");
   	searchIcon.addClickListener(event -> UI.getCurrent().navigate(SearchMessageView.class));

   	HorizontalLayout headerLayout = new HorizontalLayout(messageText, new Div(settingsIcon, searchIcon));
	headerLayout.addClassName("message-header-layout");

   	addToNavbar(headerLayout);
    }
}

