package com.example.application.views.chat.message_requests;

import com.example.application.data.Conversation;
import com.example.application.services.ConversationService;
import com.example.application.data.ChatMessage;
import com.example.application.services.ChatMessageService;
import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.views.profile.UserProfile;
import com.example.application.views.chat.ChatView;
import com.example.application.views.chat.DeleteConversation;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.component.tabs.TabSheet;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.dialog.Dialog;

import jakarta.annotation.security.PermitAll;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@PermitAll
@Route("userRequest")
public class UserRequestView extends AppLayout implements HasUrlParameter<Long>{
   private final UserServices userService;
   private final ChatMessageService chatService;
   private final ConversationService conversationService;

   public UserRequestView(UserServices userService, ChatMessageService chatService, ConversationService conversationService) {
   	this.userService = userService;
   	this.chatService = chatService;
   	this.conversationService = conversationService;
   	addClassName("user-request-app-layout");
   }

   @Override
   public void setParameter(BeforeEvent event, Long userId) {
   	User sender = userService.getUserById(userId);
   	User receiver = userService.findCurrentUser();
        Conversation conversation = conversationService.getOrCreateConversation(sender, receiver);

   	createHeader(sender);
        createMainLayout(sender, receiver, conversation);
        createFooter(sender, receiver, conversation);
   }

   private void createMainLayout(User sender, User receiver, Conversation conversation) {
        List<ChatMessage> requestMessages = chatService.getAllMessageRequestsByUser(conversation.getId(), sender.getId());

   	Div mainLayoutDiv = new Div(
   	    createViewProfileLayout(sender),
   	    createDateTimeLayout(requestMessages),
   	    createMessagesLayout(sender, requestMessages)
   	);
   	mainLayoutDiv.addClassName("user-request-main-layout");
   	setContent(mainLayoutDiv);
   }

   private void handleDeleteClickEvent(Conversation conversation, User receiver) {
   	Dialog dialog = new Dialog();
   	dialog.addClassName("user-request-delete-dialog");
	dialog.add(
	    new Span("Delete message request?"),
	    new Span("This permanently deletes these messages, but wont show that you've seen or deleted them."),
	    new Div(
	    	new Button("CANCEL", e -> dialog.close()),
	    	new Button("DELETE", e -> {
	    	    DeleteConversation.markConversationAsDeleted(conversation, receiver.getId(), conversationService);
	    	    dialog.close();
	    	    UI.getCurrent().navigate(MessageRequestsView.class);
	    	})
	    )
	);
	dialog.open();
   }

   private Div createMessagesLayout(User sender, List<ChatMessage> requestMessages) {
   	Div messagesDiv = new Div();
   	messagesDiv.addClassName("user-request-messages-div");

   	for (int i = 0; i < requestMessages.size(); i++) {
   	    var messageSpan = new Span(requestMessages.get(i).getMessage());

   	    if (i == requestMessages.size() - 1) {
   	    	Avatar messageAvatar = new Avatar();
        	messageAvatar.setImage(sender.getProfileImage());
        	messagesDiv.add(new Div(messageAvatar, messageSpan));
   	    } else {
   	    	messagesDiv.add(messageSpan);
   	    }
   	}
   	return messagesDiv;
   }

   private Span createDateTimeLayout(List<ChatMessage> requestMessages) {
   	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM d hh:mm");
	Span dateTimeSpan = new Span(formatter.format(requestMessages.get(0).getTime()));
	dateTimeSpan.addClassName("user-request-time");
	return dateTimeSpan;
   }

   private Div createViewProfileLayout(User user) {
   	String imageUrl = user.getProfileImage();
   	Avatar avatar = new Avatar();
   	avatar.setImage(imageUrl);

   	Div viewProfileDiv = new Div(
   	   avatar,
   	   new Span(user.getFullName()),
   	   new Button("View profile", e -> UI.getCurrent().navigate(UserProfile.class, user.getId()))
   	);
   	viewProfileDiv.addClassName("user-request-view-profile");
	return viewProfileDiv;
   }

   // Creates a footer for accepting or deleting the requested conversation
   private void createFooter(User sender, User receiver, Conversation conversation) {
   	Div footerDiv = new Div(
    	   new Button("Accept", e -> {
     	       // Conversation now is not requested
   	       conversation.setMessageRequest(false);
   	       conversation.setRequestInitiatedByUserId(null);
   	       conversationService.updateConversation(conversation);
   	       UI.getCurrent().navigate(ChatView.class, sender.getId());
   	   }),
   	   new Button("Delete", e -> handleDeleteClickEvent(conversation, receiver))
   	);
   	footerDiv.addClassName("user-request-footer-layout");
   	addToNavbar(true, footerDiv);
   }

   private void createHeader(User user) {
   	Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> UI.getCurrent().navigate(MessageRequestsView.class));

        Avatar avatar = new Avatar();
	avatar.setImage(user.getProfileImage());

	Icon settingsIcon = new Icon("vaadin", "cog");
	settingsIcon.addClickListener(event -> UI.getCurrent().navigate(RequestSettingsView.class, user.getId()));

        HorizontalLayout headerLayout = new HorizontalLayout(
            backIcon,
            new Div(
             	avatar,
             	new Span(user.getFullName())
            ),
            settingsIcon
        );
        headerLayout.addClassName("request-header-layout");
        addToNavbar(headerLayout);
   }
}
