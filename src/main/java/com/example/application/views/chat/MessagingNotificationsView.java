package com.example.application.views.chat;

import com.example.application.data.User;
import com.example.application.services.UserServices;

import com.vaadin.componentfactory.ToggleButton;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.router.Route;

import jakarta.annotation.security.PermitAll;

@PermitAll
@Route("messagingNotifications")
public class MessagingNotificationsView extends AppLayout {
   private final UserServices userService;

   public MessagingNotificationsView(UserServices userService) {
   	this.userService = userService;
   	addClassName("message-request-app-layout");
   	createHeader();
   	createMainLayout();
   }

   private void createMainLayout() {
   	User user = userService.findCurrentUser();

        var mainLayout = new Div(createPushToggleButton(user), createParagraph());
        mainLayout.addClassName("settings-status-main-layout");

        setContent(mainLayout);
   }

   private Div createPushToggleButton(User user) {
        var toggle = new ToggleButton();
        toggle.setValue(user.isPushNotifications());

        var line = new Div();
	var statusDiv = new Div(new Span("Push notifications"), toggle);
        statusDiv.addClickListener(event -> {
            if (user.isPushNotifications()) {
                user.setPushNotifications(false);
                toggle.setValue(false);
            } else {
                user.setPushNotifications(true);
                toggle.setValue(true);
            }
            userService.updateUser(user);
        });
        return new Div(statusDiv, line);
   }

   private Paragraph createParagraph() {
   	return new Paragraph("Push notifications are used to notify you when you receive a new message.");
   }

   private void createHeader() {
   	var backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> {
            UI.getCurrent().navigate(SettingsView.class);
        });

        var headerLayout = new HorizontalLayout(backIcon, new Span("Active Status"));
        headerLayout.addClassName("message-settings-header-layout");

        addToNavbar(headerLayout);
   }
}
