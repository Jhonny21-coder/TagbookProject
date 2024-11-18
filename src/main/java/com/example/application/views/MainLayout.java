package com.example.application.views;

import com.example.application.config.SecurityService;
import com.example.application.data.notification.Notification;
import com.example.application.services.notification.NotificationService;
import com.example.application.views.search.SearchView;
import com.example.application.views.artworks.MainArtworkView;
import com.example.application.views.profile.FollowerView;
import com.example.application.views.profile.OwnProfile;
import com.example.application.views.profile.SavedPostView;
import com.example.application.data.Status;
import com.example.application.services.StatusService;
import com.example.application.services.UserServices;
import com.example.application.data.Artwork;
import com.example.application.services.ArtworkService;
import com.example.application.data.SavedPost;
import com.example.application.services.SavedPostService;
import com.example.application.data.User;
import com.example.application.views.notification.NotificationView;
import com.example.application.views.follower.MainFollowerView;
import com.example.application.views.chat.ChatView;
import com.example.application.views.chat.MessageView;

import com.example.application.config.GoogleUserSession;
import com.example.application.config.CloudinaryService;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.server.VaadinSession;
import com.example.application.views.form.*;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.router.HighlightConditions;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.theme.lumo.LumoUtility;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.DetachEvent;
import com.vaadin.flow.component.icon.SvgIcon;

import reactor.core.Disposable;
import reactor.core.publisher.Flux;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.net.URL;
import java.net.HttpURLConnection;

import java.util.List;
import java.util.Map;

import java.io.InputStream;
import java.io.FileOutputStream;
import java.io.File;

import com.vaadin.flow.shared.Registration;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

public class MainLayout extends AppLayout {

    private static final Logger logger = LoggerFactory.getLogger(MainLayout.class);

    private final Flux<Notification> notifications;
    private Disposable notificationSubscription;

    private final UserServices userService;
    private final StatusService statusService;
    private final SavedPostService savedPostService;
    private final ArtworkService artworkService;
    private final NotificationService notificationService;
    private final SecurityService securityService;
    private final CloudinaryService cloudinaryService;

    private final String USER_FOLDER = "user_images";

    public Span notificationText = new Span();

    public MainLayout(UserServices userService, StatusService statusService,
    	SavedPostService savedPostService, ArtworkService artworkService,
    	NotificationService notificationService, SecurityService securityService,
    	CloudinaryService cloudinaryService, Flux<Notification> notifications) {
        this.userService = userService;
        this.statusService = statusService;
        this.savedPostService = savedPostService;
        this.artworkService = artworkService;
        this.notificationService = notificationService;
        this.securityService = securityService;
        this.cloudinaryService = cloudinaryService;
        this.notifications = notifications;

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof OAuth2AuthenticationToken) {
            try {
            	GoogleUserSession userSession = new GoogleUserSession();
            	String imageUrl = userSession.getGoogleProfileImageUrl();

            	if (imageUrl != null) {
            	   // Download the image
            	   InputStream inputStream = downloadImage(imageUrl);

            	   // Createva temporary file automatically delete on exit
            	   File tempFile = File.createTempFile("tempImage", ".png");
		   tempFile.deleteOnExit(); // Ensure the file is deleted on exit

		   // Save the uploaded image to the temporary file
                   FileOutputStream fos = new FileOutputStream(tempFile);
                   byte[] imageBytes = inputStream.readAllBytes();
                   fos.write(imageBytes);

            	   OAuth2AuthenticatedPrincipal principal = (OAuth2AuthenticatedPrincipal) authentication.getPrincipal();

            	   String firstName = principal.getAttribute("given_name");
            	   String lastName = principal.getAttribute("family_name");
            	   String email = principal.getAttribute("email");
            	   String profileImage = cloudinaryService.uploadImage(tempFile, USER_FOLDER);

            	   User user = userService.findUserByEmail(email);

            	   if(user == null){
            	      userService.addGoogleUser(firstName, lastName, email, profileImage);
            	   }

            	   VaadinSession.getCurrent().setAttribute("user", email);
            	}
    	    } catch (Exception e) {
         	e.printStackTrace();
    	    }
        } else if (authentication instanceof UsernamePasswordAuthenticationToken) {
            VaadinSession.getCurrent().setAttribute("user", authentication.getName());
        }

