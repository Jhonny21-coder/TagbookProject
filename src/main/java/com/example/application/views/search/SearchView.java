package com.example.application.views.search;

import com.example.application.data.Follower;
import com.example.application.services.FollowerService;
import com.example.application.data.Search;
import com.example.application.services.SearchService;
import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.views.profile.UserProfile;
import com.example.application.data.notification.Notification;
import com.example.application.services.notification.NotificationService;
import com.example.application.views.BottomSheet;
import com.example.application.views.MainFeed;

import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Image;

import jakarta.annotation.security.PermitAll;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.FileInputStream;

import java.time.LocalDateTime;
import java.time.Duration;
import java.time.ZoneId;

import java.util.List;
import java.util.Collections;
import java.util.stream.Collectors;
import java.util.concurrent.atomic.AtomicBoolean;

@PermitAll
@Route("search-view")
public class SearchView extends AppLayout {

    private final UserServices userService;
    private final SearchService searchService;
    private final NotificationService notificationService;
    private final FollowerService followerService;

    private TextField searchField = new TextField();
    private VerticalLayout searchHistoryLayout = new VerticalLayout();
    private Span recentText = new Span();
    private Span seeAllText = new Span("See all");

    public SearchView(UserServices userService, SearchService searchService,
    	NotificationService notificationService, FollowerService followerService){
    	this.userService = userService;
    	this.searchService = searchService;
    	this.notificationService = notificationService;
    	this.followerService = followerService;

    	addClassName("profile-app-layout");
    	createHeader();
    	createMainLayout();
    }

    public void createMainLayout(){
    	VerticalLayout mainLayout = new VerticalLayout();
    	mainLayout.addClassName("search-main-layout");

    	recentText.addClassName("search-recent-text");

    	seeAllText.addClassName("search-see-all-text");
    	seeAllText.addClickListener(event -> {
    	    UI.getCurrent().navigate(SearchHistoryView.class);
    	});

    	HorizontalLayout headerLayout = new HorizontalLayout(recentText, seeAllText);
    	headerLayout.addClassName("search-header-layout");

        VerticalLayout searchHistoryLayout = createSearchHistoryLayout();
    	searchHistoryLayout.addClassName("search-history-layout");

    	mainLayout.add(headerLayout, searchHistoryLayout);

    	setContent(mainLayout);
    }

    private VerticalLayout createPeopleYouMayKnow() {
    	User currentUser = userService.findCurrentUser();

    	Span headerText = new Span("People you may know");
    	headerText.addClassName("search-people-header-text");

    	HorizontalLayout peopleParentLayout = new HorizontalLayout();
    	peopleParentLayout.addClassName("search-people-parent-layout");

    	List<User> users = userService.getAllUsers();
	users.forEach(user -> {
	    VerticalLayout peopleChildLayout = new VerticalLayout();
	    peopleChildLayout.addClassName("search-people-child-layout");

	    String imageUrl = user.getProfileImage();

	    Image image = new Image(imageUrl, "user-image");
	    image.addClassName("search-people-image");

	    Span name = new Span(user.getFullName());
	    name.addClassName("search-people-name");

	    Follower currentFollower = followerService.getFollowerByFollowedUserIdAndFollowerId(user.getId(), currentUser.getId());

            AtomicBoolean isFollowed = new AtomicBoolean(currentFollower != null);

	    Button followButton = new Button();
            followButton.addClickListener(event -> {
            	handleFollowButtonListener(isFollowed, followButton, user, currentUser);
            });

            if(!isFollowed.get()){
                followButton.setText("Follow");
                followButton.removeClassName("search-unfollow-button");
                followButton.addClassName("search-follow-button");
            }else{
                followButton.setText("Unfollow");
                followButton.removeClassName("search-follow-button");
                followButton.addClassName("search-unfollow-button");
            }

	    HorizontalLayout buttonsLayout = new HorizontalLayout(followButton,
	        new Button("Remove", e -> peopleParentLayout.remove(peopleChildLayout))
	    );
	    buttonsLayout.addClassName("search-people-buttons-layout");

	    peopleChildLayout.add(image, name, buttonsLayout);
	    peopleParentLayout.add(peopleChildLayout);
	});

	Button seeAllButton = new Button("See all");
	seeAllButton.addClassName("search-people-see-all-button");

	VerticalLayout mainLayout = new VerticalLayout(headerText, peopleParentLayout, seeAllButton);
	mainLayout.addClassName("search-people-main-layout");

	return mainLayout;
    }

