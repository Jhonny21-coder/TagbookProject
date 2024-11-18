package com.example.application.views.chat;

import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.data.Block;
import com.example.application.services.BlockService;
import com.example.application.views.chat.message_requests.MessageRequestsView;
import com.example.application.views.chat.message_requests.UserRequestView;
import com.example.application.views.chat.message_requests.RequestSettingsView;
import com.example.application.views.chat.privacysafety.blockedaccounts.BlockedAccountsView;
import com.example.application.views.chat.privacysafety.blockedaccounts.BlockAnAccountView;

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
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.component.Component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.annotation.security.PermitAll;

import java.util.List;
import java.util.Set;

@PermitAll
@Route("block")
public class BlockView extends AppLayout implements HasUrlParameter<Long> {

    private final Logger logger = LoggerFactory.getLogger(BlockView.class);

    private final UserServices userService;
    private final BlockService blockService;
    private Span blockMessagesAndCallsText = new Span();
    private Span blockTagbookText = new Span();
    private List<String> messagesAndCallsInformation;
    private List<String> tagbookInformation;
    private Span messagesPointList;
    private Span tagbookPointList;

    // Constructor to initialize services needed in this view
    public BlockView(UserServices userService, BlockService blockService) {
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

        // Check if the user is already blocked for messages only
        boolean isMessagesAndCallsBlocked = blockService.isBlocked(blocker, user, Block.BlockType.MESSAGES_ONLY);
        boolean isBlockedOnTagbook = blockService.isBlocked(blocker, user, Block.BlockType.FULL_BLOCK);

        // Retrieve message information based on block status
        String name = user.getFirstName();
        messagesAndCallsInformation = getInformationMessages(name, isMessagesAndCallsBlocked, isBlockedOnTagbook);
        tagbookInformation = getTagbookInformation(name, isMessagesAndCallsBlocked, isBlockedOnTagbook);

        // Determine messages and calls header based on block status
	String messagesAndCallsText = isMessagesAndCallsBlocked ? "Unblock messages and calls" :
		isBlockedOnTagbook ? "Message and calls blocked" : "Block messages and calls";
	String messagesAndCallsColor = isMessagesAndCallsBlocked ? "white" :
		isBlockedOnTagbook ? "var(--block-text-color)" : "var(--block-error-color)";
	updateMessagesAndCallsHeaderText(messagesAndCallsText, messagesAndCallsColor);

	// Determine Tagbook header based on block status
	String tagbookText = isBlockedOnTagbook ? "Unblock on Tagbook" : "Block on Tagbook";
	String tagbookColor = isBlockedOnTagbook ? "white" : "var(--block-error-color)";
	updateTagbookHeaderText(tagbookText, tagbookColor);

        // Initialize the view layout and header
        createHeader(user);
        initializeView(user, isBlockedOnTagbook);
    }

    // Helper method to provide list of information messages based on message and calls block status
    private List<String> getInformationMessages(String name, boolean isMessagesAndCallsBlocked, boolean isBlockedOnTagbook) {
        if (isMessagesAndCallsBlocked) {
            return List.of(
                "You will be able to start receiving messages and calls from " + name + ".",
                "You won't receive anything " + name + " may have sent you while blocked."
            );
        } else if (isBlockedOnTagbook) {
            return List.of("You will need to unblock "+ name + " on Tagbook to unblock messages and calls.");
        } else {
            return List.of(
            	"You won't receive messages or calls from " + name + ".",
                name + " won't be blocked on Tagbook.",
            	"If you're in groups or rooms with " + name + ", you will still be able to see, message or call each other. You can leave groups or rooms anytime."
	    );
	}
    }

    // Helper method to provide list of information based on block on tagbook status
    private List<String> getTagbookInformation(String name, boolean isMessagesAndCallsBlocked, boolean isBlockedOnTagbook) {
    	if (isBlockedOnTagbook) {
            return List.of(
                "If you want to be Tagbook friends, you will to follow " + name + " after unblocking.",
                "You will be able to receive new messages and calls from " + name + "."
            );
        } else {
            return List.of(
                "You and " + name + " won't be friends on Tagbook.",
                name + " will also be blocked on Messenger " +
                "and won't be able to search, call or message you on Tagbook."
            );
        }
    }

    // Initialize the main view layout, including block sections
    private void initializeView(User user, boolean isBlockedOnTagbook) {
        // Initialize messages bullet list with information for "Block Messages and Calls"
        messagesPointList = createBulletList(messagesAndCallsInformation);
        // Initialize messages bullet list with information for "Block on Tagbook"
        tagbookPointList = createBulletList(tagbookInformation);

        Div messageAndCalls = createBlockSection(user, blockMessagesAndCallsText, messagesPointList, false);
        Div tagBook = createBlockSection(user, blockTagbookText, tagbookPointList, true);

        if (isBlockedOnTagbook) {
            messageAndCalls.getStyle().set("pointer-events", "none");
            blockMessagesAndCallsText.getStyle().set("color", "var(--block-text-color)");
        }

        // Main layout containing block sections
        Div mainLayout = new Div(messageAndCalls, tagBook);
        mainLayout.addClassName("block-main-layout");
        setContent(mainLayout);
    }

    // Creates a section for block/unblock options
    private Div createBlockSection(User user, Span title, Span points, boolean isTagbookBlock) {
        // Title div includes block/unblock option title and event handling for clicks
        Div titleDiv = createSectionTitleDiv(user, title, isTagbookBlock);

        // Main div containing title and point list
        Div mainDiv = new Div(titleDiv, points);
        mainDiv.addClassName("block-section");
        return mainDiv;
    }

