package com.example.application.views.comment;

import com.example.application.services.notification.NotificationService;
import com.example.application.data.PostReaction;
import com.example.application.services.PostReactionService;
import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.data.Artwork;
import com.example.application.services.ArtworkService;
import com.example.application.data.Comment;
import com.example.application.services.CommentService;
import com.example.application.data.CommentReaction;
import com.example.application.services.CommentReactionService;
import com.example.application.data.Reply;
import com.example.application.services.ReplyService;
import com.example.application.data.SavedPost;
import com.example.application.services.SavedPostService;
import com.example.application.services.story.StoryService;

import com.example.application.views.profile.UserProfile;
import com.example.application.views.profile.ViewSpecificArtwork;
import com.example.application.views.profile.ProfileFeed;
import com.example.application.views.profile.SavedPostView;
import com.example.application.views.notification.NotificationView;
import com.example.application.views.MainFeed;
import com.example.application.views.BottomSheet;
import com.example.application.views.ReactionsView;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.virtuallist.VirtualList;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;

import jakarta.annotation.security.PermitAll;
import com.vaadin.flow.data.provider.CallbackDataProvider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

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

import java.util.Set;
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

@Route("comment")
@PermitAll
public class CommentView extends AppLayout implements HasUrlParameter<Long> {

    private final CommentService commentService;
    private final UserServices userService;
    private final ArtworkService artworkService;
    private final CommentReactionService commentReactionService;
    private final ReplyService replyService;
    private final SavedPostService savedPostService;
    private final PostReactionService postService;
    private final StoryService storyService;
    private final NotificationService notificationService;

    private final MemoryBuffer buffer = new MemoryBuffer();
    private final Upload upload = new Upload(buffer);
    private final TextArea textArea = new TextArea();
    private final VirtualList<Comment> commentList;

    public CommentView(CommentService commentService, UserServices userService,
    	ArtworkService artworkService, CommentReactionService commentReactionService,
    	ReplyService replyService, SavedPostService savedPostService, PostReactionService postService,
        StoryService storyService, NotificationService notificationService) {

        this.commentService = commentService;
        this.userService = userService;
        this.artworkService = artworkService;
        this.commentReactionService = commentReactionService;
        this.replyService = replyService;
        this.savedPostService = savedPostService;
        this.postService = postService;
        this.storyService = storyService;
        this.notificationService = notificationService;

        commentList = new VirtualList<Comment>();
        commentList.setRenderer(commentRenderer());
        commentList.addClassName("post-comment-virtual-list");

        addClassName("comment-app-layout");
    }

    public void setParameter(BeforeEvent event, Long artworkId) {
    	List<Comment> comments = commentService.getCommentsByArtworkId(artworkId);
        Artwork artwork = artworkService.getArtworkById(artworkId);
        User user = artwork.getUser();

        createHeader(user, artwork);
        createMainLayout(artwork);
        createFooter();
    }

    private void createMainLayout(Artwork artwork){
    	FormLayout formLayout = new FormLayout();

	setupVirtualList(artwork.getId());
    	createPostOnly(artwork, formLayout);
    	createSortLayout(formLayout);
    	formLayout.add(commentList);

    	setContent(formLayout);
    }

    private ComponentRenderer<Component, Comment> commentRenderer() {
    	return new ComponentRenderer<>(comment -> {
            User user = comment.getUser();

            String imageUrl = user.getProfileImage();
            var avatar = new Avatar();
            avatar.setImage(imageUrl);

            var commentDiv = new Div(new Span(user.getFullName()),
                new Span(comment.getComments())
            );

            var commentLayout = new Div(avatar, commentDiv);
            commentLayout.addClassName("post-comment-layout");

            var timeAgo = new Span();
            var likeSpan = new Span("Like");
            var replySpan = new Span("Reply");
            var reacts = new Span();
            var reactionsDiv = new Div(
                new Icon("vaadin", "thumbs-up"),
                new Icon("vaadin", "heart"),
                new Icon("vaadin", "smiley-o")
            );

            updateCommentTime(comment, timeAgo);

            var reactionsView = new ReactionsView(
                commentReactionService,
                userService,
                likeSpan,
                reacts,
                comment
            );
            reactionsView.showReactions();

            var footerLayout = new Div(timeAgo, likeSpan, replySpan, reactionsDiv);
            footerLayout.addClassName("post-comment-footer-layout");

            var mainLayout = new VerticalLayout(commentLayout, footerLayout);
            mainLayout.addClassName("post-comment-main-layout");

            return mainLayout;
        });
    }

