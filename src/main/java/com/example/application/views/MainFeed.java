package com.example.application.views;

import com.example.application.data.dto.post.PostReactionDTO;
import com.example.application.data.dto.post.ArtworkFeedDTO;
import com.example.application.data.notification.Notification;
import com.example.application.services.notification.NotificationService;
import com.example.application.data.LikeReaction;
import com.example.application.services.LikeReactionService;
import com.example.application.data.HeartReaction;
import com.example.application.services.HeartReactionService;
import com.example.application.data.PostReaction;
import com.example.application.services.PostReactionService;
import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.data.Artwork;
import com.example.application.services.ArtworkService;
import com.example.application.data.Comment;
import com.example.application.services.CommentService;
import com.example.application.data.story.Story;
import com.example.application.services.story.StoryService;
import com.example.application.views.profile.UserProfile;
import com.example.application.views.profile.OwnProfile;
import com.example.application.views.comment.CommentSectionView;
import com.example.application.views.comment.CommentView;
import com.example.application.views.story.StoryView;
import com.example.application.views.artworks.AddArtwork;
import com.example.application.views.story.DisplayStoryView;
import com.example.application.views.search.SearchView;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.function.SerializableSupplier;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.IFrame;
import com.vaadin.flow.component.ClientCallable;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;

import jakarta.annotation.security.PermitAll;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import java.io.FileInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;

import java.time.LocalTime;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;
import java.time.Duration;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

import java.util.Map;
import java.util.HashMap;
import java.util.Locale;
import java.util.List;
import java.util.Date;
import java.util.Collections;
import java.util.TimeZone;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

@Route(value = "", layout=MainLayout.class)
@PermitAll
public class MainFeed extends AppLayout {
    private final ArtworkService artworkService;
    private final LikeReactionService likeService;
    private final HeartReactionService heartService;
    private final CommentService commentService;
    private final UserServices userService;
    private final PostReactionService postService;
    private final StoryService storyService;
    private final NotificationService notificationService;

    private int currentPage = 0;
    private final int PAGE_SIZE = 10;

    private FormLayout formLayout = new FormLayout();

    @Autowired
    private AuthenticationManager authenticationManager;

    public MainFeed(ArtworkService artworkService, LikeReactionService likeService,
    	HeartReactionService heartService, CommentService commentService, UserServices userService,
    	PostReactionService postService, StoryService storyService, NotificationService notificationService){

    	this.artworkService = artworkService;
    	this.likeService = likeService;
    	this.heartService = heartService;
    	this.commentService = commentService;
	this.userService = userService;
	this.postService = postService;
	this.storyService = storyService;
	this.notificationService = notificationService;
	formLayout.addClassName("feed-form-layout");
    	addClassName("main-feed");
    	scrollIntoView();

    	User user = userService.findCurrentUser();

    	HorizontalLayout storyLayout = createStoryLayout(user);
        storyLayout.addClassName("main-happening-layout");

        formLayout.add(createAddPostLayout(user), storyLayout);

        //listenToScroll(formLayout);
        CustomEvent.handleScrollEvent(formLayout);
        formLayout.getElement().addEventListener("scroll-to-bottom", e -> {
    	    // Load more data here
    	    System.out.println("Page " + currentPage + " loaded.");
    	    loadPosts();
	});

        setContent(formLayout);
        loadPosts();

        //createFeed();
        createFooter();
    }

    private void createFooter(){
    	HorizontalLayout footerLayout = new HorizontalLayout();
    	footerLayout.addClassName("feed-footer-layout");

    	Icon plusIcon = new Icon("lumo", "plus");
    	plusIcon.addClassName("feed-footer-plus-icon");
    	plusIcon.addClickListener(event -> {
    	    UI.getCurrent().navigate(StoryView.class);
    	});

    	Icon searchIcon = new Icon("lumo", "search");
    	searchIcon.addClassName("feed-footer-search-icon");
     	searchIcon.addClickListener(event -> {
            UI.getCurrent().navigate(SearchView.class);
        });

    	Icon menuIcon = new Icon("lumo", "menu");
        menuIcon.addClassName("feed-footer-menu-icon");

        Span logo = new Span("Tagbook");
        logo.addClassName("feed-footer-logo");

        footerLayout.add(logo, plusIcon, searchIcon, menuIcon);

        addToNavbar(true, footerLayout);
    }

