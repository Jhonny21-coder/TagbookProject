package com.example.application.views;

import com.example.application.data.Comment;
import com.example.application.data.CommentReaction;
import com.example.application.services.CommentReactionService;
import com.example.application.data.User;
import com.example.application.services.UserServices;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.IFrame;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

public class ReactionsView {
    private final UserServices userService;
    private final CommentReactionService commentReactionService;
    private Span likeButton;
    private Span reacts;
    private Comment comment;

    public ReactionsView(CommentReactionService commentReactionService,
    	UserServices userService, Span likeButton, Span reacts, Comment comment){
        this.userService = userService;
        this.commentReactionService = commentReactionService;

        this.likeButton = likeButton;
        this.reacts = reacts;
        this.comment = comment;
    }

    public void showReactions() {
    	List<CommentReaction> reactions = commentReactionService.getCommentReactionsByCommentId(comment.getId());

    	Dialog dialog = new Dialog();
    	dialog.addClassName("comment-dialog");

    	AtomicLong totalReacts = new AtomicLong(reactions.size());
    	if (totalReacts.get() != 0) {
            reacts.setText(formatValue(totalReacts.get() + 999990, false));
    	}

    	User currentUser = userService.findCurrentUser();
    	CommentReaction reactor = commentReactionService.getCommentReactionByReactorAndCommentId(currentUser.getId(), comment.getId());
    	AtomicBoolean isReacted = new AtomicBoolean(reactor != null);

    	if (isReacted.get()) {
            String reactType = reactor.getReactType().toLowerCase();
            switch (reactType) {
            	case "like":
                    likeButton.setText("Like");
                    likeButton.getStyle().set("color", "var(--lumo-primary-color)");
                    break;
            	case "love":
                    likeButton.setText("Love");
                    likeButton.getStyle().set("color", "var(--lumo-error-color)");
                    break;
            	case "haha":
                    likeButton.setText("Haha");
                    likeButton.getStyle().set("color", "var(--lumo-warning-color)");
                    break;
            	default:
                    break;
            }
    	}

    	Map<String, SvgIcon> reactionIcons = createReactionIcons();
    	reactionIcons.forEach((reactType, icon) -> {
            icon.addClickListener(e -> {
            	String buttonText = getButtonTextByReactionType(reactType);
            	String color = getColorByReactionType(reactType);
            	createReactionsListener(isReacted, reactType, totalReacts, likeButton, reacts, comment, color, buttonText);
            	dialog.close();
            });
    	});

    	dialog.add(
            new Div(
            	new Div(
                    new Div(reactionIcons.get("like"), new Span("Like")),
                    new Div(reactionIcons.get("love"), new Span("Love")),
                    new Div(reactionIcons.get("care"), new Span("Care"))
            	),
                new Div(
                    new Div(reactionIcons.get("haha"), new Span("Haha")),
                    new Div(reactionIcons.get("wow"), new Span("Wow")),
                    new Div(reactionIcons.get("sad"), new Span("Sad")),
                    new Div(reactionIcons.get("angry"), new Span("Angry"))
            	)
            )
    	);

    	//likeButton.addClickListener(event -> dialog.open());
    	CustomEvent.handleLongPressEvent(likeButton);
    	likeButton.getElement().addEventListener("long-press", e -> dialog.open());
    }