    // Toggles the blocking status for messages and calls, and refreshes UI accordingly
    private void toggleBlockStatus(User blocker, User user, boolean isBlocked) {
        if (isBlocked) {
            blockService.unblockUser(blocker, user);
            updateMessagesAndCallsHeaderText("Block messages and calls", "var(--block-error-color)");
        } else {
            blockService.blockUser(blocker, user, Block.BlockType.MESSAGES_ONLY);
            updateMessagesAndCallsHeaderText("Unblock messages and calls", "white");
        }

        // Update information and refresh only the messagesPointList
        messagesAndCallsInformation = getInformationMessages(user.getFirstName(), !isBlocked, false);
        refreshMessagesPointList();
    }

    // Refreshes the list of points related to message blocking in the UI
    private void refreshMessagesPointList() {
        Span updatedList = createBulletList(messagesAndCallsInformation);

        // Replaces the current messagesPointList with the updated one
        Div mainDiv = (Div) messagesPointList.getParent().orElse(null);
        if (mainDiv != null) {
            mainDiv.replace(messagesPointList, updatedList);
            messagesPointList = updatedList;
        }
    }

    // Creates a header for the view, including a back button
    private void createHeader(User user) {
        Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> {
            Set<String> sessionNames = VaadinSession.getCurrent().getSession().getAttributeNames();

            for (String sessionName : sessionNames){
                switch (sessionName) {
                    case "messageRequest" -> {
                    	VaadinSession.getCurrent().getSession().removeAttribute(sessionName);
                   	UI.getCurrent().navigate(MessageRequestsView.class);
                    }
                    case "requestSettings" -> {
                    	VaadinSession.getCurrent().getSession().removeAttribute(sessionName);
                   	UI.getCurrent().navigate(RequestSettingsView.class, user.getId());
                    }
                    case "message" -> {
                    	VaadinSession.getCurrent().getSession().removeAttribute(sessionName);
                   	UI.getCurrent().navigate(MessageView.class);
                    }
                    case "unblockChat" -> {
                    	VaadinSession.getCurrent().getSession().removeAttribute(sessionName);
                        UI.getCurrent().navigate(ChatView.class, user.getId());
                    }
                    case "blockedAccounts" -> {
                        VaadinSession.getCurrent().getSession().removeAttribute(sessionName);
                        UI.getCurrent().navigate(BlockedAccountsView.class);
                    }
                    case "blockAnAccount" -> {
                        VaadinSession.getCurrent().getSession().removeAttribute(sessionName);
                        UI.getCurrent().navigate(BlockAnAccountView.class);
                    }
                    default -> logger.info("No session name exists");
                }
            }
        });

        String fullName = truncate(user.getFirstName(), 27);

        HorizontalLayout headerLayout = new HorizontalLayout(backIcon, new Span("Block " + fullName));
        headerLayout.addClassName("message-settings-header-layout");

        addToNavbar(headerLayout);
    }

    // Helper method to create the title div with event handling for each block section
    private Div createSectionTitleDiv(User user, Span title, boolean isTagbookBlock) {
        Div titleDiv = new Div(title, new Icon("vaadin", "minus-circle"));
        titleDiv.addClickListener(event -> {
            if (isTagbookBlock) {
                UI.getCurrent().navigate(BlockOnTagbookView.class, user.getId());
            } else {
                handleBlockMessagesAndCallsClickEvent(user);
            }
        });
        return titleDiv;
    }

    // Creates a bullet list component from a list of points
    private Span createBulletList(List<String> points) {
        Span bulletList = new Span();
        bulletList.addClassName("block-list");
        points.forEach(point -> bulletList.add(new Div(new Span("•"), new Span(point))));
        return bulletList;
    }

    // Opens a dialog for blocking/unblocking messages and calls
    private void handleBlockMessagesAndCallsClickEvent(User user) {
        User blocker = userService.findCurrentUser();
        boolean isBlocked = blockService.isBlocked(blocker, user, Block.BlockType.MESSAGES_ONLY);

        Dialog dialog = createBlockDialog(user, isBlocked, blocker);
        dialog.open();
    }

    // Creates a dialog to confirm blocking/unblocking of messages and calls
    private Dialog createBlockDialog(User user, boolean isBlocked, User blocker) {
        String name = user.getFirstName();

        Dialog dialog = new Dialog();
        dialog.addClassName("block-dialog");

        String actionText = isBlocked ? "Unblock" : "Block";
        Span infoText = new Span(isBlocked
            ? "You will be able to receive new messages and calls from " + name + "."
            : name + " won't be notified and you can unblock " + name + " anytime. Your conversation will still be visible unless you delete it.");

        Span mainText = new Span(actionText + " messages and calls from " + name + "?");

        // Cancel and action buttons for the dialog
        Button cancelButton = new Button("CANCEL", e -> dialog.close());
        Button actionButton = new Button(actionText.toUpperCase(), e -> {
            toggleBlockStatus(blocker, user, isBlocked);
            dialog.close();
        });

        Div buttonContainer = new Div(cancelButton, actionButton);
        dialog.add(mainText, infoText, buttonContainer);

        return dialog;
    }

    // Updates the header text and color based on block/unblock status
    private void updateMessagesAndCallsHeaderText(String text, String color) {
        blockMessagesAndCallsText.setText(text);
        blockMessagesAndCallsText.getStyle().set("color", color);
    }

    // Updates the header text and color based on block/unblock status
    private void updateTagbookHeaderText(String text, String color) {
        blockTagbookText.setText(text);
        blockTagbookText.getStyle().set("color", color);
    }

    private String truncate(String text, int length) {
    	return text.length() > length ? text.substring(0, length) + "…" : text;
    }
}