    private void setupVirtualList(Long artworkId) {
    	// Create a DataProvider for lazy loading
    	CallbackDataProvider<Comment, Void> dataProvider = new CallbackDataProvider<>(
            query -> {
            	// Calculate the offset and limit for pagination
            	int offset = query.getOffset();
            	int limit = query.getLimit();
            	Pageable pageable = PageRequest.of(offset / limit, limit);

            	// Fetch paginated comments from the service
            	Page<Comment> commentsPage = commentService.getCommentsByArtworkId(artworkId, pageable);

            	// Return a stream of comments
            	return commentsPage.getContent().stream();
            },
            // Count the total number of items for pagination
            query -> (int) commentService.getCommentsCountByArtworkId(artworkId)
    	);

    	// Set the DataProvider to the VirtualList
    	commentList.setDataProvider(dataProvider);
    }

    private void createSortLayout(FormLayout formLayout) {
    	var sheet = new BottomSheet();

    	var sortedText = new Span("Most relevant");
    	sortedText.addClassName("post-sorted-text");
    	sortedText.add(new Icon("lumo", "angle-down"));

    	sortedText.addClickListener(event -> {
    	    sheet.open();
    	});

    	var header = new HorizontalLayout(new Span("Sort comments"));
    	header.addClassName("post-sorted-header");

    	var radio1 = new RadioButtonGroup<String>();
    	radio1.setItems("");
    	radio1.setEnabled(false);

    	var radio2 = new RadioButtonGroup<String>();
        radio2.setItems("");
        radio2.setEnabled(false);

        var radio3 = new RadioButtonGroup<String>();
        radio3.setItems("");
        radio3.setEnabled(false);

    	var mostText = new Span("Show followers' comments and the most engaging comments first.");
    	mostText.add(radio1);

    	var newestText = new Span("Show all comments with the newest comments first.");
    	newestText.add(radio2);

    	var allText = new Span("Show all comments including potential spam.");
    	allText.add(radio3);

    	var mostDiv = new Div(new Span("Most relevant"), mostText);
	mostDiv.addClassName("post-sorted-div");
	mostDiv.addClickListener(event -> {
            radio1.setValue("");
            radio2.setValue(null);
            radio3.setValue(null);
        });

	var newestDiv = new Div(new Span("Newest"), newestText);
	newestDiv.addClassName("post-sorted-div");
	newestDiv.addClickListener(event -> {
            radio1.setValue(null);
            radio2.setValue("");
            radio3.setValue(null);
        });

	var allDiv = new Div(new Span("All comments"), allText);
	allDiv.addClassName("post-sorted-div");
	allDiv.addClickListener(event -> {
            radio1.setValue(null);
            radio2.setValue(null);
            radio3.setValue("");
        });

        var line = new Div();
        line.addClassName("post-sorted-line");

        var okayButton = new Button("OK");
        okayButton.addClassName("post-sorted-okay-button");
        okayButton.addClickListener(event -> {
            sheet.close();
        });

	var sortedLayout = new VerticalLayout(mostDiv, newestDiv, allDiv, line, okayButton);
	sortedLayout.addClassName("post-sorted-layout");

	sheet.addContent(header, sortedLayout);

    	formLayout.add(sortedText, sheet);
    }