    private HorizontalLayout createAddPostLayout(User user){
    	String imageUrl = user.getProfileImage();

    	Avatar avatar = new Avatar();
    	avatar.setImage(imageUrl);
    	avatar.addClassName("main-feed-post-avatar");

    	Div avatarDiv = new Div(avatar);
    	avatarDiv.addClickListener(event -> {
    	    UI.getCurrent().navigate(OwnProfile.class);
    	});

    	Button whatsOnYourMind = new Button("What's on your mind?");
    	whatsOnYourMind.addClassName("main-feed-post-button");
    	whatsOnYourMind.addClickListener(event -> {
    	    UI.getCurrent().navigate(AddArtwork.class);
    	});

    	Div photoDiv = new Div(new Icon("lumo", "photo"), new Span("Photo"));
    	photoDiv.addClassName("main-feed-photo-div");

    	HorizontalLayout addPostLayout = new HorizontalLayout();
    	addPostLayout.addClassName("main-feed-add-layout");
    	addPostLayout.add(avatarDiv, whatsOnYourMind, photoDiv);

    	return addPostLayout;
    }

    // Start story
    private Div createOwnStory(User user){
    	List<Story> stories = storyService.getNonExpiredStoriesByUser(user.getId());

    	Div storyDiv = new Div();
	storyDiv.addClassName("story-own-feed");

	if(!stories.isEmpty()){
	   Story story = stories.get(0);

	   storyDiv.addClickListener(event -> {
            	UI.getCurrent().navigate(DisplayStoryView.class, story.getUser().getId());
           });

           String imageUrl = story.getImageUrl();

	   Image userImage = new Image(imageUrl, "story-image");
	   userImage.addClassName("story-own-user-image");

	   Span name = new Span("Your story");
	   name.addClassName("story-own-name");

	   Span numbers = new Span(String.valueOf(stories.size()));
	   numbers.addClassName("story-own-numbers");

	   storyDiv.add(userImage, numbers, name);
	}else{
	   storyDiv.setVisible(false);
	}

	return storyDiv;
    }

    private HorizontalLayout createStoryLayout(User user){
    	HorizontalLayout storyLayout = new HorizontalLayout();

    	//storyService.updateExpiredStories();

	String imageUrl = user.getProfileImage();

    	Image profileImage = new Image(imageUrl, "profile-image");
    	profileImage.addClassName("happening-profile-image");

        Icon addIcon = new Icon(VaadinIcon.PLUS);
        addIcon.addClassName("happening-add-icon");

        Span createText = new Span("Create story");
        createText.addClassName("happening-create-text");

        Div ownStoryLayout = createOwnStory(user);

        VerticalLayout profileLayout = new VerticalLayout(profileImage, addIcon, createText);
        profileLayout.addClassName("happening-profile-layout");
        profileLayout.addClickListener(event -> {
             UI.getCurrent().navigate(StoryView.class);
        });

        storyLayout.add(profileLayout, ownStoryLayout);

        List<User> users = userService.getAllUsers();
        users.forEach(_user -> {
            List<Story> userStories = storyService.getNonExpiredStoriesByUser(_user.getId());

            Div storyDiv = new Div();
            storyDiv.addClassName("happenings-feed");

            if(!userStories.isEmpty() && user.getFullName().equals(userStories.get(0).getUser().getFullName())){
               storyDiv.setVisible(false);
            }

            if(!userStories.isEmpty()){
               Story story = userStories.get(0);

               storyDiv.addClickListener(event -> {
                   UI.getCurrent().navigate(DisplayStoryView.class, story.getUser().getId());
               });

               String _imageUrl = story.getImageUrl();

               Image userImage = new Image(_imageUrl, "user-image");
               userImage.addClassName("happening-user-image");

               String userFullname = story.getUser().getFullName();

               String parts[] = userFullname.split(" ");

               Span name = new Span(parts[0] + " " + parts[parts.length - 1]);
               name.addClassName("happening-name");

               Span numbers = new Span(String.valueOf(userStories.size()));
               numbers.addClassName("happening-numbers");

               storyDiv.add(userImage, numbers, name);
               storyLayout.add(storyDiv);
            }else{
               storyDiv.setVisible(false);
            }
        });

    	return storyLayout;
    }

