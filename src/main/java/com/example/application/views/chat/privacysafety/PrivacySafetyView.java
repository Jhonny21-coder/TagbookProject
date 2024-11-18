package com.example.application.views.chat.privacysafety;

import com.example.application.views.chat.SettingsView;
import com.example.application.views.chat.privacysafety.messagedelivery.MessageDeliveryView;
import com.example.application.views.chat.privacysafety.blockedaccounts.BlockedAccountsView;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.UI;

import jakarta.annotation.security.PermitAll;

@PermitAll
@Route("privacySafety")
public class PrivacySafetyView extends AppLayout {

    public PrivacySafetyView() {
    	addClassName("message-settings-app-layout");
    	createMainLayout();
    	createHeader();
    }

    private void createMainLayout() {
    	Div mainLayout = new Div(
    	    createWhoCanReachYou(),
    	    createWhatPeopleSee(),
    	    createEndToEndEncryptedChats()
    	);
    	mainLayout.addClassName("privacysafety-main-layout");
    	setContent(mainLayout);
    }

    private Div createWhoCanReachYou() {
    	Span header = new Span("Who can reach you");

    	Div messageDeliveryDiv = new Div(
    	    new Div(
    	    	new Span("Message delivery"),
    	    	new Span("Choose who can message you")
    	    ),
    	    new Icon("lumo", "angle-right")
    	);
    	messageDeliveryDiv.addClickListener(event -> UI.getCurrent().navigate(MessageDeliveryView.class));

    	Div blockedAccountsDiv = new Div(
    	    new Div(
            	new Span("Blocked accounts"),
            	new Span("Stop someone from contacting you")
            ),
            new Icon("lumo", "angle-right")
        );
        blockedAccountsDiv.addClickListener(event -> UI.getCurrent().navigate(BlockedAccountsView.class));

        Div hiddenContactsDiv = new Div(
            new Div(
            	new Span("Hidden contacts"),
            	new Span("Hide people from you suggested contacts")
            ),
            new Icon("lumo", "angle-right")
        );

        Div line = new Div();
        line.addClassName("privacysafety-line");

        Div mainDiv = new Div(header, messageDeliveryDiv, blockedAccountsDiv, hiddenContactsDiv, line);
        mainDiv.addClassName("privacysafety-main-div");
	return mainDiv;
    }

    private Div createWhatPeopleSee() {
    	Span header = new Span("What poeple see");

    	Div readReceiptsDiv = new Div(
    	    new Div(
            	new Span("Read receipts"),
            	new Span("Let people see you've read their messages")
            ),
            new Icon("lumo", "angle-right")
        );
        readReceiptsDiv.addClickListener(event -> UI.getCurrent().navigate(ReadReceiptsView.class));

	Div line = new Div();
	line.addClassName("privacysafety-line");

        Div mainDiv = new Div(header, readReceiptsDiv, line);
        mainDiv.addClassName("privacysafety-main-div");
        return mainDiv;
    }

    private Div createEndToEndEncryptedChats() {
        Span header = new Span("End-to-end encrypted chats");

        Div securityAlertsDiv = new Div(
            new Div(
            	new Span("Security alerts"),
            	new Span("View and manage alerts for logins and key changes")
            ),
            new Icon("lumo", "angle-right")
        );

        Div messageStorageDiv = new Div(
            new Div(
            	new Span("Message storage"),
            	new Span("Manage on how you store and access your chat history.")
            ),
            new Icon("lumo", "angle-right")
        );

        Div previewsDiv = new Div(
            new Div(
            	new Span("Previews"),
            	new Span("See previews of Tagbook content")
            ),
            new Icon("lumo", "angle-right")
        );

        Div mainDiv = new Div(header, securityAlertsDiv, messageStorageDiv, previewsDiv);
        mainDiv.addClassName("privacysafety-main-div");
        return mainDiv;
    }

    private void createHeader() {
        Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> {
            UI.getCurrent().navigate(SettingsView.class);
        });

        HorizontalLayout headerLayout = new HorizontalLayout(backIcon, new Span("Privacy & safety"));
        headerLayout.addClassName("message-settings-header-layout");

        addToNavbar(headerLayout);
   }
}