    private void handleFollowButtonListener(AtomicBoolean isFollowed, Button followButton, User followedUser, User follower){
        if(!isFollowed.get()){
           followButton.setText("Unfollow");
           followButton.removeClassName("search-follow-button");
           followButton.addClassName("search-unfollow-button");

           Follower newFollower = new Follower(followedUser, follower);
           followerService.saveFollower(newFollower);

           isFollowed.set(true);
        }else{
           followButton.setText("Follow");
           followButton.removeClassName("search-unfollow-button");
           followButton.addClassName("search-follow-button");

           followerService.deleteFollowerByFollowedUserId(followedUser.getId(), follower.getId());

           isFollowed.set(false);
        }
    }

    private VerticalLayout createSheetLayout(Search search, BottomSheet sheet){
	HorizontalLayout removeLayout = new HorizontalLayout();
	removeLayout.addClassName("search-remove-div");
	removeLayout.addClickListener(event -> {
	    sheet.close();

	    searchHistoryLayout.removeAll();
	    searchService.removeSearches(search);
	    createSearchHistoryLayout();
	});

	HorizontalLayout dialogHeader = createDialogHeader(search);
	dialogHeader.addClassName("search-dialog-header-layout");

    	Icon removeIcon = new Icon("vaadin", "trash");
    	removeIcon.addClassName("search-remove-icon");

    	Span removeText = new Span("Delete");
    	removeText.addClassName("search-remove-text");

	Span helperText = new Span("Remove this from your search history.");
	helperText.addClassName("search-delete-helper-text");

    	VerticalLayout layout = new VerticalLayout(removeText, helperText);
    	layout.addClassName("search-remove-x-layout");

	Icon closeIcon = new Icon("lumo", "cross");
        closeIcon.addClassName("search-dialog-close-icon");

    	removeLayout.add(removeIcon, layout);

    	Div lineDiv = new Div();
    	lineDiv.addClassName("search-line-div");

    	HorizontalLayout pokeLayout = createPokeLayout(search);
    	pokeLayout.addClassName("search-poke-layout");
    	pokeLayout.addClickListener(event -> {
    	    User user = search.getSearchedUser();
    	    User sender = userService.findCurrentUser();

    	    Notification notification = notificationService.getPokeNotificationByUserAndSender(user.getId(), sender.getId());

    	    if (notification != null) {
    	        LocalDateTime creationTime = notification.getTimestamp();
        	LocalDateTime currentTime = LocalDateTime.now(ZoneId.of("Asia/Manila"));

        	Duration duration = Duration.between(creationTime, currentTime);

        	long hours = duration.toHours();

        	if (hours < 24) {
        	    hours = 24 - hours;
		    com.vaadin.flow.component.notification.Notification.show(
		    	"Already poked. You can poke this user again after " + hours + " hours.",
		    	2000,
		    	com.vaadin.flow.component.notification.Notification.Position.BOTTOM_STRETCH
		    );
        	}else{
        	    notification.setRead(false);
        	    notification.setTimestamp(LocalDateTime.now(ZoneId.of("Asia/Manila")));
        	    notificationService.updatePokeNotification(notification);
        	}
    	    } else {
    	        sheet.close();
    	        notificationService.createPokeNotification(sender, search);
    	    }
    	});

    	VerticalLayout sheetLayout = new VerticalLayout();
    	sheetLayout.addClassName("sheet-layout");
    	sheetLayout.add(dialogHeader, lineDiv, removeLayout, pokeLayout);

    	return sheetLayout;
    }

    private HorizontalLayout createDialogHeader(Search search){
    	String imageUrl = search.getSearchedUser().getProfileImage();

    	Avatar avatar = new Avatar();
    	avatar.setImage(imageUrl);
	avatar.addClassName("search-header-avatar");

	String name = search.getSearchedUser().getFullName();

	if(name.length() > 30){
	   name = name.substring(0, 30) + "…";
	}

	Span headerName = new Span(name);
	headerName.addClassName("search-dialog-header-name");

	return new HorizontalLayout(avatar, headerName);
    }

    private HorizontalLayout createPokeLayout(Search search){
    	User user = search.getSearchedUser();
	User sender = userService.findCurrentUser();

	Notification notification = notificationService.getPokeNotificationByUserAndSender(user.getId(), sender.getId());

    	Icon pokeIcon = new Icon("vaadin", "touch");
        pokeIcon.addClassName("search-poke-icon");

        Span pokeText = new Span();
        pokeText.addClassName("search-poke-text");

        if (notification != null) {
            pokeText.setText("Poked");
        } else {
            pokeText.setText("Poke");
        }

        return new HorizontalLayout(pokeIcon, pokeText);
    }

