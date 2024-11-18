package com.example.application.views.chat;

import com.example.application.data.Conversation;
import com.example.application.services.ConversationService;
import com.example.application.data.User;
import com.example.application.services.UserServices;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.avatar.Avatar;

import jakarta.annotation.security.PermitAll;

import java.util.List;

@PermitAll
@Route("searchMessage")
public class SearchMessageView extends AppLayout {
    private final UserServices userService;
    private final ConversationService conversationService;

    private TextField searchField = new TextField();

    // Constructor to initialize services needed in this view
    public SearchMessageView(UserServices userService, ConversationService conversationService) {
        this.userService = userService;
        this.conversationService = conversationService;
        addClassName("search-message-app-layout");
        initializeView();
        createHeader();
   }

    private void initializeView() {
    	User user = userService.findCurrentUser();
	List<Conversation> conversations = conversationService.getConversationsForUser(user);

    	Div mainLayout = new Div();
    	mainLayout.addClassName("search-message-main-layout");

    	Div usersDiv = new Div();

    	conversations.forEach(convo -> {
    	    if (!convo.isMessageRequest()) {
    	    	if (!ChatUtils.isConversationDeletedByCurrentUser(convo, user)) {
    	    	    User chatPartner = convo.getUser1().getId().equals(user.getId()) ? convo.getUser2() : convo.getUser1();

    	    	    Avatar avatar = new Avatar();
    	    	    avatar.setImage(chatPartner.getProfileImage());

    	    	    Div userDiv = new Div(avatar, new Span(truncate(chatPartner.getFullName(), 31)));
    	    	    userDiv.addClickListener(event -> UI.getCurrent().navigate(ChatView.class, chatPartner.getId()));
    	    	    usersDiv.add(userDiv);
    	    	}
    	    }
    	});

	Span suggestedText = new Span("Suggested");

    	mainLayout.add(suggestedText, usersDiv);
    	setContent(mainLayout);
    }

    private String truncate(String text, int length) {
        return text.length() > length ? text.substring(0, length) + "…" : text;
   }

    // Creates a header for the view, including a back button
    private void createHeader() {
        Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> UI.getCurrent().navigate(MessageView.class));

        searchField.setPlaceholder("Search messages");
        searchField.setPrefixComponent(new Icon("lumo", "search"));
        searchField.setClearButtonVisible(true);
        searchField.focus();

        HorizontalLayout headerLayout = new HorizontalLayout(backIcon, searchField);
        headerLayout.addClassName("message-settings-header-layout");

        addToNavbar(headerLayout);
    }
}
