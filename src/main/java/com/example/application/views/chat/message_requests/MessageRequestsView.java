package com.example.application.views.chat.message_requests;

import com.example.application.data.Conversation;
import com.example.application.services.ConversationService;
import com.example.application.data.ChatMessage;
import com.example.application.services.ChatMessageService;
import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.data.Block;
import com.example.application.services.BlockService;
import com.example.application.views.BottomSheet;
import com.example.application.views.chat.BlockView;
import com.example.application.views.chat.SettingsView;
import com.example.application.views.chat.MessageView;
import com.example.application.views.chat.DeleteConversation;
import com.example.application.views.CustomEvent;

import com.vaadin.componentfactory.ToggleButton;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.tabs.TabSheet;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.ClientCallable;
import com.vaadin.flow.server.VaadinSession;

import jakarta.annotation.security.PermitAll;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Set;

@PermitAll
@Route("messagingRequests")
public class MessageRequestsView extends AppLayout {
   private final UserServices userService;
   private final ChatMessageService chatService;
   private final ConversationService conversationService;
   private final BlockService blockService;

   private Tab youMayKnowTab = new Tab("You may know");
   private Tab spamTab = new Tab("Spam");
   private Tabs tabs = new Tabs(youMayKnowTab, spamTab);
   private BottomSheet sheet = new BottomSheet();
   private Div mainDiv = new Div();
   private Div spamMainDiv = new Div();

   public MessageRequestsView(UserServices userService, ChatMessageService chatService, ConversationService conversationService, BlockService blockService) {
   	this.userService = userService;
   	this.chatService = chatService;
   	this.conversationService = conversationService;
   	this.blockService = blockService;
   	addClassName("settings-app-layout");
   	mainDiv.addClassName("message-request-main-div");
   	createHeader();
   	createMainLayout();
   }

   private void createMainLayout() {
   	User user = userService.findCurrentUser();
   	List<Conversation> conversations = conversationService.getRequestedConversationsByUser(user.getId());

   	Div youMayKnowDiv = createYouMayKnow(user, conversations);
   	Div spamDiv = createSpam(conversations);
   	spamDiv.setVisible(false);

   	tabs.addSelectedChangeListener(event -> {
   	    if (tabs.getSelectedTab().equals(youMayKnowTab)) {
   	     	youMayKnowDiv.setVisible(true);
   	     	spamDiv.setVisible(false);
   	    } else {
   	        spamDiv.setVisible(true);
   	        youMayKnowDiv.setVisible(false);
   	    }
   	});

   	setContent(new Div(youMayKnowDiv, spamDiv, sheet));
   }

   private Div createEmptyMessages() {
	Icon paperplaneIcon = new Icon("vaadin", "paperplane");
	Span information1 = new Span("No messages yet");
	Span information2 = new Span("New messages will appear here.");
	Div informationDiv = new Div(paperplaneIcon, information1, information2);
	informationDiv.addClassName("message-request-empty-div");

	return informationDiv;
   }

   private Div createYouMayKnow(User user, List<Conversation> conversations) {
   	if (conversations.isEmpty()) {
   	    Div emptyMessages = createEmptyMessages();
            mainDiv.add(emptyMessages);
            return mainDiv;
   	}

   	for (Conversation conversation : conversations) {
   	    Long userId = user.getId();
   	    Long user1Id = conversation.getUser1().getId();
   	    Long user2Id = conversation.getUser2().getId();

   	    if ((userId.equals(user1Id) && !conversation.isDeletedByUser1()) || (userId.equals(user2Id) && !conversation.isDeletedByUser2())) {
	    	Long requesterId = conversation.getRequestInitiatedByUserId();
   	    	ChatMessage messageRequest = chatService.getLatestMessageRequestByUser(conversation.getId(), requesterId);
   	    	User sender = messageRequest.getSender();
   	    	List<ChatMessage> unreadMessages = chatService.getAllUnseenMessagesForUser(userId, conversation.getId());

		boolean isRead = conversationService.isReadByUser(conversation.getId(), user);

   	    	Avatar avatar = new Avatar("", sender.getProfileImage());
   	    	Span fullNameSpan = createFullNameSpan(sender, isRead);
   	    	Div unreadDiv = createUnreadDiv(isRead, unreadMessages);
   	    	Span messageSpan = createMessageSpan(messageRequest, isRead);

   	    	Div messageRequestDiv = new Div(avatar, new Div(fullNameSpan, new Div(unreadDiv, messageSpan)));
   	    	messageRequestDiv.addClassName("message-request-child");
   	    	messageRequestDiv.addClickListener(event -> {
   	    	    if (!isRead && unreadMessages.isEmpty()) {
   	    	    	conversationService.setReadByUser(conversation.getId(), user, !isRead);
   	    	    } else {
   	    	    	chatService.markUnseenMessagesAsSeen(unreadMessages);
   	    	    }
   	    	    UI.getCurrent().navigate(UserRequestView.class, sender.getId());
   	    	});
            	messageRequestDiv.getElement().addEventListener("long-press", e -> showOptions(sender, user, messageRequestDiv, conversation, unreadMessages, messageSpan, fullNameSpan, unreadDiv));
            	CustomEvent.handleLongPressEvent(messageRequestDiv);

   	    	mainDiv.add(messageRequestDiv);
   	    }
   	}
	return mainDiv;
   }