    private void createPostOnly(Artwork artwork, FormLayout formLayout) {
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
        nameDiv.addClassName("feed-only-comment-name-div");

        Icon moreIcon = new Icon("vaadin", "ellipsis-dots-h");
        moreIcon.addClassName("feed-only-more-icon");

        HorizontalLayout headerLayout = new HorizontalLayout(avatar, nameDiv, moreIcon);
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

        //showReactions(likeButton, artwork, totalReactions, new Span(), new Span(), new Span(), likeIcon, heartIcon, happyIcon);

        HorizontalLayout reactionsLayout = new HorizontalLayout(
                new Div(likeIcon, heartIcon, happyIcon, totalReactions),
                commentsSpan
        );
        reactionsLayout.addClassName("feed-only-reactions-layout");

        formLayout.add(headerLayout, content, reactionsLayout, buttonsLayout);
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

    private void updateCommentTime(Comment comment, Span timeAgo) {
        LocalDateTime creationTime = comment.getDateTimePosted();
        LocalDateTime currentTime = LocalDateTime.now(ZoneId.of("Asia/Manila"));

        Duration duration = Duration.between(creationTime, currentTime);

        long seconds = duration.getSeconds();
        long minutes = duration.toMinutes();
        long hours = duration.toHours();
        long days = duration.toDays();

        if (seconds < 60) {
           // Less than 1 minute ago, use "sec" or "secs"
           timeAgo.setText(seconds == 1 ? seconds + " sec" : seconds + " secs");
        } else if (minutes < 60) {
           // Less than 1 hour ago, use "min" or "mins"
           timeAgo.setText(minutes == 1 ? minutes + " min" : minutes + " mins");
        } else if (hours < 24) {
           // Less than 1 day ago, use "hr" or "hrs"
           timeAgo.setText(hours == 1 ? hours + " hr" : hours + " hrs");
        } else if (days < 7) {
           // Between 1 and 7 days ago, display day of the week (e.g., "Mon")
           DateTimeFormatter dayFormatter = DateTimeFormatter.ofPattern("EEE"); // Abbreviated weekday
           String formattedDay = creationTime.format(dayFormatter);
           timeAgo.setText("On " + formattedDay); // e.g., "On Mon"
        } else if (days < 30) {
           // More than 7 days but less than 1 month, display "1 wk" or "2 wks"
           long weeks = days / 7;
           timeAgo.setText(weeks == 1 ? weeks + " wk" : weeks + " wks");
        } else {
           // More than 1 month, display "1 mo" or "2 mos"
           long months = days / 30; // Approximate to 30 days in a month
           timeAgo.setText(months == 1 ? months + " mo" : months + " mos");
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

    private void createFooter(){
    	upload.addClassName("post-upload");
    	upload.setUploadButton(new Button(new Icon("lumo", "photo")));

	Icon sendIcon = new Icon("vaadin", "paperplane");
	sendIcon.addClassName("post-send-icon");
	sendIcon.setVisible(false);

    	textArea.addClassName("post-text-area");
    	textArea.setSuffixComponent(sendIcon);
    	textArea.setPlaceholder("Write a comment…");
    	textArea.setValueChangeMode(ValueChangeMode.EAGER);
    	textArea.addValueChangeListener(event -> {
    	     String value = event.getValue();

             if(!value.isEmpty() && !value.matches("\\s*")){
                sendIcon.setVisible(true);
             }else{
                sendIcon.setVisible(false);
             }
        });

    	HorizontalLayout footerLayout = new HorizontalLayout(upload, textArea);
    	footerLayout.addClassName("post-footer-layout");

    	addToNavbar(true, footerLayout);
    }

    private void createHeader(User user, Artwork artwork){
        String firstname = user.getFirstName();
    	String suffix = firstname.toLowerCase().endsWith("s") ? "s'" : "'s";

        Span firstnameSpan = new Span(firstname + suffix + " post");
        firstnameSpan.addClassName("comment-first-name");

        Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClickListener(event -> {
            Set<String> sessionNames = VaadinSession.getCurrent().getSession().getAttributeNames();
            for(String sessionName : sessionNames){
                if(sessionName.equals("main")){
                   VaadinSession.getCurrent().getSession().removeAttribute("main");
                   UI.getCurrent().navigate(MainFeed.class);
                }else if(sessionName.equals("profile")){
                   VaadinSession.getCurrent().getSession().removeAttribute("profile");
                   UI.getCurrent().navigate(UserProfile.class, user.getId());
                }else if(sessionName.equals("specific")){
                   VaadinSession.getCurrent().getSession().removeAttribute("specific");
                   UI.getCurrent().navigate(ViewSpecificArtwork.class, artwork.getId());
                }else if(sessionName.equals("savedpost")){
                   VaadinSession.getCurrent().getSession().removeAttribute("savedpost");
                   UI.getCurrent().navigate(SavedPostView.class);
                }else if(sessionName.equals("notification")){
                   VaadinSession.getCurrent().getSession().removeAttribute("notification");
                   UI.getCurrent().navigate(NotificationView.class);
                }
            }
        });

        Icon searchIcon = new Icon("lumo", "search");
        searchIcon.addClassName("post-search-icon");

        HorizontalLayout headerLayout = new HorizontalLayout(backIcon, firstnameSpan, searchIcon);
        headerLayout.addClassName("post-header-layout");

        addToNavbar(headerLayout);
     }
}
