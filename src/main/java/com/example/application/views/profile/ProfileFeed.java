package com.example.application.views.profile;

import com.example.application.data.dto.post.PostReactionDTO;
import com.example.application.data.dto.post.ArtworkFeedDTO;
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
import com.example.application.views.CustomEvent;
import com.example.application.views.PostReactionsView;
import com.example.application.views.utils.PostUtils;
import com.example.application.views.BottomSheet;
import com.example.application.views.PeopleWhoReactedView;
import com.example.application.views.ViewPostImage;

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
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.html.IFrame;

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
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicBoolean;

public class ProfileFeed extends AppLayout {

    private final ArtworkService artworkService;
    private final LikeReactionService likeService;
    private final HeartReactionService heartService;
    private final CommentService commentService;
    private final UserServices userService;
    private final PostReactionService postService;
    private final NotificationService notificationService;

    private FormLayout formLayout;

    public ProfileFeed(ArtworkService artworkService, LikeReactionService likeService,
    	HeartReactionService heartService, CommentService commentService, UserServices userService,
    	PostReactionService postService, NotificationService notificationService, FormLayout formLayout){

    	this.artworkService = artworkService;
    	this.likeService = likeService;
    	this.heartService = heartService;
    	this.commentService = commentService;
	this.userService = userService;
	this.postService = postService;
	this.notificationService = notificationService;
	this.formLayout = formLayout;

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

    private void createReactedLayout(List<PostReaction> reactions, ConfirmDialog dialog) {
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

    public void loadPosts(User user, int currentPage) {
        System.out.println("Listener triggered. Current Page: " + currentPage);

    	final int PAGE_SIZE = 10;

        List<ArtworkFeedDTO> artworks = artworkService.getUserArtworkDTOs(user, currentPage * PAGE_SIZE, PAGE_SIZE);

        for (ArtworkFeedDTO artwork : artworks) {
            switch (artwork.getPostType()) {
                case IMAGE:
                    createPost(artwork, getImageContent(artwork));
                    break;
                case TEXT_BACKGROUND:
                    createPost(artwork, getTextBackgroundContent(artwork));
                    break;
                case VIDEO:
                    createPost(artwork, getVideoContent(artwork));
                    break;
                case TEXT:
                    createPost(artwork, getTextContent(artwork));
                    break;
                default:
                    // handle unknow post type
                    break;
            }
        }
    }

    private Span getTextContent(ArtworkFeedDTO artwork) {
        Span text = new Span(artwork.getArtworkDescription());
        text.addClassName("post-description");
        return text;
    }

    private Component getImageContent(ArtworkFeedDTO artwork) {
        List<String> uploadedImages = artwork.getUploadedImages();

        if (uploadedImages.size() <= 1) {
            Image image = new Image(uploadedImages.get(0), "artwork-image");
            image.addClassName("main-feed-image");
            return image;
        }

        Map<Integer, String> sizeMap = Map.of(1, "one", 2, "two", 3, "three", 4, "four", 5, "five");

        int uploadedImagesSize = uploadedImages.size();
        String size = sizeMap.getOrDefault(uploadedImagesSize, "more");

        Div mainLayout = new Div(); // Main layout container

        // First row layout
        HorizontalLayout firstRow = new HorizontalLayout();
        firstRow.addClassName("image-row-" + size);

        // Second row layout
        HorizontalLayout secondRow = new HorizontalLayout();
        secondRow.addClassName("image-row-" + size);

        // Add images to the first and second rows
        for (int i = 0; i < uploadedImagesSize; i++) {
            String uploadedImage = uploadedImages.get(i);

            Image image = new Image(uploadedImage, "Image " + (i + 1));
            image.addClassName("uploaded-image");

            Div imageDiv = new Div();
            imageDiv.addClassName("image-container");
            imageDiv.add(image);
            imageDiv.addClickListener(event -> {
                ViewPostImage postImage = new ViewPostImage(formLayout, artwork);
                postImage.open();
            });

            if (i < 2) {
                // First two images go into the first row
                firstRow.add(imageDiv);
            } else if (i < 5) {
                // Next three images go into the second row
                if (i == 4 && uploadedImagesSize > 5) {
                    // Add remaining count to the 5th image
                    Span remainingCount = new Span("+" + (uploadedImagesSize - 5));
                    remainingCount.addClassName("remaining-count");
                    imageDiv.add(remainingCount);
                }
                secondRow.add(imageDiv);
            }

            // Stop processing after the 5th image
            if (i == 4) {
                break;
            }
        }

        // Add rows to the main layout
        mainLayout.add(firstRow, secondRow);
        return mainLayout;
    }

    private Div getTextBackgroundContent(ArtworkFeedDTO artwork) {
        Div content = new Div(new Span(artwork.getArtworkDescription()));
        content.addClassName("feed-only-content");
        setContentBackground(artwork, content);
        return content;
    }

    private IFrame getVideoContent(ArtworkFeedDTO artwork) {
        IFrame video = new IFrame(artwork.getArtworkUrl());
        video.getElement().setAttribute("frameborder", "0");
        video.getElement().setAttribute("allowfullscreen", "true");
        return video;
    }

    private void createPost(ArtworkFeedDTO artwork, Component content) {
        Avatar avatar = new Avatar("", artwork.getUserProfileImage());
        avatar.addClassName("feed-only-avatar");

        Span timeAgo = createTimeAgo(artwork);

        Div nameDiv = new Div(new Span(artwork.getUserFullName()), timeAgo);
        nameDiv.addClassName("feed-only-name-div");

        Icon moreIcon = new Icon("vaadin", "ellipsis-dots-h");
        moreIcon.addClassName("feed-only-more-icon");

        Icon closeIcon = new Icon("lumo", "cross");
        closeIcon.addClassName("feed-only-close-icon");

        HorizontalLayout headerLayout = new HorizontalLayout(avatar, nameDiv, new Div(moreIcon, closeIcon));
        headerLayout.addClassName("feed-only-header-layout");

        Span commentsSpan = new Span();

        Button commentButton = createCommentButton(artwork, commentsSpan);
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

        PostReactionsView reactionsView = new PostReactionsView(notificationService, artworkService, postService, userService, likeButton, totalReactions, artwork);
        reactionsView.showReactions(likeIcon, loveIcon, careIcon, hahaIcon, wowIcon, sadIcon, angryIcon);

        Div reactionsLayout = createReactionsLayout(artwork, formLayout, totalReactions, commentsSpan);

        closeIcon.addClickListener(event -> {
             formLayout.remove(headerLayout, content, reactionsLayout, buttonsLayout);
        });

        Span description = getDescription(artwork);
        description.addClassName("post-description");

        CustomEvent.handleLongPressEvent(description);
        description.getElement().addEventListener("long-press", e -> copyText(artwork));

        formLayout.add(headerLayout, description, content, reactionsLayout, buttonsLayout);
    }

    private void copyText(ArtworkFeedDTO artwork) {
        PostUtils postUtils = new PostUtils();
        BottomSheet sheet = postUtils.createCopyTextSheet(artwork.getArtworkDescription());
        formLayout.add(sheet);
        sheet.open();
    }

    private Span getDescription(ArtworkFeedDTO artwork) {
        Span description = new Span();
        description.addClassName("post-description");
        if (artwork.getArtworkBackground() == null && (!artwork.getArtworkDescription().isEmpty() || artwork.getArtworkDescription() != null)) {
            return new Span(artwork.getArtworkDescription());
        }
        return new Span();
    }

    // Method to create a timestamp for the post
    private Span createTimeAgo(ArtworkFeedDTO artwork) {
        Span timeAgo = new Span();
        timeAgo.addClassName("feed-only-time");
        updateTimeAgo(artwork, timeAgo);
        timeAgo.add(new Span(" • "), new Icon("vaadin", "globe"));
        return timeAgo;
    }

    // Method to create a comment button
    private Button createCommentButton(ArtworkFeedDTO artwork, Span commentsSpan) {
        Button commentButton = new Button(new Icon("vaadin", "comment-o"), e -> {
            VaadinSession.getCurrent().getSession().setAttribute("main", artwork.getArtworkId());
            UI.getCurrent().navigate(CommentView.class, artwork.getArtworkId());
        });

        Long commentsCount = artwork.getCommentsCount();
        if (commentsCount > 0) {
            commentButton.setText(formatValue(commentsCount + 999998, false));
            String text = commentsCount == 0 ? " Comment" : " Comments";
            commentsSpan.setText(formatValue(commentsCount, true) + text);
        }

        return commentButton;
    }

    // Method to create 3 top reaction icons with most reactions
    private Div createReactionsLayout(ArtworkFeedDTO artwork, FormLayout formLayout, Span totalReactions, Span commentsSpan) {
        Div reactionsLayout = new Div(getMostReactions(artwork.getArtworkId(), totalReactions), commentsSpan);
        reactionsLayout.addClassName("feed-only-reactions-layout");
        reactionsLayout.addClickListener(event -> {
             PeopleWhoReactedView reacted = new PeopleWhoReactedView(formLayout, artwork.getArtworkId(), postService);
             reacted.open();
        });
        return reactionsLayout;
    }

    // Method to get 3 top reaction icons
    private Div getMostReactions(Long artworkId, Span totalReactions) {
    	List<PostReactionDTO> topReactions = postService.getTopReactionsByArtworkId(artworkId).getContent();

        // Add top 3 reaction icons
        Div reactionsDiv = new Div();
        topReactions.forEach(reaction -> reactionsDiv.add(getIcon(reaction.getReactType())));
        reactionsDiv.add(totalReactions);
        return reactionsDiv;
    }

    // Method to get reaction icon
    private SvgIcon getIcon(String reactType) {
        return new SvgIcon(new StreamResource("like.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/" + reactType  + ".svg")));
    }

    // Method to set a background for post
    private void setContentBackground(ArtworkFeedDTO artwork, Div content) {
        String background = artwork.getArtworkBackground();

        if (background != null){
            content.getStyle().set("background", background);
        }
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
