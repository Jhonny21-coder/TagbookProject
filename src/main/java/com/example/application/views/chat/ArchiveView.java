package com.example.application.views.chat;

import com.example.application.data.ChatMessage;
import com.example.application.services.ChatMessageService;
import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.services.ConversationService;
import com.example.application.data.Conversation;
import com.example.application.data.Block;
import com.example.application.services.BlockService;
import com.example.application.services.chat.MuteService;
import com.example.application.views.BottomSheet;
import com.example.application.views.CustomEvent;
import com.example.application.views.chat.utils.MessageBottomSheet;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.component.avatar.Avatar;

import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;

import reactor.core.publisher.UnicastProcessor;
import reactor.core.publisher.Flux;

import java.util.List;

@PermitAll
@Route("archive")
public class ArchiveView extends AppLayout {
    private final UserServices userService;
    private final ChatMessageService chatService;
    private final ConversationService conversationService;
    private final BlockService blockService;
    private final MuteService muteService;

    private Div mainLayout = new Div();
    private BottomSheet sheet = new BottomSheet();
    private BottomSheet muteSheet = new BottomSheet();
    private BottomSheet customDurationSheet = new BottomSheet();

    private final UnicastProcessor<ChatMessage> publisherStatus;

    public ArchiveView(UserServices userService, ChatMessageService chatService, ConversationService conversationService, BlockService blockService, MuteService muteService, UnicastProcessor<ChatMessage> publisherStatus) {
   	this.userService = userService;
   	this.chatService = chatService;
   	this.conversationService = conversationService;
   	this.blockService = blockService;
        this.muteService = muteService;
        this.publisherStatus = publisherStatus;
   	addClassName("message-settings-app-layout");
   	mainLayout.addClassName("messages-layout");
   	mainLayout.add(sheet, muteSheet, customDurationSheet);
   	createHeader();
   	createMainLayout();
    }

    private void createMainLayout() {
   	User user = userService.findCurrentUser();

   	createArchivedConversations(user);

        setContent(mainLayout);
    }

    private void createArchivedConversations(User user) {
   	List<Conversation> archivedConversations = conversationService.getArchivedConversations(user);

   	if (archivedConversations.isEmpty()) {
   	    mainLayout.add(createEmptyMessages());
   	    return;
   	}

	archivedConversations.forEach(archivedConversation -> {
	    User archivedUser = archivedConversation.getUser1().equals(user) ? archivedConversation.getUser2() : archivedConversation.getUser2();

	    ChatMessage latestMessage = chatService.getLatestMessageInConversation(archivedConversation.getId());

	    // Check if the latest message is from the current user
            boolean isFromMe = latestMessage.getSender().getId().equals(user.getId());

	    ChatMessage receiverStatus = chatService.findMessageByReceiver(latestMessage.getId(), archivedUser.getId());
            ChatMessage senderStatus = chatService.findMessageByReceiver(latestMessage.getId(), user.getId());

	    Avatar avatar = new Avatar();
	    avatar.setImage(archivedUser.getProfileImage());

	    Div statusIndicatorIcon = createStatusIndicatorIcon(isFromMe, archivedUser, receiverStatus);

	    boolean isRead = conversationService.isReadByUser(archivedConversation.getId(), user);
            String textColor = isRead ? "var(--secondary)" : "white";
            String textShadow = isRead ? "none" : "0.5px 0.5px white";

            Span messageSpan = new Span();
            messageSpan.getStyle().set("color", textColor).set("text-shadow", textShadow);

            // Create a span for the latest message
            createMessageSpan(isFromMe, latestMessage, archivedUser, senderStatus, messageSpan);

            List<ChatMessage> unseenMessages = chatService.getAllUnseenMessagesForUser(user.getId(), archivedConversation.getId());
            Div unseenSpan = new Div();
            unseenSpan.addClassName("unseen-messages");
            if (!isRead && unseenMessages.isEmpty()) {
               	unseenSpan.setText(String.valueOf(1));
            } else if (isRead && !unseenMessages.isEmpty()) {
                unseenSpan.setText(String.valueOf(unseenMessages.size()));
            } else {
                unseenSpan.setVisible(false);
            }

            Span archivedUserFullName = new Span(truncate(archivedUser.getFullName(), 26));
            String fullNameShadow = isRead ? "none" : "0.5px 0.5px currentColor";
            archivedUserFullName.getStyle().set("text-shadow", fullNameShadow);

            Icon mutedIcon = createMuteIcon(archivedConversation.getId(), user);

            Div messageDiv = new Div(
		new Div(avatar, new Div()),
                new Div(archivedUserFullName, new Div(unseenSpan, messageSpan)),
                new Div(mutedIcon, statusIndicatorIcon)
            );
            messageDiv.addClassName("main-messages-div");

            MessageBottomSheet messageSheet = new MessageBottomSheet(
		sheet, muteSheet, customDurationSheet,
                userService, conversationService, chatService,
                muteService, blockService, mainLayout
	    );

            CustomEvent.handleLongPressEvent(messageDiv);
            messageDiv.getElement().addEventListener("long-press", e -> {
		messageSheet.showBottomSheet(
                    archivedUser, user, messageDiv,
                    archivedConversation, mutedIcon, messageSpan,
                    archivedUserFullName, unseenSpan, unseenMessages
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
                    conversationService.setReadByUser(archivedConversation.getId(), user, true);
                }
                UI.getCurrent().navigate(ChatView.class, archivedUser.getId());
	    });
	    mainLayout.add(messageDiv);
	});
    }

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

    // Method to create a span for message
    private void createMessageSpan(boolean isFromMe, ChatMessage latestMessage, User archivedUser, ChatMessage senderStatus, Span messageSpan) {
        if (isFromMe) {
            messageSpan.setText(createMessageText(isFromMe, latestMessage, archivedUser, senderStatus));
        } else {
            if (senderStatus != null && !senderStatus.isSeen()) {
                messageSpan.addClassName("message-sender-not-seen");
            }
            messageSpan.setText(createMessageText(isFromMe, latestMessage, archivedUser, senderStatus));
        }
    }

    // Helper method for message span to format message with user name
    private String createMessageText(boolean isFromMe, ChatMessage latestMessage, User archivedUser, ChatMessage senderStatus) {
        String message = isFromMe ? "You: " + latestMessage.getMessage() : archivedUser.getFirstName() + ": " + latestMessage.getMessage();
        return truncate(message, 25);
    }

   private Div createEmptyMessages() {
        Icon paperplaneIcon = new Icon("vaadin", "paperplane");
        Span information1 = new Span("Your archive is empty");
        Span information2 = new Span("Archiving keeps chats out the way without deleting them.");
        Div informationDiv = new Div(paperplaneIcon, information1, information2);
        informationDiv.addClassName("message-request-empty-div");

        return informationDiv;
   }

   // Method to truncate long texts
    private String truncate(String text, int length) {
        return text.length() > length ? text.substring(0, length) + "…" : text;
    }

   private void createHeader() {
   	Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> {
            UI.getCurrent().navigate(SettingsView.class);
        });

        var headerLayout = new HorizontalLayout(backIcon, new Span("Archive"));
        headerLayout.addClassName("message-settings-header-layout");

        addToNavbar(headerLayout);
   }
}