    // End story
    private Avatar createAvatar(User user){
    	String imageUrl = user.getProfileImage();

    	Avatar avatar = new Avatar();
    	avatar.setImage(imageUrl);
	avatar.addClassName("view-avatar");

	return avatar;
    }

    private Span createNameLayout(PostReaction reaction){
	String fullname = reaction.getReactor().getFullName();

	int length = 31;

	if(fullname.length() > length){
           fullname = fullname.substring(0, length) + "…";
	}

	Span name = new Span(fullname);
	name.addClassName("main-reactor-name");

	return name;
    }

    private VerticalLayout createAllReactedLayout(List<PostReaction> reactions, ConfirmDialog dialog) {
	VerticalLayout allContent = new VerticalLayout();

	for (PostReaction reaction : reactions) {
	     User user = reaction.getReactor();

	     if (reaction.getReactType().equals("Like")) {
		Icon likeIcon = new Icon(VaadinIcon.THUMBS_UP);
		likeIcon.addClassName("main-like-icon");

		Avatar avatar = createAvatar(user);

		Span name = createNameLayout(reaction);

		HorizontalLayout layout = new HorizontalLayout(likeIcon, avatar, name);
		layout.addClassName("main-reactor-main-layout");
		layout.addClickListener(event -> {
		    dialog.close();
		    UI.getCurrent().navigate(UserProfile.class, user.getId());
		});

		allContent.add(layout);

	     } else if (reaction.getReactType().equals("Heart")) {
		Icon heartIcon = new Icon(VaadinIcon.HEART);
		heartIcon.addClassName("main-heart-icon");

		Avatar avatar = createAvatar(user);

		Span name = createNameLayout(reaction);

		HorizontalLayout layout = new HorizontalLayout(heartIcon, avatar, name);
		layout.addClassName("main-reactor-main-layout");
		layout.addClickListener(event -> {
		    dialog.close();
		    UI.getCurrent().navigate(UserProfile.class, user.getId());
		});

		allContent.add(layout);
	     } else if (reaction.getReactType().equals("Happy")) {
		Icon smileIcon = new Icon(VaadinIcon.SMILEY_O);
		smileIcon.addClassName("main-smile-icon");

		Avatar avatar = createAvatar(user);

		Span name = createNameLayout(reaction);

		HorizontalLayout layout = new HorizontalLayout(smileIcon, avatar, name);
		layout.addClassName("main-reactor-main-layout");
		layout.addClickListener(event -> {
		    dialog.close();
		    UI.getCurrent().navigate(UserProfile.class, user.getId());
		});

		allContent.add(layout);
	     }
	}

	return allContent;
    }

