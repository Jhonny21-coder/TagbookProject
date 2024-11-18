package com.example.application.views.chat;

import com.example.application.data.User;
import com.example.application.services.UserServices;

import com.vaadin.componentfactory.ToggleButton;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.router.Route;

import jakarta.annotation.security.PermitAll;

import java.util.concurrent.atomic.AtomicBoolean;

@PermitAll
@Route("activeStatus")
public class ActiveStatusView extends AppLayout {
   private final UserServices userService;

   private Span firstParagraph = new Span();

   public ActiveStatusView(UserServices userService) {
   	this.userService = userService;
   	addClassName("settings-app-layout");
   	createHeader();
   	createMainLayout();
   }

   private void createMainLayout() {
   	User user = userService.findCurrentUser();

   	if (user.isActiveStatus()) {
   	    createFirstParagraph();
   	} else {
   	    updateFirstParagraph();
   	}

   	var firstParagraphDiv = new Div(firstParagraph);

        var mainLayout = new Div(createStatusToggleButton(user), firstParagraphDiv, createSecondParagraph());
        mainLayout.addClassName("settings-status-main-layout");

        setContent(mainLayout);
   }

   private Div createStatusToggleButton(User user) {
        var toggle = new ToggleButton();
        toggle.setValue(user.isActiveStatus());

        var line = new Div();
	var statusDiv = new Div(new Span("Show when you're active"), toggle);
        statusDiv.addClickListener(event -> {
            if (user.isActiveStatus()) {
                Dialog dialog = new Dialog();
                dialog.addClassName("active-status-dialog");
                dialog.open();
                createTurnOffStatus(user, dialog, toggle);
            } else {
            	createFirstParagraph();
                user.setActiveStatus(true);
                userService.updateUser(user);
                toggle.setValue(true);
            }
        });
        return new Div(statusDiv, line);
   }

   private void createTurnOffStatus(User user, Dialog dialog, ToggleButton toggle) {
   	var dialogDiv = new Div();

   	var buttonsDiv = new Div(
   	    new Button("Cancel", e -> dialog.close()),
   	    new Button("Turn off", e -> {
   	    	user.setActiveStatus(false);
   	    	userService.updateUser(user);
   	    	toggle.setValue(false);
   	    	updateFirstParagraph();
   	    	dialog.close();
   	    })
   	);

   	dialogDiv.add(new Span("Turn off Active Status"),
   	    new Span("You won't be able to see when your friends and contacts are active or have recenyly been active on all Tagbook products."),
   	    buttonsDiv
   	);

   	dialog.add(dialogDiv);
   }

   private void createFirstParagraph() {
   	firstParagraph.setText(
             "Your friends and contacts can see when your're active, " +
             "recently active on this profile. To change this, turn off the " +
             "setting every place your're using Tagbook. " +
             "You'll also see when your friends and contacts are active or recently active. "
        );
        var learnMore = new Span("Learn more");
        firstParagraph.add(learnMore);
   }

   private Paragraph createSecondParagraph() {
   	var secondParagraph = new Paragraph(
             "You can turn off active status at any time and your active " +
             "status will no longer be shown, but you'll be able to " +
             "continue to use our services."
	);
	return secondParagraph;
   }

   private void updateFirstParagraph() {
   	firstParagraph.setText(
   	    "You won't see when your friends and contacts are active, " +
   	    "recently active on this app. You'll still appear active, recently " +
   	    "active or currently in the same chat as friends and contacts " +
   	    "on this profile on other mobiles devices, unless you turn off " +
   	    "the setting on those surfaces. "
   	);
   	var learnMore = new Span("Learn more");
        firstParagraph.add(learnMore);
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
