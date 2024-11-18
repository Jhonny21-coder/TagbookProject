package com.example.application.views.chat;

import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.data.Block;
import com.example.application.services.BlockService;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.UnorderedList;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.button.Button;

import jakarta.annotation.security.PermitAll;

import java.util.List;

@PermitAll
@Route("blockOnTagbook")
public class BlockOnTagbookView extends AppLayout implements HasUrlParameter<Long> {
    private final UserServices userService;
    private final BlockService blockService;
    private Span blockMessagesAndCallsText = new Span();
    private List<String> messagesAndCallsInformation;
    private Span messagesPointList;
    private Span tagbookPointList;

    // Constructor to initialize services needed in this view
    public BlockOnTagbookView(UserServices userService, BlockService blockService) {
        this.userService = userService;
        this.blockService = blockService;
        addClassName("settings-app-layout");
   }

    // Method to handle URL parameters, specifically userId here
    @Override
    public void setParameter(BeforeEvent event, Long userId) {
        // Fetch user and current (blocking) user details
        User user = userService.getUserById(userId);
        User blocker = userService.findCurrentUser();

        boolean isBlocked = blockService.isMessageOrFullBlocked(blocker, user, Block.BlockType.FULL_BLOCK);

	// Initialize the view layout, header, and footer
	createHeader(user);
        initializeView(user, isBlocked);
        createFooter(blocker, user);
    }

    private void initializeView(User user, boolean isBlocked) {
    	String name = user.getFirstName();
    	Div mainLayout = new Div(createBulletList(name, isBlocked));
    	mainLayout.addClassName("block-on-tagbook-main-layout");
    	setContent(mainLayout);
    }

    private Div createBulletList(String name, boolean isBlocked) {
    	String statusText = isBlocked ? "Unblock " : "Block ";
    	Span headerText = new Span(statusText + name + "?");
    	Span bulletHeaderText = new Span(name + " will no longer be able to:");

    	if (isBlocked) bulletHeaderText.setVisible(false);

    	Div mainDiv = new Div(headerText, bulletHeaderText);
    	mainDiv.addClassName("block-on-tagbook-main-div");

    	getBulletPoints(name, isBlocked).forEach(point -> {
    	    Span bullet = isBlocked ? new Span() : new Span("•");
    	    mainDiv.add(new Div(bullet, new Span(point)));
    	});
    	return mainDiv;
    }

    private List<String> getBulletPoints(String name, boolean isBlocked) {
    	if (isBlocked) {
    	    return List.of(
    	       	"If you unblock " + name + ", " + name + " maybe be able to see your timeline or contact you, depending on your settings.",
    	       	"Tags you and " + name + " previously added of each other may be restored.",
    	       	"You will have to wait 48 hours if you want to block " + name + " again."
    	    );
    	} else {
    	    return List.of(
    	    	"See things you post on your timeline",
    	    	"Tag you",
    	    	"Invite you to events or groups",
    	    	"Start a conversation with you",
    	    	"Follow you",
    	    	"If you're both following each other, blocking " + name + " will also unfollow you and " + name + "; " + name + " may still see you in apps, games, or groups you're both in." 
    	    );
    	}
    }

    private void createFooter(User blocker, User blocked) {
    	boolean isBlocked = blockService.isMessageOrFullBlocked(blocker, blocked, Block.BlockType.FULL_BLOCK);
    	String actionText = isBlocked ? "Unblock" : "Block";
    	Button blockButton = new Button(actionText, e -> {
    	    if (isBlocked) {
    	    	blockService.unblockUser(blocker, blocked);
    	    } else {
    	    	blockService.blockUser(blocker, blocked, Block.BlockType.FULL_BLOCK);
    	    }
    	    UI.getCurrent().navigate(BlockView.class, blocked.getId());
    	});
    	String buttonColor = isBlocked ? "var(--lumo-primary-color)" : "var(--block-button-error-color)";
    	blockButton.getStyle().set("background", buttonColor);

    	Button cancelButton = new Button("Cancel", e -> UI.getCurrent().navigate(BlockView.class, blocked.getId()));

    	Div buttonsDiv = new Div(blockButton, cancelButton);
    	buttonsDiv.addClassName("block-on-tagbook-buttons-div");

    	addToNavbar(true, buttonsDiv);
    }

    // Creates a header for the view, including a back button
    private void createHeader(User user) {
        Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> UI.getCurrent().navigate(BlockView.class, user.getId()));

        HorizontalLayout headerLayout = new HorizontalLayout(backIcon, new Span("Block"));
        headerLayout.addClassName("message-settings-header-layout");

        addToNavbar(headerLayout);
    }
}