    public void createReactedLayout(List<PostReaction> reactions, ConfirmDialog dialog) {
	dialog.open();

	long totalLikes = 0;
	long totalHearts = 0;
	long totalSmiles = 0;
	long totalReactions = 0;

	VerticalLayout allContent = createAllReactedLayout(reactions, dialog);
	VerticalLayout likeContent = new VerticalLayout();
	VerticalLayout heartContent = new VerticalLayout();
	VerticalLayout smileContent = new VerticalLayout();

	for (PostReaction reaction : reactions) {
	     totalReactions++;

	     User user = reaction.getReactor();

	     if (reaction.getReactType().equals("Like")) {
		Icon likeIcon = new Icon(VaadinIcon.THUMBS_UP);
		likeIcon.addClassName("main-like-icon");

		Avatar avatar = createAvatar(user);

		Span name = createNameLayout(reaction);

		HorizontalLayout layout = new HorizontalLayout(likeIcon, avatar, name);
		layout.addClassName("main-reactor-main-layout");
		layout.addClickListener(event -> {
		    dialog.close();
		    UI.getCurrent().navigate(UserProfile.class, user.getId());
		});

		likeContent.add(layout);

		totalLikes++;
	     } else if (reaction.getReactType().equals("Heart")) {
		Icon heartIcon = new Icon(VaadinIcon.HEART);
		heartIcon.addClassName("main-heart-icon");

		Avatar avatar = createAvatar(user);

		Span name = createNameLayout(reaction);

		HorizontalLayout layout = new HorizontalLayout(heartIcon, avatar, name);
		layout.addClassName("main-reactor-main-layout");
		layout.addClickListener(event -> {
		    dialog.close();
		    UI.getCurrent().navigate(UserProfile.class, user.getId());
		});

		heartContent.add(layout);

		totalHearts++;
             } else if (reaction.getReactType().equals("Happy")) {
		Icon smileIcon = new Icon(VaadinIcon.SMILEY_O);
		smileIcon.addClassName("main-smile-icon");

		Avatar avatar = createAvatar(user);

		Span name = createNameLayout(reaction);

		HorizontalLayout layout = new HorizontalLayout(smileIcon, avatar, name);
		layout.addClassName("main-reactor-main-layout");
		layout.addClickListener(event -> {
		    dialog.close();
		    UI.getCurrent().navigate(UserProfile.class, user.getId());
		});

		smileContent.add(layout);

		totalSmiles++;
	    }
	}

	Icon likeIcon = new Icon(VaadinIcon.THUMBS_UP);
	likeIcon.addClassName("main-reactor-like-icon");

	Icon heartIcon = new Icon(VaadinIcon.HEART);
	heartIcon.addClassName("main-reactor-heart-icon");

	Icon smileIcon = new Icon(VaadinIcon.SMILEY_O);
	smileIcon.addClassName("main-reactor-smile-icon");

	Span allText = new Span("All");
	allText.addClassName("main-all-text");

	Tab allTab = new Tab(allText, new Span(formatValue(totalReactions, false)));
	Tab likeTab = new Tab(likeIcon, new Span(formatValue(totalLikes, false)));
	Tab heartTab = new Tab(heartIcon, new Span(formatValue(totalHearts, false)));
	Tab smileTab = new Tab(smileIcon, new Span(formatValue(totalSmiles, false)));

	if (totalHearts == 0) {
	    heartTab.setVisible(false);
	}

	if (totalLikes == 0) {
	    likeTab.setVisible(false);
	}

	if (totalSmiles == 0) {
	    smileTab.setVisible(false);
	}

	Tabs tabs = new Tabs(allTab, likeTab, heartTab, smileTab);
	tabs.addClassName("main-reactor-tabs");

	Span headerText = new Span("People who reacted");
	headerText.addClassName("main-reactor-header-text");

	VerticalLayout tabsLayout = new VerticalLayout(headerText, tabs);
	tabsLayout.addClassName("main-tabs-Layout");

	dialog.setHeader(tabsLayout);

	Div dialogContent = new Div(allContent, likeContent, heartContent, smileContent);
	dialogContent.addClassName("main-dialog-content");

	dialog.add(dialogContent);

	// Show content based on the selected tab
	tabs.addSelectedChangeListener(event -> {
	    allContent.setVisible(tabs.getSelectedTab().equals(allTab));
	    likeContent.setVisible(tabs.getSelectedTab().equals(likeTab));
	    heartContent.setVisible(tabs.getSelectedTab().equals(heartTab));
	    smileContent.setVisible(tabs.getSelectedTab().equals(smileTab));
	});

	// Initially show only the first tab's content
	allContent.setVisible(true);
	likeContent.setVisible(false);
	heartContent.setVisible(false);
	smileContent.setVisible(false);
    }

    //public void createFeed() {
    public void loadPosts() {
    	//List<Artwork> artworks = artworkService.findPosts(currentPage * PAGE_SIZE, PAGE_SIZE);
    	List<ArtworkFeedDTO> artworks = artworkService.getArtworkFeedDTOs(currentPage * PAGE_SIZE, PAGE_SIZE);
    	System.out.println("DTO size: " + artworks.size());
    	//Collections.reverse(artworks);

        /*// Create an IFrame component
        IFrame iframe = new IFrame("https://www.youtube.com/embed/dQw4w9WgXcQ");
        iframe.setWidth("560px");
        iframe.setHeight("315px");
        iframe.getElement().setAttribute("frameborder", "0");
        iframe.getElement().setAttribute("allowfullscreen", "true");*/

    	for (ArtworkFeedDTO artwork : artworks) {
    	     String background = artwork.getArtworkBackground();

    	     if (background == null) {
    	     	 createArtworkPost(artwork);
    	     } else {
    	         createPostOnly(artwork);
    	     }
    	}
    	currentPage++;
    }