	createDrawer();
        createHeader();
	addClassName("app-layout");
    }

    public InputStream downloadImage(String imageUrl) throws Exception {
    	URL url = new URL(imageUrl);
    	HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    	connection.setRequestMethod("GET");
    	connection.connect();

    	if (connection.getResponseCode() == 200) {
            return connection.getInputStream();  // This is the InputStream of the image
        } else {
            throw new Exception("Failed to download image from " + imageUrl);
        }
    }

    @Override
    protected void onDetach(DetachEvent detachEvent) {
    	super.onDetach(detachEvent);

    	if (notificationSubscription != null) {
    	    notificationSubscription.dispose();
    	}
    }

    private void createHeader() {
	User user = userService.findCurrentUser();

	String imageUrl = user.getProfileImage();

	Avatar avatar = new Avatar();
	avatar.setImage(imageUrl);
	avatar.addClassName("online");

        H1 logo = new H1("T A G");
        logo.addClassName("logo");
        logo.addClassNames(
            LumoUtility.FontSize.MEDIUM,
            LumoUtility.Margin.MEDIUM
        );

        DrawerToggle toggle = new DrawerToggle();
	toggle.setIcon(VaadinIcon.MENU.create());
        toggle.addClassName("toggle");

	Icon searchIcon = new Icon(VaadinIcon.SEARCH);
	searchIcon.addClickListener(event -> {
	    UI.getCurrent().navigate(SearchView.class);
	});

	Icon notificationIcon = new Icon("vaadin", "bell-o");
	notificationIcon.addClassName("notification-icon");
	notificationIcon.addClickListener(event -> {
	    notificationService.markAllNotificationsAsReadForUser(user.getId());
	    UI.getCurrent().navigate(NotificationView.class);
	});

	List<Notification> _notifications = notificationService.getUnreadNotificationsForUser(user.getId());
	updateUnreadNotificationCount(_notifications, user.getId());

	notificationText.addClassName("notification-text");
	notificationText.addClickListener(event -> {
	    notificationService.markAllNotificationsAsReadForUser(user.getId());
	    notificationText.setVisible(false);
            UI.getCurrent().navigate(NotificationView.class);
	});

	subscribeRealTimeNotificationUpdates();

	Div avatarDiv = new Div(avatar);
	avatarDiv.addClickListener(event -> {
	    UI.getCurrent().navigate(OwnProfile.class);
	});

	Icon groupIcon = new Icon("vaadin", "group");
	groupIcon.addClassName("main-group-icon");
	groupIcon.addClickListener(event -> {
	    UI.getCurrent().navigate(MainFollowerView.class);
	});

        var houseIcon = new SvgIcon(new StreamResource("house.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/house.svg")));
        var messengerIcon = new SvgIcon(new StreamResource("messenger.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/messenger.svg")));
        var followersIcon = new SvgIcon(new StreamResource("friends.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/friends.svg")));
        var videosIcon = new SvgIcon(new StreamResource("friends.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/video.svg")));
        var notificationsIcon = new SvgIcon(new StreamResource("notifications.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/notifications.svg")));

	var feedTab = new Tab(houseIcon);
        var followersTab = new Tab(new Icon("vaadin", "users"));
        var messengerTab = new Tab(new Icon("vaadin", "chat"));
        var notificationsTab = new Tab(notificationText, new Icon("vaadin", "bell"));
        var vidoesTab = new Tab(new Icon("vaadin", "play-circle"));

        var tabs = new Tabs(feedTab, followersTab, messengerTab, notificationsTab, vidoesTab);
        tabs.addClassName("main-layout-tabs");
        tabs.addSelectedChangeListener(event -> {
            if (tabs.getSelectedTab().equals(followersTab)) {
                UI.getCurrent().navigate(MainFollowerView.class);
            }else if (tabs.getSelectedTab().equals(feedTab)) {
                UI.getCurrent().navigate(MainFeed.class);
            }else if (tabs.getSelectedTab().equals(messengerTab)) {
            	UI.getCurrent().navigate(MessageView.class);
            }else if (tabs.getSelectedTab().equals(notificationsTab)) {
                notificationService.markAllNotificationsAsReadForUser(user.getId());
                notificationText.setVisible(false);
            	UI.getCurrent().navigate(NotificationView.class);
            }
        });

	HorizontalLayout header = new HorizontalLayout(tabs);
	header.addClassName("main-layout-header");

        addToNavbar(header);
    }

    private void subscribeRealTimeNotificationUpdates() {
    	Long currentUserId = userService.findCurrentUser().getId();

    	notificationSubscription = notifications
    	    .filter(n -> n.getUser().getId().equals(currentUserId)) // Filter for the specific receiver
            .subscribe(n -> {
                getUI().ifPresent(ui -> ui.access(() -> {
                    List<Notification> _notifications = notificationService.getUnreadNotificationsForUser(currentUserId);
                    updateUnreadNotificationCount(_notifications, currentUserId);
                }));
            }, error -> logger.error("Error updating unread notification count for user ID: {}", currentUserId, error));
    }

    private void updateUnreadNotificationCount(List<Notification> _notifications, Long currentUserId) {
    	if (_notifications.isEmpty()) {
	    notificationText.setVisible(false);
	} else {
	    int size = _notifications.size();

	    notificationText.setVisible(true);

	    if (size < 15) {
		notificationText.setText(String.valueOf(size));
	    } else {
		notificationText.setText(15 + "+");
	    }
	}
    }

    private HorizontalLayout createNavHeader(){
	User user = userService.findCurrentUser();

        H2 userName = new H2(user.getFirstName() + " " + user.getLastName());
        userName.addClassName("nav-username");

        String imageUrl = user.getProfileImage();

        Avatar avatar = new Avatar();
        avatar.setImage(imageUrl);
        avatar.addClassName("avatar");

        Span nameLabel = new Span(user.getFullName());
        nameLabel.addClassName("username");

	FlexLayout nameContainer = new FlexLayout();
        nameContainer.setWidth("100%");
        nameContainer.add(nameLabel);

        Button settingsIcon = new Button(new Icon(VaadinIcon.COG));
        settingsIcon.addClassName("settings-icon");
        settingsIcon.addClickListener(event -> {
                getUI().ifPresent(ui -> ui.navigate("profile-settings"));
        });

        // Create a HorizontalLayout to contain the text and icon
        HorizontalLayout headerContent = new HorizontalLayout(avatar, nameContainer, settingsIcon);
        headerContent.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        headerContent.expand(settingsIcon);
        headerContent.setWidthFull();
        headerContent.addClassNames(LumoUtility.Padding.Vertical.NONE, LumoUtility.Padding.Horizontal.MEDIUM);
        headerContent.setSpacing(true);
        headerContent.addClassName("header-content");

	return headerContent;
    }

    private RouterLink createLink(Class routeClass, VaadinIcon icon, String label){
	RouterLink routerLink = new RouterLink();
        routerLink.setHighlightCondition(HighlightConditions.sameLocation());
        routerLink.setRoute(routeClass);
        Icon routerIcon = new Icon(icon);
        routerIcon.addClassName("nav-icon");

	User user = userService.findCurrentUser();

        if(label.equals("Saved")){
           List<SavedPost> savedPosts = savedPostService.getSavedPostsByUserId(user.getId());

           Span totalSavedPosts = new Span();
           totalSavedPosts.addClassName("total-saved-posts");

           if(savedPosts.size() == 0){
             totalSavedPosts.setText("No Item");
           }else if(savedPosts.size() == 1){
             totalSavedPosts.setText(savedPosts.size() + " Item");
           }else{
             totalSavedPosts.setText(savedPosts.size() + " Items");
           }

           routerLink.add(routerIcon, new Span(label), totalSavedPosts);
        }else if(label.equals("Artworks")){
           List<Artwork> artworks = artworkService.getArtworksByUserId(user.getId());

           Span totalArtworks = new Span(artworks.size() + " Items");
           totalArtworks.addClassName("total-saved-posts");

           if(artworks.size() == 0){
             totalArtworks.setText("No Item");
           }else if(artworks.size() == 1){
             totalArtworks.setText(artworks.size() + " Item");
           }else{
             totalArtworks.setText(artworks.size() + " Items");
           }

           routerLink.add(routerIcon, new Span(label), totalArtworks);
        }else{
           routerLink.add(routerIcon, new Span(label));
        }
        routerLink.addClassName("drawer-link");

	return routerLink;
    }

    private RouterLink createSecondaryLink(Class routeClass, VaadinIcon icon, String label){
        RouterLink routerLink = new RouterLink();
        routerLink.setHighlightCondition(HighlightConditions.sameLocation());
        routerLink.setRoute(routeClass);
        Icon routerIcon = new Icon(icon);
        routerIcon.addClassName("nav-icons");
        routerLink.add(routerIcon, new Span(label));
        routerLink.addClassName("drawer-linkss");

        return routerLink;
    }

    private void createDrawer(){
    	RouterLink artworkFeedLink = createLink(MainFeed.class, VaadinIcon.GLOBE, "Artwork Feed");
	RouterLink artworkLink = createLink(MainArtworkView.class,VaadinIcon.PALETTE,"Artworks");
	RouterLink followersLink = createLink(FollowerView.class,VaadinIcon.GROUP,"Followers/Following");
	RouterLink accessInfoLink = createSecondaryLink(AccessInfo.class,VaadinIcon.USER,"Access Information");
	RouterLink changePasswordLink = createSecondaryLink(ChangePassword.class,VaadinIcon.EDIT,"Change Password");
	RouterLink contactLink = createSecondaryLink(ContactView.class,VaadinIcon.MOBILE,"Contact Information");
	RouterLink savedPostLink = createLink(SavedPostView.class, VaadinIcon.LIST, "Saved");

	HorizontalLayout navHeader = createNavHeader();
	navHeader.setWidthFull();

	VerticalLayout detailsLayout = new VerticalLayout(accessInfoLink, changePasswordLink, contactLink);
	detailsLayout.setWidthFull();

	Details details = new Details("Information", detailsLayout);
	details.setOpened(false);
	details.addClassName("nav-details");

	Button signoutLink = new Button("Log out", new Icon(VaadinIcon.SIGN_OUT), e -> securityService.logout());
	signoutLink.addClassName("logout-button");

	VerticalLayout layout = new VerticalLayout(navHeader, artworkFeedLink, artworkLink, followersLink, details, savedPostLink, signoutLink);
	layout.setWidthFull();

	addToDrawer(layout);
     }
}
