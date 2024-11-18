package com.example.application.views.profile;

import com.example.application.services.notification.NotificationService;
import com.example.application.data.PostReaction;
import com.example.application.services.PostReactionService;
import com.example.application.data.LikeReaction;
import com.example.application.services.LikeReactionService;
import com.example.application.data.HeartReaction;
import com.example.application.services.HeartReactionService;
import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.data.Artwork;
import com.example.application.services.ArtworkService;
import com.example.application.data.Comment;
import com.example.application.services.CommentService;
import com.example.application.views.profile.UserProfile;
import com.example.application.views.comment.CommentSectionView;
import com.example.application.views.comment.CommentView;
import com.example.application.views.MainFeed;

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
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;

import java.io.FileInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;

import java.time.LocalDateTime;
import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.time.ZoneId;

import java.util.Locale;
import java.util.List;
import java.util.Set;
import java.util.Map;
import java.util.HashMap;

import java.text.DecimalFormat;

import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicBoolean;

public class ProfileFeed extends AppLayout {

    private final ArtworkService artworkService;
    private final LikeReactionService likeService;
    private final HeartReactionService heartService;
    private final CommentService commentService;
    private final UserServices userService;
    private final PostReactionService postService;
    private final NotificationService notificationService;

    public ProfileFeed(ArtworkService artworkService, LikeReactionService likeService,
    	HeartReactionService heartService, CommentService commentService, UserServices userService,
    	PostReactionService postService, NotificationService notificationService){

    	this.artworkService = artworkService;
    	this.likeService = likeService;
    	this.heartService = heartService;
    	this.commentService = commentService;
	this.userService = userService;
	this.postService = postService;
	this.notificationService = notificationService;

    	addClassName("main-feed");
    }