   // Method to create a div for unread request count
   private Div createUnreadDiv(boolean isRead, List<ChatMessage> unreadMessages) {
   	Div unreadDiv = new Div();
	unreadDiv.addClassName("unread-count");
	unreadDiv.setVisible(!isRead || !unreadMessages.isEmpty());
	unreadDiv.setText(unreadMessages.isEmpty() && !isRead ? "1" : String.valueOf(unreadMessages.size()));
	return unreadDiv;
   }

   // Method to create a span for full name
   private Span createFullNameSpan(User sender, boolean isRead) {
   	String fullname = truncate(sender.getFullName(), 35);
	Span fullNameSpan = new Span(truncate(sender.getFullName(), 35));
	String fullNameShadow = isRead ? "none" : "0.5px 0.5px currentColor";
	fullNameSpan.getStyle().set("text-shadow", fullNameShadow);
   	return fullNameSpan;
   }

   // Method to create a span for message
   private Span createMessageSpan(ChatMessage messageRequest, boolean isRead) {
   	String message = truncate(messageRequest.getMessage(), 36);
   	Span messageSpan = new Span(truncate(messageRequest.getMessage(), 36));
	String textColor = isRead ? "var(--secondary)" : "white";
	String textShadow = isRead ? "none" : "0.5px 0.5px white";
	messageSpan.getStyle().set("color", textColor).set("text-shadow", textShadow);
	return messageSpan;
   }

   private void showOptions(User sender, User receiver, Div messageRequestDiv, Conversation conversation, List<ChatMessage> unreadMessages, Span messageSpan, Span fullNameSpan, Div unreadDiv) {
   	boolean isRead = conversationService.isReadByUser(conversation.getId(), receiver);

    	Div readStatusDiv = new Div(new Icon("vaadin", "envelope"), new Span(isRead ? "Mark as unread" : "Mark as Read"));
    	readStatusDiv.addClickListener(event -> {
    	    String textColor = !isRead ? "var(--secondary)" : "white";
            String textShadow = !isRead ? "none" : "0.5px 0.5px white";
            messageSpan.getStyle().set("color", textColor).set("text-shadow", textShadow);

            String fullNameShadow = !isRead ? "none" : "0.5px 0.5px currentColor";
            fullNameSpan.getStyle().set("text-shadow", fullNameShadow);

            conversationService.setReadByUser(conversation.getId(), receiver, !isRead);
            if (!isRead) {
                if (!unreadMessages.isEmpty()) {
                    chatService.markUnseenMessagesAsSeen(unreadMessages);
                }
                unreadDiv.setVisible(false);
            } else {
                unreadDiv.setVisible(true);
                unreadDiv.setText(String.valueOf(1));
            }
            sheet.close();
    	});

    	Icon deleteIcon = new Icon("vaadin", "trash");
    	deleteIcon.getStyle().set("color", "var(--sheet-error-color)");
    	Div deleteDiv = new Div(deleteIcon, new Span("Delete conversation"));
    	deleteDiv.addClickListener(event -> {
            Dialog deleteDialog = createDeleteDialog(messageRequestDiv, conversation, receiver);
            deleteDialog.open();
            sheet.close();
    	});

    	User blocker = userService.findCurrentUser();
    	boolean isBlocked = blockService.isMessageOrFullBlocked(blocker, sender, Block.BlockType.MESSAGES_ONLY);
    	String fullName = truncate(sender.getFullName(), 25);
    	String actionText = isBlocked ? "Unblock " : "Block " + fullName;

	Icon minusIcon = new Icon("vaadin", "minus-circle");
	minusIcon.getStyle().set("color", isBlocked ? "" : "var(--sheet-error-color)");

    	Div blockDiv = new Div();
    	blockDiv.add(minusIcon, new Span(actionText));

    	blockDiv.addClickListener(event -> {
    	    VaadinSession.getCurrent().getSession().setAttribute("messageRequest", sender.getId());
	    UI.getCurrent().navigate(BlockView.class, sender.getId());
    	});

    	Div mainDiv = new Div(new Span(), readStatusDiv, isBlocked ? blockDiv : deleteDiv, !isBlocked ? blockDiv : deleteDiv);
    	mainDiv.addClassName("message-request-options");
    	sheet.removeAllContent();
    	sheet.addContent(mainDiv);
    	sheet.open();
   }

