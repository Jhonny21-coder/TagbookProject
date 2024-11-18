package com.example.application.views.chat.privacysafety;

import com.example.application.data.User;
import com.example.application.services.UserServices;

import com.vaadin.componentfactory.ToggleButton;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.router.Route;

import jakarta.annotation.security.PermitAll;

import java.util.concurrent.atomic.AtomicBoolean;

@PermitAll
@Route("userReadReceipts")
public class ReadReceiptsView extends AppLayout {
   private final UserServices userService;
   private Span information = new Span();

   public ReadReceiptsView(UserServices userService) {
   	this.userService = userService;
   	addClassName("settings-app-layout");
   	createHeader();
   	createMainLayout();
   }

   private void createMainLayout() {
   	String name = "";
	boolean isReadReceipts = true;
   	if (isReadReceipts) {
   	    createReadReceiptsInformation();
   	} else {
   	    createNotReadReceiptsInformation();
   	}

        Div mainLayout = new Div(createStatusToggleButton(), information);
        mainLayout.addClassName("read-receipts-main-layout");

        setContent(mainLayout);
   }

   private Div createStatusToggleButton() {
    	AtomicBoolean isReadReceiptsEnabled = new AtomicBoolean(true);

    	ToggleButton toggle = new ToggleButton();
    	toggle.setValue(isReadReceiptsEnabled.get());
    	toggle.addValueChangeListener(event -> {
            updateToggleButton(toggle, isReadReceiptsEnabled); // Update toggle button

            if (event.getValue()) {
                createReadReceiptsInformation();
            } else {
                createNotReadReceiptsInformation();
            }
            isReadReceiptsEnabled.set(!isReadReceiptsEnabled.get());
    	});

    	Div statusDiv = new Div(new Span("Show read receipts"), toggle);
    	return new Div(statusDiv);
   }

   private void updateToggleButton(ToggleButton toggle, AtomicBoolean isReadReceiptsEnabled) {
    	toggle.setValue(!isReadReceiptsEnabled.get());
   }

   private void createReadReceiptsInformation() {
   	String text = "People will be able to see when you've read their messages.";
        information.setText(text);
   }

   private void createNotReadReceiptsInformation() {
    	String text = "People won't able to see when you've read their messages, and you won't be able to see when they've read yours.";
    	information.setText(text);
   }

   private void createHeader() {
   	Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> {
            UI.getCurrent().navigate(PrivacySafetyView.class);
        });

        HorizontalLayout headerLayout = new HorizontalLayout(backIcon, new Span("Read receipts"));
        headerLayout.addClassName("message-settings-header-layout");

        addToNavbar(headerLayout);
   }
}