    private VerticalLayout createSearchHistoryLayout() {
    	seeAllText.setVisible(true);
        recentText.setText("Recent");
        recentText.removeClassName("loading-span");
        recentText.addClassName("search-recent-text");

        User user = userService.findCurrentUser();
        List<Search> searches = searchService.getSearchesBySearcherId(user.getId());
        Collections.reverse(searches);

    	if(searches.isEmpty()){
    	    Span noSearchesFound = new Span("No searches found");
    	    noSearchesFound.addClassName("search-no-searches-found");

    	    searchHistoryLayout.add(noSearchesFound);
    	}

    	List<Search> filteredSearches = searches.stream()
    					.limit(10)
    					.collect(Collectors.toList());

	filteredSearches.forEach(search -> {
	    HorizontalLayout layout = new HorizontalLayout();
	    layout.addClassName("search-layout");

	    String imageUrl = search.getSearchedUser().getProfileImage();

    	    Avatar avatar = new Avatar();
    	    avatar.setImage(imageUrl);
    	    avatar.addClassName("search-avatar");

    	    Div avatarDiv = new Div(avatar);
    	    avatarDiv.addClickListener(event -> {
                UI.getCurrent().navigate(UserProfile.class, search.getSearchedUser().getId());
            });

            String name = search.getSearchedUser().getFullName();

            if(name.length() > 28){
               name = name.substring(0, 28) + "…";
            }

            Span nameSpan = new Span(name);
            nameSpan.addClassName("search-name");
            nameSpan.addClickListener(event -> {
                UI.getCurrent().navigate(UserProfile.class, search.getSearchedUser().getId());
            });

            BottomSheet sheet = new BottomSheet();
            sheet.addContent(createSheetLayout(search, sheet));

            Icon moreIcon = new Icon("vaadin", "ellipsis-dots-h");
            moreIcon.addClassName("search-more-icon");
            moreIcon.addClickListener(event -> {
                sheet.open();
            });

            layout.add(avatarDiv, nameSpan, moreIcon);
            searchHistoryLayout.add(layout, sheet);
        });

        searchHistoryLayout.add(createPeopleYouMayKnow());

        return searchHistoryLayout;
    }

    private VerticalLayout findSearchesLayout(List<User> users, User searcher) {
    	seeAllText.setVisible(false);
    	recentText.setText("Searching");
    	recentText.removeClassName("search-recent-text");
    	recentText.addClassName("loading-span");

    	Span dots = new Span();
    	dots.addClassName("dots");

    	recentText.add(dots);

        if(users.isEmpty()){
            Span noSearchesFound = new Span("No searches found");
            noSearchesFound.addClassName("search-no-searches-found");
            searchHistoryLayout.add(noSearchesFound);
        }

        users.forEach(user -> {
            HorizontalLayout layout = new HorizontalLayout();
            layout.addClassName("search-layout");
            layout.addClickListener(event -> {
            	Search search = new Search(searcher, user);
                searchService.saveSearch(search);
                UI.getCurrent().navigate(UserProfile.class, user.getId());
            });

            String imageUrl = user.getProfileImage();

            Avatar avatar = new Avatar();
            avatar.setImage(imageUrl);
            avatar.addClassName("search-avatar");

            Div avatarDiv = new Div(avatar);

            Span nameSpan = new Span(user.getFullName());
            nameSpan.addClassName("search-name");

            layout.add(avatarDiv, nameSpan);
            searchHistoryLayout.add(layout);
        });

        return searchHistoryLayout;
    }

    private void createHeader(){
        User searcher = userService.findCurrentUser();

    	Icon backIcon = new Icon("lumo", "arrow-left");
    	backIcon.addClassName("header-back-button");
    	backIcon.addClickListener(event -> {
    	    UI.getCurrent().navigate(MainFeed.class);
    	});

    	searchField.setPlaceholder("Search...");
    	searchField.addClassName("search-text-field-1");
        searchField.setValueChangeMode(ValueChangeMode.EAGER);
        searchField.focus();
    	searchField.setClearButtonVisible(true);
    	searchField.addValueChangeListener(event -> {
    	    searchHistoryLayout.removeAll();

	    String searchTerm = searchField.getValue();

    	    if(searchTerm.isEmpty()){
    	       createSearchHistoryLayout();
    	    }else{
    	       List<User> users = userService.findAllUsers(searchTerm);
    	       findSearchesLayout(users, searcher);
    	    }
    	});

    	Icon searchIcon = new Icon("lumo", "search");
    	searchIcon.addClassName("search-icon-1");

    	HorizontalLayout headerLayout = new HorizontalLayout(backIcon, searchField, searchIcon);
    	headerLayout.addClassName("search-header-layout-1");

    	addToNavbar(headerLayout);
    }
}