    private Map<String, SvgIcon> createReactionIcons() {
    	Map<String, SvgIcon> icons = new HashMap<>();
    	icons.put("like", new SvgIcon(new StreamResource("like.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/like.svg"))));
    	icons.put("love", new SvgIcon(new StreamResource("love.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/love.svg"))));
    	icons.put("care", new SvgIcon(new StreamResource("care.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/care.svg"))));
    	icons.put("haha", new SvgIcon(new StreamResource("haha.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/haha.svg"))));
    	icons.put("wow", new SvgIcon(new StreamResource("wow.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/wow.svg"))));
    	icons.put("sad", new SvgIcon(new StreamResource("sad.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/sad.svg"))));
    	icons.put("angry", new SvgIcon(new StreamResource("angry.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/angry.svg"))));
    	return icons;
    }

    private String getButtonTextByReactionType(String reactType) {
    	switch (reactType.toLowerCase()) {
            case "like": return "Like";
            case "love": return "Love";
            case "care": return "Care";
            case "haha": return "Haha";
            case "wow": return "Wow";
            case "sad": return "Sad";
            case "angry": return "Angry";
            default: return reactType;
    	}
    }

    private String getColorByReactionType(String reactType) {
    	switch (reactType.toLowerCase()) {
            case "like": return "primary";
            case "love": return "error";
            case "care": return "warning";
            case "haha": return "warning";
            case "wow": return "warning";
            case "sad": return "warning";
            case "angry": return "error-text";
            default: return "neutral";
    	}
    }

    // Handle reactions listener
    private void createReactionsListener(AtomicBoolean isReacted, String reactType, AtomicLong totalReacts, Span button, Span reacts, Comment comment, String colorTheme, String reaction) {
    	User currentUser = userService.findCurrentUser();

    	if (!isReacted.get()) {
            addReaction(comment, currentUser, reactType, totalReacts, button, reacts, reaction, colorTheme);
            isReacted.set(true);
    	} else {
            handleExistingReaction(comment, currentUser, reactType, totalReacts, button, reacts, reaction, colorTheme, isReacted);
    	}
    }

    // Add reaction and display an update
    private void addReaction(Comment comment, User currentUser, String reactType, AtomicLong totalReacts, Span button, Span reacts, String reaction, String colorTheme) {
   	commentReactionService.saveCommentReaction(comment, currentUser, reactType);
   	updateReactionDisplay(totalReacts.incrementAndGet(), reacts, button, reaction, colorTheme);
    }

    // Handle existing reaction like removing or updating it
    private void handleExistingReaction(Comment comment, User currentUser, String reactType, AtomicLong totalReacts, Span button, Span reacts, String reaction, String colorTheme, AtomicBoolean isReacted) {
    	Long reactorId = currentUser.getId();
    	Long commentId = comment.getId();
    	CommentReaction reactor = commentReactionService.getCommentReactionByReactorAndCommentId(reactorId, commentId);

    	if (reactor.getReactType().equalsIgnoreCase(reactType)) {
            removeReaction(reactorId, commentId, totalReacts, button, reacts);
            isReacted.set(false);
    	} else {
            updateReaction(reactor, reactType, button, reaction, colorTheme);
            isReacted.set(true);
    	}
    }

    // Remove reaction and display an update
    private void removeReaction(Long reactorId, Long commentId, AtomicLong totalReacts, Span button, Span reacts) {
    	commentReactionService.removeCommentReaction(reactorId, commentId);
    	long newTotalReacts = totalReacts.decrementAndGet();
    	reacts.setText(newTotalReacts == 0 ? "" : String.valueOf(newTotalReacts));
    	button.setText("React");
    	button.getStyle().set("color", "var(--lumo-contrast-70pct)");
    }

    // Update reaction and display an update
    private void updateReaction(CommentReaction reactor, String reactType, Span button, String reaction, String colorTheme) {
    	commentReactionService.updateCommentReaction(reactor, reactType);
    	button.setText(reaction);
    	button.getStyle().set("color", "var(--lumo-" + colorTheme + "-color)");
    }

    // Update reaction display
    private void updateReactionDisplay(long totalReacts, Span reacts, Span button, String reaction, String colorTheme) {
    	reacts.setText(String.valueOf(totalReacts));
    	button.setText(reaction);
    	button.getStyle().set("color", "var(--lumo-" + colorTheme + "-color)");
    }

    // Format numbers with or without decimal
    private String formatValue(long value, boolean includeDecimal) {
        if (value >= 1_000_000_000) {
            return formatBillions(value, includeDecimal);
        } else if (value >= 1_000_000) {
            return formatMillions(value, includeDecimal);
        } else if (value >= 1_000) {
            return formatThousands(value, includeDecimal);
        } else {
            return String.valueOf(value);
        }
    }

    private String formatBillions(long value, boolean includeDecimal) {
	double billions = value / 1_000_000_000.0;
	return formatWithSuffix(billions, "B", includeDecimal);
    }

    // Format numbers in millions with or without decimal
    private String formatMillions(long value, boolean includeDecimal) {
        double millions = value / 1_000_000.0;
        return formatWithSuffix(millions, "M", includeDecimal);
    }

    // Format numbers in thousands with or without decimal
    private String formatThousands(long value, boolean includeDecimal) {
        double thousands = value / 1_000.0;
        return formatWithSuffix(thousands, "K", includeDecimal);
    }

    // Format numbers with or without decimal with suffix like "K", "M", "B"
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
}
