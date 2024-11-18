package com.example.application.views.chat.privacysafety.messagedelivery;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.radiobutton.RadioGroupVariant;

import jakarta.annotation.security.PermitAll;

@PermitAll
@Route("friendsOfFriends")
public class FriendsOfFriendsView extends AppLayout {

    public FriendsOfFriendsView() {
    	addClassName("message-settings-app-layout");
    	createHeader();
    	createMainLayout();
    }

    private void createMainLayout() {
    	Div mainLayout = new Div(createRadioGroup(), createInformation());
    	mainLayout.addClassName("friends-of-friends-main-layout");

	setContent(mainLayout);
    }

    private RadioButtonGroup<String> createRadioGroup() {
    	RadioButtonGroup<String> radioGroup = new RadioButtonGroup<String>("Deliver requests to", e -> {
    	    // Saving
    	}, "Chats", "Message requests", "Don't receive requests");
    	radioGroup.addThemeVariants(RadioGroupVariant.LUMO_VERTICAL);
    	return radioGroup;
    }

    private Div createInformation() {
    	Div information = new Div(
    	    new Span("Group message requests won't be delivered to your Chats list. " +
    	    	     "Remember not all messages are message requests, "
    	    ),
    	    new Span("see the full list of who can message you.")
    	);
    	information.addClassName("privacysafety-information");
        return information;
    }

    private void createHeader() {
        Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> {
            UI.getCurrent().navigate(MessageDeliveryView.class);
        });

        HorizontalLayout headerLayout = new HorizontalLayout(backIcon, new Span("Friends of friends on Facebook"));
        headerLayout.addClassName("message-settings-header-layout");

        addToNavbar(headerLayout);
   }
}
