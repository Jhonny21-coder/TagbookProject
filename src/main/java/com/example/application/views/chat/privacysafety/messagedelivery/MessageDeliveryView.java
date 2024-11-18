package com.example.application.views.chat.privacysafety.messagedelivery;

import com.example.application.views.chat.privacysafety.PrivacySafetyView;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;

import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.router.Route;

import jakarta.annotation.security.PermitAll;

@PermitAll
@Route("messageDelivery")
public class MessageDeliveryView extends AppLayout {

    public MessageDeliveryView() {
    	addClassName("message-settings-app-layout");
    	createHeader();
    	createMainLayout();
    }

    private void createMainLayout() {
    	Div mainLayout = new Div(createInformation(), createPotentialConnections(), createOtherPeople());
    	mainLayout.addClassName("privacysafety-main-layout");
	setContent(mainLayout);
    }

    private Span createInformation() {
    	Span information = new Span(
            new Span("Decide whether message requests go to your Chats list, your Message requests folder, or whether to receive them at all. " +
            	     "Not all messages are requests. " +
            	     "Messages like those from Tagbook friends and Marketplace go to your Chat list. "),
            new Span("See the full list of who can message you.")
        );
        information.addClassName("privacysafety-information");
        return information;
    }

    private Div createPotentialConnections() {
    	Span header = new Span("Potential connections");

    	Div friendsOfFriendsDiv = new Div(new Div(new Span("Friends of friends on Facebook"), new Span("Message requests")), new Icon("lumo", "angle-right"));
        friendsOfFriendsDiv.addClickListener(event -> UI.getCurrent().navigate(FriendsOfFriendsView.class));

    	Div line1 = new Div();
    	line1.addClassNames("message-delivery-line1", "privacysafety-line");

    	Div line2 = new Div();
    	line2.addClassNames("message-delivery-line2", "privacysafety-line");

    	Div mainDiv = new Div(line1, header, friendsOfFriendsDiv, line2);
        mainDiv.addClassName("privacysafety-main-div");
        return mainDiv;
    }

    private Div createOtherPeople() {
    	Span header = new Span("Other people");

        Div otherPeopleDiv = new Div(new Div(new Span("Others on Facebook"), new Span("Message requests")), new Icon("lumo", "angle-right"));
        otherPeopleDiv.addClickListener(event -> UI.getCurrent().navigate(OtherPeopleView.class));

        Div mainDiv = new Div(header, otherPeopleDiv);
        mainDiv.addClassName("privacysafety-main-div");
        return mainDiv;
    }

    private void createHeader() {
        Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> {
            UI.getCurrent().navigate(PrivacySafetyView.class);
        });

        HorizontalLayout headerLayout = new HorizontalLayout(backIcon, new Span("Message Delivery"));
        headerLayout.addClassName("message-settings-header-layout");

        addToNavbar(headerLayout);
   }
}
