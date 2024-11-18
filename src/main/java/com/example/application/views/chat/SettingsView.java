package com.example.application.views.chat;

import com.example.application.data.ChatMessage;
import com.example.application.services.ChatMessageService;
import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.data.Conversation;
import com.example.application.services.ConversationService;
import com.example.application.views.chat.message_requests.MessageRequestsView;
import com.example.application.views.chat.privacysafety.PrivacySafetyView;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.server.VaadinSession;

import jakarta.annotation.security.PermitAll;

import java.util.List;

@PermitAll
@Route("messageSettings")
public class SettingsView extends AppLayout {
   private final UserServices userService;
   private final ChatMessageService chatService;
   private final ConversationService conversationService;

   public SettingsView(UserServices userService, ChatMessageService chatService, ConversationService conversationService) {
   	this.userService = userService;
   	this.chatService = chatService;
   	this.conversationService = conversationService;
   	addClassName("message-settings-app-layout");
   	createHeader();
   	createMainLayout();
   }

   private void createMainLayout() {
   	User user = userService.findCurrentUser();

        Div mainLayout = new Div(
            createActiveStatus(user),
            createMessagagingNotifications(user),
            createMessageRequests(user),
            createArchive(user),
            createPrivacyAndSafety()
        );
        mainLayout.addClassName("message-settings-main-layout");

        setContent(mainLayout);
   }

   /**
    * Creates a Div component representing the Privacy and Safety section.
    * The section includes an icon and a label.
    *
    * @return a Div component containing a Privacy icon and the text "Privacy & safety".
   */
   private Div createPrivacyAndSafety() {
   	SvgIcon privacyIcon = new SvgIcon(new StreamResource("privacy.svg",
   		() -> getClass().getResourceAsStream("/META-INF/resources/icons/privacy.svg")));
   	Div privacySafeteDiv = new Div(new Div(privacyIcon, new Span("Privacy & safety")));
   	privacySafeteDiv.addClickListener(event -> UI.getCurrent().navigate(PrivacySafetyView.class));
   	return privacySafeteDiv;
   }

   /**
    * Creates a Span component with a given size and theme.
    * The generated Span will display the size as its text content
    * and apply the specified theme name as a badge.
    *
    * @param size the size to be displayed in the Span
    * @param themeName the theme name to be applied to the Span, which will be added to the theme list
    * @return a Span component displaying the size and styled with the specified theme name
   */
   private Span generateThemeForSize(long size, String themeName) {
    	Span theme = new Span();
    	theme.addClassName("settings-numbers");

    	if (size < 1) {
    	    theme.setVisible(false);
    	} else {
    	    theme.setText(String.valueOf(size));
    	    //theme.getElement().getThemeList().add("badge " + themeName);
    	}
    	return theme;
   }

   private Div createArchive(User user) {
	List<Conversation> archives = conversationService.getArchivedConversations(user);

        Span archivesSpan = generateThemeForSize(archives.size(), "success");

   	Div archiveDiv = new Div(new Div(new Icon("vaadin", "archive"), new Span("Archive")), archivesSpan);
        archiveDiv.addClickListener(event -> {
            UI.getCurrent().navigate(ArchiveView.class);
        });
        return archiveDiv;
   }

   private Div createMessageRequests(User user) {
   	List<Conversation> messageRequests = conversationService.getRequestedConversationsByUser(user.getId());

        Span unreadMessageRequests = generateThemeForSize(messageRequests.size(), "error");

        Div messageRequestsDiv = new Div(new Div(new Icon("vaadin", "comments"), new Span("Message requests")), unreadMessageRequests);
        messageRequestsDiv.addClickListener(event -> {
            VaadinSession.getCurrent().getSession().setAttribute("settings", user.getId());
            UI.getCurrent().navigate(MessageRequestsView.class);
        });

        return messageRequestsDiv;
   }

   private Div createMessagagingNotifications(User user) {
   	String status = updateStatus(user.isPushNotifications());

   	Div messagingNotifications = new Div(new Div(new Icon("vaadin", "bell"), new Span("Messaging notifications")), new Span(status));
        messagingNotifications.addClickListener(event -> {
            UI.getCurrent().navigate(MessagingNotificationsView.class);
        });
	return messagingNotifications;
   }

   private Div createActiveStatus(User user) {
   	String status = updateStatus(user.isActiveStatus());

   	Div activeStatus = new Div(new Div(new Icon("vaadin", "circle"), new Span("Active status")), new Span(status));
        activeStatus.addClickListener(event -> {
            UI.getCurrent().navigate(ActiveStatusView.class);
        });
        return activeStatus;
   }

   private String updateStatus(boolean isStatusOn) {
   	return isStatusOn ? "On" : "Off";
   }

   private void createHeader() {
   	Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> {
            UI.getCurrent().navigate(MessageView.class);
        });

        HorizontalLayout headerLayout = new HorizontalLayout(backIcon, new Span("Messaging settings"));
        headerLayout.addClassName("message-settings-header-layout");

        addToNavbar(headerLayout);
   }
}