   // Creates a dialog to confirm deleting of conversation
   private Dialog createDeleteDialog(Div messageRequestDiv, Conversation conversation, User receiver) {
        Dialog dialog = new Dialog();
        dialog.addClassName("block-dialog");

        Span headerText = new Span("Delete this entire conversation?");
        Span mainText = new Span("Once you delete your copy of the conversation, it can't be undone.");

        // Cancel and action buttons for the dialog
        Button cancelButton = new Button("CANCEL", e -> dialog.close());
        Button deleteButton = new Button("DELETE", e -> {
            mainDiv.remove(messageRequestDiv);
            deleteConversation(conversation, receiver);
            dialog.close();
        });

        Div buttonContainer = new Div(cancelButton, deleteButton);
        dialog.add(headerText, mainText, buttonContainer);

        return dialog;
   }

   private void deleteConversation(Conversation conversation, User receiver) {
   	DeleteConversation.markConversationAsDeleted(conversation, receiver.getId(), conversationService);
        List<Conversation> conversations = conversationService.getRequestedConversationsByUser(receiver.getId());

        if (conversations.isEmpty()) {
            Div emptyMessages1 = createEmptyMessages();
            Div emptyMessages2 = createEmptyMessages();
            mainDiv.add(emptyMessages1);
            spamMainDiv.add(emptyMessages2);
        }
   }

   private String truncate(String text, int length) {
   	return text.length() > length ? text.substring(0, length) + "…" : text;
   }

   private Div createSpam(List<Conversation> conversations) {
   	if (conversations.isEmpty()) {
   	    Div emptyMessages = createEmptyMessages();
            spamMainDiv.add(emptyMessages);
            return spamMainDiv;
        }

   	return spamMainDiv;
   }

   private Div createParagraph() {
   	Paragraph paragraph = new Paragraph("Open a request to get info about who's " +
   	    "messaging you. They they won't know you've seen " +
   	    "it until you accept it. "
   	);
   	Span decideWhoCanMessage = new Span("Decide who can message you");
   	paragraph.add(decideWhoCanMessage);

   	Div line = new Div();
   	return new Div(paragraph, line);
   }

   private void createHeader() {
   	Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> {
            Set<String> sessionNames = VaadinSession.getCurrent().getSession().getAttributeNames();

            for(String sessionName : sessionNames){
                if(sessionName.equals("unreadRequests")){
                   VaadinSession.getCurrent().getSession().removeAttribute("unreadRequests");
                   UI.getCurrent().navigate(MessageView.class);
                } else if(sessionName.equals("settings")){
                   VaadinSession.getCurrent().getSession().removeAttribute("settings");
                   UI.getCurrent().navigate(SettingsView.class);
                }
            }
        });

        HorizontalLayout headerLayout = new HorizontalLayout(backIcon, new Span("Message Requests"));
        headerLayout.addClassName("message-settings-header-layout");

       	Div headerMainLayout = new Div(headerLayout, tabs, createParagraph());
       	headerMainLayout.addClassName("message-request-header-main");

        addToNavbar(headerMainLayout);
   }
}