    private void createPostOnly(ArtworkFeedDTO artwork){
    	Avatar avatar = new Avatar("", artwork.getUserProfileImage());
    	avatar.addClassName("feed-only-avatar");

    	Span timeAgo = new Span();
    	timeAgo.addClassName("feed-only-time");
    	updateTimeAgo(artwork, timeAgo);
    	timeAgo.add(" • ");
    	timeAgo.add(new Icon("vaadin", "globe"));

    	Div nameDiv = new Div(new Span(artwork.getUserFullName()), timeAgo);
    	nameDiv.addClassName("feed-only-name-div");

    	Icon moreIcon = new Icon("vaadin", "ellipsis-dots-h");
    	moreIcon.addClassName("feed-only-more-icon");

    	Icon closeIcon = new Icon("lumo", "cross");
    	closeIcon.addClassName("feed-only-close-icon");

    	HorizontalLayout headerLayout = new HorizontalLayout(avatar, nameDiv, new Div(moreIcon, closeIcon));
    	headerLayout.addClassName("feed-only-header-layout");

    	Div content = new Div(new Span(artwork.getArtworkDescription()));
    	content.addClassName("feed-only-content");

	String background = artwork.getArtworkBackground();

    	if (background != null){
    	    content.getStyle().set("background", background);
    	}

        Long commentsCount = artwork.getCommentsCount();

        String withDecimal = formatValue(commentsCount, true);
        String withoutDecimal = formatValue(commentsCount + 999998, false);

	Button commentButton = new Button(new Icon("vaadin", "comment-o"));
	commentButton.addClickListener(event -> {
            Long artworkId = artwork.getArtworkId();
            VaadinSession.getCurrent().getSession().setAttribute("main", artworkId);
            UI.getCurrent().navigate(CommentView.class, artworkId);
        });

        Span commentsSpan = new Span();

        if (commentsCount > 0) {
            commentButton.setText(withoutDecimal);
            String text = commentsCount == 0 ? " Comment" : " Comments";
            commentsSpan.setText(withDecimal + text);
        }

        // Buttons
        Button likeButton = new Button(new Icon("vaadin", "thumbs-up-o"));
        Button chatButton = new Button(new Icon("vaadin", "comment-ellipsis-o"));
        Button shareButton = new Button("999K", new Icon("vaadin", "arrow-forward"));

        HorizontalLayout buttonsLayout = new HorizontalLayout(likeButton, commentButton, chatButton, shareButton);
        buttonsLayout.addClassName("feed-only-buttons-layout");

        SvgIcon likeIcon = new SvgIcon(new StreamResource("like.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/like.svg")));
        SvgIcon loveIcon = new SvgIcon(new StreamResource("love.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/love.svg")));
        SvgIcon careIcon = new SvgIcon(new StreamResource("care.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/care.svg")));
        SvgIcon hahaIcon = new SvgIcon(new StreamResource("haha.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/haha.svg")));
        SvgIcon wowIcon = new SvgIcon(new StreamResource("wow.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/wow.svg")));
        SvgIcon sadIcon = new SvgIcon(new StreamResource("sad.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/sad.svg")));
        SvgIcon angryIcon = new SvgIcon(new StreamResource("angry.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/angry.svg")));

        Span totalReactions = new Span();
        totalReactions.addClassName("feed-only-totalReactions");

        PostReactionsView reactionsView = new PostReactionsView(
        	notificationService,
                artworkService,
                postService,
                userService,
                likeButton,
                totalReactions,
                artwork
        );
        reactionsView.showReactions(likeIcon, loveIcon, careIcon, hahaIcon, wowIcon, sadIcon, angryIcon);

        HorizontalLayout reactionsLayout = new HorizontalLayout(
        	new Div(
        	    likeIcon, loveIcon,
        	    careIcon, hahaIcon,
        	    wowIcon, sadIcon,
        	    angryIcon, totalReactions
        	),
        	commentsSpan
	);
        reactionsLayout.addClassName("feed-only-reactions-layout");

        closeIcon.addClickListener(event -> {
             formLayout.remove(headerLayout, content, reactionsLayout, buttonsLayout);
        });

    	formLayout.add(headerLayout, content, reactionsLayout, buttonsLayout);
    }

    private void createArtworkPost(ArtworkFeedDTO artwork){
    	String imageUrl = artwork.getArtworkUrl();

	Image image = new Image(imageUrl, "artwork-image");
        image.addClassName("main-feed-image");

        User currentUser = userService.findCurrentUser();

        Span commented = new Span();
        commented.addClassName("commented");

        Span totalReactions = new Span();
        totalReactions.addClassName("reacted");

        Span likes = new Span();
        likes.addClassName("specific-reacts");

        Span hearts = new Span();
        hearts.addClassName("specific-reacts");

        Span smiles = new Span();
        smiles.addClassName("specific-reacts");

        Button likeButton = new Button();
        likeButton.addClassName("feed-reaction");
        likeButton.getStyle().set("color", "white");
        likeButton.setIcon(new Icon(VaadinIcon.THUMBS_UP_O));

        Icon likeIcon = new Icon(VaadinIcon.THUMBS_UP);
        likeIcon.addClassName("reactions-like");

        Icon heartIcon = new Icon(VaadinIcon.HEART);
        heartIcon.addClassName("reactions-heart");

        Icon happyIcon = new Icon(VaadinIcon.SMILEY_O);
        happyIcon.addClassName("reactions-happy");

	PostReactionsView reactionsView = new PostReactionsView(
		notificationService,
	  	artworkService,
		postService,
		userService,
        	likeButton,
        	totalReactions,
        	artwork
	);
	//reactionsView.showReactions(likeIcon, heartIcon, happyIcon, likes, hearts, smiles);

        Button commentButton = createCommentButtonListener(artwork);
        Button shareButton = new Button("7262", new Icon(VaadinIcon.ARROW_FORWARD));
        shareButton.addClassName("feed-heart");

        HorizontalLayout buttonsLayout = new HorizontalLayout(likeButton, commentButton, shareButton);
        buttonsLayout.addClassName("main-feed-buttons");

        VerticalLayout profileLayout = createFeedHeader(artwork);
        profileLayout.addClassName("comment-user-header-layout");

        List<PostReactionDTO> reactions = postService.getReactionsDTO(artwork.getArtworkId());

        HorizontalLayout totalReactionsDiv = createTotalReactions(reactions, commented, artwork, totalReactions, likes, hearts, smiles, likeIcon, heartIcon, happyIcon);
        totalReactionsDiv.addClassName("comment-reactions-div");
        totalReactionsDiv.addClickListener(event -> {
            List<PostReaction> reactions2 = postService.getPostReactionsByArtworkId(artwork.getArtworkId());

            ConfirmDialog dialog = new ConfirmDialog();
            dialog.addClassName("main-reactor-dialog");
            dialog.setConfirmText("Close");

            createReactedLayout(reactions2, dialog);
	});

        formLayout.add(profileLayout, image, totalReactionsDiv, buttonsLayout);
    }

    public HorizontalLayout createTotalReactions(List<PostReactionDTO> reactions, Span commented, ArtworkFeedDTO artwork, Span totalReactions, Span likes, Span hearts, Span smiles, Icon likeIcon, Icon heartIcon, Icon happyIcon){
    	int totalLikes = 0;
	int totalHearts = 0;
	int totalSmiles = 0;

    	for(PostReactionDTO reaction : reactions){
    	    if(reaction.getReactType().equals("Like")){
    	       totalLikes++;
    	    }else if(reaction.getReactType().equals("Heart")){
    	       totalHearts++;
    	    }else if(reaction.getReactType().equals("Happy")){
    	       totalSmiles++;
    	    }
    	}

    	likes.setText(formatValue(totalLikes, false));
    	hearts.setText(formatValue(totalHearts, false));
    	smiles.setText(formatValue(totalSmiles, false));

        if(totalLikes == 0){
           likeIcon.setVisible(false);
           likes.setVisible(false);
        }

	if(totalHearts == 0){
           heartIcon.setVisible(false);
           hearts.setVisible(false);
        }

        if(totalSmiles == 0){
           happyIcon.setVisible(false);
           smiles.setVisible(false);
        }

        Long totals = (long) reactions.size();

        totalReactions.setText(formatValue(totals, true));

	Long totalComments = artwork.getCommentsCount();
        commented.setText(formatValue(totalComments, true) + " comments");

        HorizontalLayout reactionsDiv = new HorizontalLayout(likeIcon,likes, heartIcon,hearts,  happyIcon, smiles); //commented, totalReactions
        reactionsDiv.addClassName("comment-reactions-div");

        return reactionsDiv;
    }

    private VerticalLayout createFeedHeader(ArtworkFeedDTO artwork){
        Avatar avatar = new Avatar("", artwork.getUserProfileImage());
        avatar.addClassName("profile-user-avatar");

        Div avatarDiv = new Div(avatar);

        Span name = new Span(artwork.getUserFullName());
        name.addClassName("profile-user-fullname");

        Span title = new Span(artwork.getArtworkDescription());
        title.addClassName("comment-title");

        Span dateTime = new Span("2024-09-07 09:09:01");
        dateTime.addClassName("comment-date-time");

        HorizontalLayout layout = new HorizontalLayout(avatarDiv, name);
        layout.addClassName("comment-user-layout");
        layout.addClickListener(event -> {
            UI.getCurrent().navigate(UserProfile.class, artwork.getUserId());
        });

        return new VerticalLayout(layout, dateTime, title);
    }

    public Button createCommentButtonListener(ArtworkFeedDTO artwork){
	Long totalComments = artwork.getCommentsCount();

    	Button commentButton = new Button();
	commentButton.addClassName("feed-comment");
	commentButton.setIcon(new Icon(VaadinIcon.COMMENT_ELLIPSIS_O));
	commentButton.setText(formatValue(totalComments, false));
	commentButton.addClickListener(event -> {
            Long artworkId = artwork.getArtworkId();
            VaadinSession.getCurrent().getSession().setAttribute("main", artworkId);
            UI.getCurrent().navigate(CommentSectionView.class, artworkId);
	});

	return commentButton;
    }

    public String checkUser() {
        Authentication auth =
            SecurityContextHolder.getContext().getAuthentication();
        return auth == null ? null : auth.getName();
    }

    private String formatValue(long value, boolean includeDecimal) {
    	if (value >= 1_000_000) {
            return formatMillions(value, includeDecimal);
    	} else if (value >= 1_000) {
            return formatThousands(value, includeDecimal);
    	} else {
            return String.valueOf(value);
    	}
    }

    private String formatMillions(long value, boolean includeDecimal) {
    	double millions = value / 1_000_000.0;
    	return formatWithSuffix(millions, "M", includeDecimal);
    }

    private String formatThousands(long value, boolean includeDecimal) {
    	double thousands = value / 1_000.0;
    	return formatWithSuffix(thousands, "K", includeDecimal);
    }

    private String formatWithSuffix(double number, String suffix, boolean includeDecimal) {
    	if (includeDecimal) {
            // Format to one decimal place, without rounding up
            String formatted = String.format("%.1f", Math.floor(number * 10) / 10);
            if (formatted.endsWith(".0")) {
            	formatted = formatted.substring(0, formatted.length() - 2); // Remove ".0" if present
            }
            return formatted + suffix;
    	} else {
            // Truncate the decimal part entirely
            return String.format("%.0f%s", Math.floor(number), suffix);
    	}
    }

    private void updateTimeAgo(ArtworkFeedDTO artwork, Span timeAgo) {
        LocalDateTime creationTime = artwork.getPostTimestamp();
        LocalDateTime currentTime = LocalDateTime.now(ZoneId.of("Asia/Manila"));

        Duration duration = Duration.between(creationTime, currentTime);

        long seconds = duration.getSeconds();
        long minutes = duration.toMinutes();
        long hours = duration.toHours();
        long days = duration.toDays();

        if (seconds < 60) {
           // Less than 1 minute ago, show seconds with 's'
           timeAgo.setText(seconds + "s");
        } else if (minutes < 60) {
           // Less than 1 hour ago, show minutes with 'm'
           timeAgo.setText(minutes + "m");
        } else if (hours < 24) {
           // Less than 1 day ago, show hours with 'h'
           timeAgo.setText(hours + "h");
        } else if (days < 7) {
           // Less than 1 week ago, show days with 'd'
           timeAgo.setText(days + "d");
        } else {
           // More than 7 days ago, display exact date (e.g., "Sep 7")
           DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM d");
           String formattedDate = creationTime.format(formatter);
           timeAgo.setText(formattedDate);
        }
    }
}

