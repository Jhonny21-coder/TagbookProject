package com.example.application.views.chat;

import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.data.Conversation;
import com.example.application.services.ConversationService;
import com.example.application.views.chat.message_requests.RequestSettingsView;

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
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;

import jakarta.annotation.security.PermitAll;

import java.util.concurrent.atomic.AtomicBoolean;

@PermitAll
@Route("readReceipts")
public class ReadReceiptsView extends AppLayout implements HasUrlParameter<Long> {
   private final UserServices userService;
   private final ConversationService conversationService;

   private Span information = new Span();
   private User sender;

   public ReadReceiptsView(UserServices userService, ConversationService conversationService) {
   	this.userService = userService;
   	this.conversationService = conversationService;
   	addClassName("settings-app-layout");
   }

   @Override
   public void setParameter(BeforeEvent event, Long senderId) {
   	sender = userService.getUserById(senderId);
   	User receiver = userService.findCurrentUser();

   	createHeader();
        createMainLayout(receiver);
   }

   private void createMainLayout(User receiver) {
   	Conversation conversation = conversationService.getOrCreateConversation(receiver, sender);

   	if (isReadReceiptsByUser(receiver, conversation)) {
   	    createReadReceiptsInformation();
   	} else {
   	    createNotReadReceiptsInformation();
   	}

        var mainLayout = new Div(createStatusToggleButton(receiver, conversation), information);
        mainLayout.addClassName("read-receipts-main-layout");

        setContent(mainLayout);
   }

   private Div createStatusToggleButton(User receiver, Conversation convo) {
    	boolean isReadReceiptsEnabledForCurrentUser =
  	   (convo.getUser1().getId().equals(receiver.getId()) && convo.isReadReceiptsByUser1()) ||
  	   (convo.getUser2().getId().equals(receiver.getId()) && convo.isReadReceiptsByUser2());

    	ToggleButton toggle = new ToggleButton();
    	toggle.setValue(isReadReceiptsEnabledForCurrentUser);
    	toggle.addValueChangeListener(event -> {
            if (receiver.getId().equals(convo.getUser1().getId())) {
            	convo.setReadReceiptsByUser1(event.getValue());
            } else if (receiver.getId().equals(convo.getUser2().getId())) {
            	convo.setReadReceiptsByUser2(event.getValue());
            }
            conversationService.updateConversation(convo);
            updateToggleButton(toggle, convo, receiver); // Update toggle button

            if (event.getValue()) {
                createReadReceiptsInformation();
            } else {
                createNotReadReceiptsInformation();
            }
    	});

    	Div statusDiv = new Div(new Span("Show read receipts"), toggle);
    	return new Div(statusDiv);
   }

   private void updateToggleButton(ToggleButton toggle, Conversation convo, User receiver) {
    	boolean isReadReceiptsEnabledForCurrentUser =
           (convo.getUser1().getId().equals(receiver.getId()) && convo.isReadReceiptsByUser1()) ||
           (convo.getUser2().getId().equals(receiver.getId()) && convo.isReadReceiptsByUser2());
    	toggle.setValue(isReadReceiptsEnabledForCurrentUser);
   }

   private void createReadReceiptsInformation() {
   	String text = sender.getFullName() + " will be able to see when you've read their messages.";
        information.setText(text);
   }

   private void createNotReadReceiptsInformation() {
    	String text = String.format(
           "%s won't be able to see when you've read their messages and you won't be able to see when they've read yours.",
           sender.getFullName()
    	);
    	information.setText(text);
   }

   /*private void createNotReadReceiptsInformation() {
        String text = """
           ${sender.getFullName()} won't be able to see when you've read their messages
           and you won't be able to see when they've read yours.
        """;

        information.setText(text);
   }*/

   private boolean isReadReceiptsByUser(User user, Conversation convo) {
    	return (convo.getUser1().getId().equals(user.getId()) && convo.isReadReceiptsByUser1()) ||
    	       (convo.getUser2().getId().equals(user.getId()) && convo.isReadReceiptsByUser2());
   }

   /*private boolean isReadReceiptsByUser(User receiver, Conversation convo) {
   	Long user1Id = convo.getUser1().getId();
   	Long user2Id = convo.getUser2().getId();
   	Long userId = receiver.getId();

   	if (user1Id.equals(userId) && convo.isReadReceiptsByUser1()) {
   	    return true;
   	} else if(user2Id.equals(userId) && convo.isReadReceiptsByUser2()) {
   	    return true;
   	}
   	return false;
   }*/

   private void createHeader() {
   	var backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> {
            UI.getCurrent().navigate(RequestSettingsView.class, sender.getId());
        });

        var headerLayout = new HorizontalLayout(backIcon, new Span("Read receipts"));
        headerLayout.addClassName("message-settings-header-layout");

        addToNavbar(headerLayout);
   }
}