    private Avatar createAvatar(User user){
    	String imageUrl = user.getProfileImage();

        Avatar avatar = new Avatar();
        avatar.addClassName("view-avatar");
        avatar.setImage(imageUrl);

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

        int totalLikes = 0;
        int totalHearts = 0;
        int totalSmiles = 0;
        int totalReactions = 0;

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

    public FormLayout createFeed(User userr){
    	List<Artwork> artworks = artworkService.getArtworksByUserId(userr.getId());

	FormLayout formLayout = new FormLayout();

    	for(Artwork artwork : artworks){
    	    String background = artwork.getBackground();

             if (background == null) {
             	 createArtworkPost(artwork, formLayout);
             } else {
                 createPostOnly(artwork, formLayout);
             }
    	}

    	return formLayout;
    }

    private void createPostOnly(Artwork artwork, FormLayout formLayout){
        User user = artwork.getUser();

        String imageUrl = user.getProfileImage();

        Avatar avatar = new Avatar();
        avatar.setImage(imageUrl);
        avatar.addClassName("feed-only-avatar");

        Span timeAgo = new Span();
        timeAgo.addClassName("feed-only-time");
        updateTimeAgo(artwork, timeAgo);
        timeAgo.add(" • ");
        timeAgo.add(new Icon("vaadin", "globe"));

        Div nameDiv = new Div(new Span(user.getFullName()), timeAgo);
        nameDiv.addClassName("feed-only-name-div");

        Icon moreIcon = new Icon("vaadin", "ellipsis-dots-h");
        moreIcon.addClassName("feed-only-more-icon");

        Icon closeIcon = new Icon("lumo", "cross");
        closeIcon.addClassName("feed-only-close-icon");

        HorizontalLayout headerLayout = new HorizontalLayout(avatar, nameDiv, new Div(moreIcon, closeIcon));
        headerLayout.addClassName("feed-only-header-layout");

        Div content = new Div(new Span(artwork.getDescription()));
        content.addClassName("feed-only-content");

        String background = artwork.getBackground();

        if (background != null){
            content.getStyle().set("background", background);
        }

        List<Comment> comments = commentService.getCommentsByArtworkId(artwork.getId());

        String withDecimal = formatValue(comments.size(), true);
        String withoutDecimal = formatValue(comments.size(), false);

        Button commentButton = new Button(new Icon("vaadin", "comment-o"));
        commentButton.addClickListener(event -> {
            Long artworkId = artwork.getId();
            VaadinSession.getCurrent().getSession().setAttribute("main", artworkId);
            UI.getCurrent().navigate(CommentView.class, artworkId);
        });

        Span commentsSpan = new Span();

        if (comments.size() > 0) {
            commentButton.setText(withoutDecimal);
            String text = comments.size() == 0 ? " Comment" : " Comments";
            commentsSpan.setText(withDecimal + text);
        }

        // Buttons
        Button likeButton = new Button(new Icon("vaadin", "thumbs-up-o"));
        Button chatButton = new Button(new Icon("vaadin", "comment-ellipsis-o"));
        Button shareButton = new Button("999K", new Icon("vaadin", "arrow-forward"));

        HorizontalLayout buttonsLayout = new HorizontalLayout(likeButton, commentButton, chatButton, shareButton);
        buttonsLayout.addClassName("feed-only-buttons-layout");

        Icon likeIcon = new Icon("vaadin", "thumbs-up");
        Icon heartIcon = new Icon("vaadin", "heart");
        Icon happyIcon = new Icon("vaadin", "smiley-o");

        Span totalReactions = new Span();
        totalReactions.addClassName("feed-only-totalReactions");

        showReactions(likeButton, artwork, totalReactions, new Span(), new Span(), new Span(), likeIcon, heartIcon, happyIcon);

        HorizontalLayout reactionsLayout = new HorizontalLayout(
                new Div(likeIcon, heartIcon, happyIcon, totalReactions),
                commentsSpan
        );
        reactionsLayout.addClassName("feed-only-reactions-layout");

        closeIcon.addClickListener(event -> {
             formLayout.remove(headerLayout, content, reactionsLayout, buttonsLayout);
        });

        formLayout.add(headerLayout, content, reactionsLayout, buttonsLayout);
    }

    private void createArtworkPost(Artwork artwork, FormLayout formLayout){
        String imageUrl = artwork.getArtworkUrl();

        Image image = new Image(imageUrl, "artwork-image");
        image.addClassName("main-feed-image");

        User user = artwork.getUser();
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

        showReactions(likeButton, artwork, totalReactions, likes, hearts, smiles, likeIcon, heartIcon, happyIcon);

        Button commentButton = createCommentButtonListener(user, artwork);
        Button shareButton = new Button("7262", new Icon(VaadinIcon.ARROW_FORWARD));
        shareButton.addClassName("feed-heart");

        HorizontalLayout buttonsLayout = new HorizontalLayout(likeButton, commentButton, shareButton);
        buttonsLayout.addClassName("main-feed-buttons");

        VerticalLayout profileLayout = createFeedHeader(user, artwork);
        profileLayout.addClassName("comment-user-header-layout");

        List<PostReaction> reactions = postService.getPostReactionsByArtworkId(artwork.getId());

        HorizontalLayout totalReactionsDiv = createTotalReactions(reactions, commented, artwork, totalReactions, likes, hearts, smiles, likeIcon, heartIcon, happyIcon);
        totalReactionsDiv.addClassName("comment-reactions-div");
        totalReactionsDiv.addClickListener(event -> {
            List<PostReaction> reactions2 = postService.getPostReactionsByArtworkId(artwork.getId());

            ConfirmDialog dialog = new ConfirmDialog();
            dialog.addClassName("main-reactor-dialog");
            dialog.setConfirmText("Close");

            createReactedLayout(reactions2, dialog);
        });

        formLayout.add(profileLayout, image, totalReactionsDiv, buttonsLayout);
    }

    public void showReactions(Button likeButton, Artwork artwork, Span totalReactions, Span likes, Span hearts,
        Span smiles, Icon likeIcon, Icon heartIcon, Icon happyIcon){

        List<PostReaction> reactions = postService.getPostReactionsByArtworkId(artwork.getId());

        // Map to store reaction counts
        Map<String, Integer> reactionCounts = new HashMap<>();
        reactionCounts.put("Like", 0);
        reactionCounts.put("Heart", 0);
        reactionCounts.put("Happy", 0);

        // Count the reactions
        for (PostReaction reaction : reactions) {
             reactionCounts.computeIfPresent(reaction.getReactType(), (k, v) -> v + 1);
        }

        // Update the UI components based on counts
        updateReactionComponent(likeIcon, likes, reactionCounts.get("Like"));
        updateReactionComponent(heartIcon, hearts, reactionCounts.get("Heart"));
        updateReactionComponent(happyIcon, smiles, reactionCounts.get("Happy"));

        Dialog dialog = new Dialog();
        dialog.addClassName("comment-dialog");

        AtomicLong totalReacts = new AtomicLong(reactions.size());

        if(totalReacts.get() != 0){
           totalReactions.setText(formatValue(totalReacts.get(), true) + " reactions");
           likeButton.setText(formatValue(totalReacts.get(), false));
        }else if(totalReacts.get() == 0){
           likeButton.setIcon(new Icon(VaadinIcon.THUMBS_UP_O));
           likeButton.setText("");
           likeButton.getStyle().set("color", "white");
        }

        User currentUser = userService.findCurrentUser();

        PostReaction reactor = postService.getPostReactionByReactorAndArtworkId(currentUser.getId(), artwork.getId());

        AtomicBoolean isReacted = new AtomicBoolean(reactor != null);

        Icon alreadyLiked = new Icon(VaadinIcon.THUMBS_UP);
        alreadyLiked.addClassName("feed-listener-like");

        Icon alreadyHearted = new Icon(VaadinIcon.HEART);
        alreadyHearted.addClassName("feed-listener-heart");

        Icon alreadySmiled = new Icon(VaadinIcon.SMILEY_O);
        alreadySmiled.addClassName("feed-listener-happy");

        if(isReacted.get() && reactor.getReactType().equalsIgnoreCase("Like")){
            likeButton.setIcon(alreadyLiked);
        }else if(isReacted.get() && reactor.getReactType().equalsIgnoreCase("Heart")){
            likeButton.setIcon(alreadyHearted);
        }else if(isReacted.get() && reactor.getReactType().equalsIgnoreCase("Happy")){
            likeButton.setIcon(alreadySmiled);
        }

        Icon likeReactIcon = new Icon(VaadinIcon.THUMBS_UP);
        likeReactIcon.addClassName("like-react-icon");
        likeReactIcon.addClickListener(e -> {
            createButtonsListener(isReacted, "Like", totalReacts, likeButton, artwork, "primary", totalReactions, likes, hearts, smiles, likeIcon, heartIcon, happyIcon);
            dialog.close();
        });

        Icon heartReactIcon = new Icon(VaadinIcon.HEART);
        heartReactIcon.addClassName("heart-react-icon");
        heartReactIcon.addClickListener(e -> {
            createButtonsListener(isReacted, "Heart", totalReacts, likeButton, artwork, "error", totalReactions, likes, hearts, smiles, likeIcon, heartIcon, happyIcon);
            dialog.close();
        });

        Icon happyReactIcon = new Icon(VaadinIcon.SMILEY_O);
        happyReactIcon.addClassName("happy-react-icon");
        happyReactIcon.addClickListener(e -> {
            createButtonsListener(isReacted, "Happy", totalReacts, likeButton, artwork, "warning", totalReactions, likes, hearts, smiles, likeIcon, heartIcon, happyIcon);
            dialog.close();
        });

        dialog.add(
            new VerticalLayout(likeReactIcon, new Span("Like")),
            new VerticalLayout(heartReactIcon, new Span("Heart")),
            new VerticalLayout(happyReactIcon, new Span("Happy"))
        );

        likeButton.addClickListener(event -> {
             dialog.open();
        });
    }

    public void createButtonsListener(AtomicBoolean isReacted, String reactType, AtomicLong totalReacts, Button button,
        Artwork artwork, String colorTheme, Span totalReactions, Span likes, Span hearts, Span smiles,
        Icon likeIcon, Icon heartIcon, Icon happyIcon){

        User currentUser = userService.findCurrentUser();

        Icon likeIcon2 = new Icon(VaadinIcon.THUMBS_UP);
        likeIcon2.addClassName("feed-listener-like");

        Icon heartIcon2 = new Icon(VaadinIcon.HEART);
        heartIcon2.addClassName("feed-listener-heart");

        Icon happyIcon2 = new Icon(VaadinIcon.SMILEY_O);
        happyIcon2.addClassName("feed-listener-happy");

        if (!isReacted.get()) {
            // Reacting to the post
            postService.savePostReaction(artwork, currentUser, reactType);
            notificationService.createReactNotification(currentUser, artwork);
            updateReactionCount(totalReacts.incrementAndGet(), button, totalReactions);
            setReactionIcon(button, colorTheme);
            isReacted.set(true);
        } else {
            // Already reacted, handle unreacting or updating reaction type
            Long reactorId = currentUser.getId();
            Long artworkId = artwork.getId();
            PostReaction reactor = postService.getPostReactionByReactorAndArtworkId(reactorId, artworkId);

            if (reactor.getReactType().equalsIgnoreCase(reactType)) {
                // Unreact if the reaction type is the same
                postService.removePostReaction(reactorId, artworkId);
                updateReactionCount(totalReacts.decrementAndGet(), button, totalReactions);
                button.setIcon(new Icon(VaadinIcon.THUMBS_UP_O));
                button.getStyle().set("color", "white");
                isReacted.set(false);
            } else {
                // Update the reaction type
                postService.updatePostReaction(reactor, reactType);
                setReactionIcon(button, colorTheme);
                isReacted.set(true);
            }
        }

        List<PostReaction> reactions = postService.getPostReactionsByArtworkId(artwork.getId());

        if (reactions.isEmpty()) {
            totalReactions.setText("");
        } else {
            totalReactions.setText(formatValue(reactions.size(), true));
        }

        // Map to store reaction counts
        Map<String, Integer> reactionCounts = new HashMap<>();
        reactionCounts.put("Like", 0);
        reactionCounts.put("Heart", 0);
        reactionCounts.put("Happy", 0);

        // Count the reactions
        for (PostReaction reaction : reactions) {
             reactionCounts.computeIfPresent(reaction.getReactType(), (k, v) -> v + 1);
        }

        // Update the UI components based on counts
        updateReactionComponent(likeIcon, likes, reactionCounts.get("Like"));
        updateReactionComponent(heartIcon, hearts, reactionCounts.get("Heart"));
        updateReactionComponent(happyIcon, smiles, reactionCounts.get("Happy"));
    }

    private void updateReactionCount(long count, Button button, Span totalReactions) {
        String formattedValue = count > 0 ? formatValue(count, false) : "";
        button.setText(formattedValue);
        totalReactions.setText(formattedValue);
    }

    private void setReactionIcon(Button button, String colorTheme) {
        Icon likeIcon = new Icon(VaadinIcon.THUMBS_UP);
        likeIcon.addClassName("feed-listener-like");

        Icon heartIcon = new Icon(VaadinIcon.HEART);
        heartIcon.addClassName("feed-listener-heart");

        Icon happyIcon = new Icon(VaadinIcon.SMILEY_O);
        happyIcon.addClassName("feed-listener-happy");

        switch (colorTheme) {
            case "primary":
                button.setIcon(likeIcon);
                break;
            case "error":
                button.setIcon(heartIcon);
                break;
            case "warning":
                button.setIcon(happyIcon);
                break;
            default:
                button.setIcon(new Icon("vaadin", "thumbs-up-o"));
                button.getStyle().set("color", "white");
                break;
        }
    }

    // Method to update visibility and text
    private void updateReactionComponent(Icon icon, Span label, int count) {
        boolean isVisible = count > 0;
        icon.setVisible(isVisible);
        label.setVisible(isVisible);
        if (isVisible) {
            label.setText(formatValue(count, false));
        }
    }

    public HorizontalLayout createTotalReactions(List<PostReaction> reactions, Span commented, Artwork artwork, Span totalReactions, Span likes, Span hearts, Span smiles, Icon likeIcon, Icon heartIcon, Icon happyIcon){
        int totalLikes = 0;
        int totalHearts = 0;
        int totalSmiles = 0;

        for(PostReaction reaction : reactions){
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

        totalReactions.setText(formatValue(totals, true) + " reactions");

        List<Comment> comments = commentService.getCommentsByArtworkId(artwork.getId());
        commented.setText(formatValue((long) comments.size(), true) + " comments");

        HorizontalLayout reactionsDiv = new HorizontalLayout(likeIcon,likes, heartIcon,hearts,  happyIcon, smiles); //commented, totalReactions
        reactionsDiv.addClassName("comment-reactions-div");

        return reactionsDiv;
    }

    private VerticalLayout createFeedHeader(User user, Artwork artwork){
        String imageUrl = user.getProfileImage();
        Avatar avatar = new Avatar();
        avatar.setImage(imageUrl);
        avatar.addClassName("profile-user-avatar");

        Div avatarDiv = new Div(avatar);

        Span name = new Span(user.getFullName());
        name.addClassName("profile-user-fullname");

        String description = artwork.getDescription();

        if (description.length() > 37) {
           description = description.replaceAll("(.{37})", "$1\n");
        }

        Span title = new Span(description);
        title.addClassName("comment-title");

        Span dateTime = new Span(artwork.getDateTime());
        dateTime.addClassName("comment-date-time");

        HorizontalLayout layout = new HorizontalLayout(avatarDiv, name);
        layout.addClassName("comment-user-layout");
        /*layout.addClickListener(event -> {
            UI.getCurrent().navigate(UserProfile.class, user.getId());
        });*/

        return new VerticalLayout(layout, dateTime, title);
    }

    public Button createCommentButtonListener(User user, Artwork artwork){
    	List<Comment> comments = commentService.getCommentsByArtworkId(artwork.getId());

	Long totalComments = (long) comments.size();

    	Button commentButton = new Button();
	commentButton.addClassName("feed-comment");
	commentButton.setIcon(new Icon(VaadinIcon.COMMENT_ELLIPSIS_O));
	commentButton.setText(formatValue(totalComments, false));
	commentButton.addClickListener(event -> {
	    Set<String> sessionNames = VaadinSession.getCurrent().getSession().getAttributeNames();

	    for(String sessionName : sessionNames){
	    	if(sessionName.equals("main")){
	    	   VaadinSession.getCurrent().getSession().removeAttribute("main");
	    	}
	    }

	    Long artworkId = artwork.getId();
            VaadinSession.getCurrent().getSession().setAttribute("profile", artworkId);

            UI.getCurrent().navigate(CommentSectionView.class, artworkId);
	});

	return commentButton;
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

    private void updateTimeAgo(Artwork artwork, Span timeAgo) {
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
