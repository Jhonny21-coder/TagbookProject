package com.example.application.views.follower;

import com.example.application.data.PostReaction;
import com.example.application.services.PostReactionService;
import com.example.application.data.notification.Notification;
import com.example.application.data.notification.NotificationType;
import com.example.application.services.notification.NotificationService;
import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.data.Follower;
import com.example.application.services.FollowerService;
import com.example.application.views.MainFeed;
import com.example.application.views.profile.UserProfile;
import com.example.application.views.search.SearchView;
import com.example.application.views.comment.CommentSectionView;
import com.example.application.views.comment.ReplyCommentView;
import com.example.application.views.profile.FollowerView;
import com.example.application.views.MainLayout;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.component.dialog.Dialog;
import jakarta.annotation.security.PermitAll;

import java.io.FileInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;

import java.util.Set;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.stream.Collectors;
import java.util.Collections;

import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
import java.time.LocalDateTime;
import java.time.Duration;

@PermitAll
@Route(value = "main-follower-view", layout = MainLayout.class)
public class MainFollowerView extends AppLayout {

    private final NotificationService notificationService;
    private final UserServices userService;
    private final PostReactionService postService;
    private final FollowerService followerService;

    public MainFollowerView(NotificationService notificationService, UserServices userService,
    	PostReactionService postService, FollowerService followerService){
    	this.notificationService = notificationService;
   	this.userService = userService;
   	this.postService = postService;
   	this.followerService = followerService;

	addClassName("main-follower-app-layout");
   	createHeader();
   	createMainLayout();
    }

    public void createMainLayout() {
    	FormLayout mainLayout = new FormLayout();
    	mainLayout.addClassName("main-follower-form-layout");

    	HorizontalLayout headerLayout = new HorizontalLayout(
    	    new Button("Suggestions"),
    	    new Button("Your followers", e -> UI.getCurrent().navigate(FollowerView.class))
    	);
    	headerLayout.addClassName("main-follower-header-layout");

    	HorizontalLayout seeAllButton = new HorizontalLayout(
    		new Button("See all", e -> new Span("haha"))
    	);
    	seeAllButton.addClassName("main-follower-all-button");

    	mainLayout.add(headerLayout, createFollowerRequest(), seeAllButton);

    	setContent(mainLayout);
    }

    private VerticalLayout createFollowerRequest() {
    	User user = userService.findCurrentUser();

    	Span requestText = new Span("Follower requests (" + "700K" + ")");
    	requestText.addClassName("main-follower-request-text");

    	Span seeAllText = new Span("See all");
    	seeAllText.addClassName("main-follower-request-all-text");

	HorizontalLayout headerLayout = new HorizontalLayout(requestText, seeAllText);
        headerLayout.addClassName("main-follower-request-header");

    	VerticalLayout parentLayout = new VerticalLayout(headerLayout);
    	parentLayout.addClassName("main-follower-parent-layout");

	List<Follower> followers = followerService.getUserUnconfirmedFollowers(user.getId());
	Collections.reverse(followers);

	List<Follower> filteredFollowers = followers.stream()
				   .limit(followers.size() > 20 ? 20 : followers.size())
				   .collect(Collectors.toList());
	filteredFollowers.forEach(follower -> {
	    User unconfirmedUser = follower.getFollower();

	    String imageUrl = unconfirmedUser.getProfileImage();

	    HorizontalLayout childLayout = new HorizontalLayout();
	    childLayout.addClassName("main-follower-child-layout");

    	    Avatar avatar = new Avatar();
    	    avatar.setImage(imageUrl);
	    avatar.addClassName("main-follower-request-avatar");

	    HorizontalLayout nameLayout = new HorizontalLayout(
	        new Span(unconfirmedUser.getFullName()),
	        new Span("10y")
	    );
	    nameLayout.addClassName("main-follower-name-layout");

	    HorizontalLayout buttonsLayout = new HorizontalLayout(
	       new Button("Confirm"),
	       new Button("Delete", e -> parentLayout.remove(childLayout))
	    );
	    buttonsLayout.addClassName("main-follower-buttons-layout");

	    VerticalLayout middleLayout = new VerticalLayout(nameLayout, buttonsLayout);
	    middleLayout.addClassName("main-follower-middle-layout");

	    childLayout.add(avatar, middleLayout);
	    parentLayout.add(childLayout);
    	});

    	return parentLayout;
    }

    private void createHeader(){
    	Span followerText = new Span("Followers");
    	followerText.addClassName("main-followers-text-1");

    	Icon searchIcon = new Icon("vaadin", "search");
    	searchIcon.addClassName("notif-search-icon");
    	searchIcon.addClickListener(event -> {
            UI.getCurrent().navigate(SearchView.class);
        });

    	HorizontalLayout headerLayout = new HorizontalLayout(followerText, searchIcon);
    	headerLayout.addClassName("main-follower-header-layout-1");

    	addToNavbar(headerLayout);
    }
}

