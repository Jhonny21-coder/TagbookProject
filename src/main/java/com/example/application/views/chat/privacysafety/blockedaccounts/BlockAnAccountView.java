package com.example.application.views.chat.privacysafety.blockedaccounts;

import com.example.application.data.Conversation;
import com.example.application.services.ConversationService;
import com.example.application.data.User;
import com.example.application.data.dto.conversation.ConversationUserDTO;
import com.example.application.services.UserServices;
import com.example.application.views.chat.ChatUtils;
import com.example.application.views.chat.BlockView;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.server.VaadinSession;

import jakarta.annotation.security.PermitAll;

import java.util.List;

@PermitAll
@Route("blockAnAccount")
public class BlockAnAccountView extends AppLayout {
    private final UserServices userService;
    private final ConversationService conversationService;

    private TextField searchField = new TextField();

    // Constructor to initialize services needed in this view
    public BlockAnAccountView(UserServices userService, ConversationService conversationService) {
        this.userService = userService;
        this.conversationService = conversationService;
        addClassName("search-message-app-layout");
        initializeView();
        createHeader();
   }

    private void initializeView() {
    	User user = userService.findCurrentUser();

    	Div mainLayout = new Div();
    	mainLayout.addClassName("search-message-main-layout");

    	Div usersDiv = new Div();

	List<ConversationUserDTO> conversations = conversationService.getActiveConversationsByUserDTO(user);
    	conversations.forEach(convo -> {
    	    if (!convo.isMessageRequest()) {
            	// Create the Avatar component using the chat partner's profile image
            	Avatar avatar = new Avatar();
            	avatar.setImage(convo.getProfileImage());

            	// Create a Div to display the chat partner's name, truncated to a max length of 31 characters
            	Div userDiv = new Div(avatar, new Span(ChatUtils.truncate(convo.getFullName(), 31)));

            	// Add a click listener to navigate to the BlockView when the user's div is clicked
            	userDiv.addClickListener(event -> {
            	    VaadinSession.getCurrent().getSession().setAttribute("blockAnAccount", convo.getChatPartnerId());
            	    UI.getCurrent().navigate(BlockView.class, convo.getChatPartnerId());
            	});

            	// Add the userDiv to the usersDiv container
            	usersDiv.add(userDiv);
            }
	});

    	mainLayout.add(usersDiv);
    	setContent(mainLayout);
    }

    // Creates a header for the view, including a back button
    private void createHeader() {
        Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> UI.getCurrent().navigate(BlockedAccountsView.class));

        searchField.setPlaceholder("Search");
        searchField.setPrefixComponent(new Icon("lumo", "search"));
        searchField.setClearButtonVisible(true);

        Div headerLayout = new Div(
            new Div(backIcon, new Span("Block an account")),
            searchField
        );
        headerLayout.addClassName("block-an-account-header-layout");

        addToNavbar(headerLayout);
    }
}
