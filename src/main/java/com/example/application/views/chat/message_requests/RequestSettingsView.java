package com.example.application.views.chat.message_requests;

import com.example.application.data.Conversation;
import com.example.application.services.ConversationService;
import com.example.application.data.ChatMessage;
import com.example.application.services.ChatMessageService;
import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.data.Block;
import com.example.application.services.BlockService;
import com.example.application.views.profile.UserProfile;
import com.example.application.views.chat.BlockView;
import com.example.application.views.chat.ReadReceiptsView;
import com.example.application.views.chat.MessageView;
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
import com.vaadin.flow.server.VaadinSession;

import jakarta.annotation.security.PermitAll;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@PermitAll
@Route("requestSettings")
public class RequestSettingsView extends AppLayout implements HasUrlParameter<Long>{
   private final UserServices userService;
   private final ChatMessageService chatService;
   private final ConversationService conversationService;
   private final BlockService blockService;

   public RequestSettingsView(UserServices userService, ChatMessageService chatService, ConversationService conversationService, BlockService blockService) {
   	this.userService = userService;
   	this.chatService = chatService;
   	this.conversationService = conversationService;
   	this.blockService = blockService;
   	addClassName("user-request-app-layout");
   }

   @Override
   public void setParameter(BeforeEvent event, Long userId) {
   	User sender = userService.getUserById(userId);
   	User receiver = userService.findCurrentUser();
        Conversation conversation = conversationService.getOrCreateConversation(sender, receiver);

   	createHeader(sender);
        createMainLayout(sender, receiver, conversation);
   }

   // Method to create the main layout of the view
   private void createMainLayout(User sender, User receiver, Conversation conversation) {
   	boolean isRead = conversationService.isReadByUser(conversation.getId(), receiver);

   	Div mainLayout = new Div(
   	    createAvatarNameLayout(sender),
   	    createActionsLayout(isRead, conversation.getId(), receiver),
   	    createPrivacyAndSupportLayout(sender, receiver, conversation)
   	);
   	mainLayout.addClassName("request-settings-main-layout");
   	setContent(mainLayout);
   }

   private Div createPrivacyAndSupportLayout(User sender, User receiver, Conversation conversation) {
   	Span header = new Span("Privacy and support");

   	String readReceiptsStatus = isReadReceiptsByUser(receiver, conversation) ? "On" : "Off";

   	Div readReceiptsDiv = new Div(new Div(new Icon("lumo", "eye"), new Span("Red receipts")), new Span(readReceiptsStatus));
   	readReceiptsDiv.addClickListener(event -> UI.getCurrent().navigate(ReadReceiptsView.class, sender.getId()));

	Div blockStatusDiv = new Div(new Icon("vaadin", "minus-circle"), new Span(getBlockStatus(receiver, sender)));
	blockStatusDiv.addClickListener(event -> {
	    VaadinSession.getCurrent().getSession().setAttribute("requestSettings", sender.getId());
	    UI.getCurrent().navigate(BlockView.class, sender.getId());
	});

	Div reportDiv = new Div(
	    new Icon("vaadin", "warning"),
	    new Div(
	    	new Span("Report"),
	    	new Span("Give feedback and report conversation")
	    )
	);

        Div deleteConversationDiv = new Div(new Icon("vaadin", "trash"), new Span("Delete conversation"));
        deleteConversationDiv.addClickListener(event -> {
            handleDeleteClickEvent(conversation, receiver);
        });

        Div privacyAndSupportLayout = new Div(header, readReceiptsDiv, blockStatusDiv, reportDiv, deleteConversationDiv);
        privacyAndSupportLayout.addClassName("request-settings-privacy-and-support");
        return privacyAndSupportLayout;
   }

   private String getBlockStatus(User receiver, User sender) {
   	String name = sender.getFullName();
   	boolean isBlocked = blockService.isBlocked(receiver, sender, Block.BlockType.MESSAGES_ONLY);
        String blockStatus = isBlocked ? "Unblock " + name : "Block " + name;
   	return blockStatus;
   }

   private Div createActionsLayout(boolean isRead, Long conversationId, User receiver) {
   	Div markAsReadDiv = new Div(new Icon("vaadin", "envelope"), new Span(isRead ? "Mark as unread" : "Mark as Read"));
   	Div actionsLayout = new Div(new Span("Actions"), markAsReadDiv);
   	actionsLayout.addClassName("request-settings-actions");
   	actionsLayout.addClickListener(event -> {
   	    conversationService.setReadByUser(conversationId, receiver, !isRead);
   	    UI.getCurrent().navigate(MessageView.class);
   	});
   	return actionsLayout;
   }

   private Div createAvatarNameLayout(User sender) {
   	Avatar avatar = new Avatar();
   	avatar.setImage(sender.getProfileImage());
   	Span nameSpan = new Span(sender.getFullName());
   	Div avatarNameLayout = new Div(avatar, nameSpan);
   	avatarNameLayout.addClassName("request-settings-avatar-name");
   	return avatarNameLayout;
   }

   private void handleDeleteClickEvent(Conversation conversation, User receiver) {
   	Dialog dialog = new Dialog();
	dialog.addClassName("block-dialog");
	dialog.add(
	    new Span("Delete this entire conversation?"),
	    new Span("Once you delete your copy of conversation, it can't be undone."),
	    new Div(
	    	new Button("CANCEL", e -> dialog.close()),
	    	new Button("DELETE", e -> {
	    	    dialog.close();
	    	    DeleteConversation.markConversationAsDeleted(conversation, receiver.getId(), conversationService);
	    	    UI.getCurrent().navigate(MessageRequestsView.class);
	    	})
	    )
	);
	dialog.open();
   }

   // Method to check if the conversation is read receipts or not by user (receiver)
   private boolean isReadReceiptsByUser(User user, Conversation convo) {
        return (convo.getUser1().getId().equals(user.getId()) && convo.isReadReceiptsByUser1()) ||
               (convo.getUser2().getId().equals(user.getId()) && convo.isReadReceiptsByUser2());
   }

   private void createHeader(User sender) {
   	Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> UI.getCurrent().navigate(UserRequestView.class, sender.getId()));

        HorizontalLayout headerLayout = new HorizontalLayout(backIcon);
        headerLayout.addClassName("request-header-layout");
        addToNavbar(headerLayout);
   }
}
