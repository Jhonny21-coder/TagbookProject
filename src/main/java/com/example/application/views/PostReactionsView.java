package com.example.application.views;

import com.example.application.services.notification.NotificationService;
import com.example.application.data.dto.post.PostReactionDTO;
import com.example.application.data.Artwork;
import com.example.application.services.ArtworkService;
import com.example.application.data.PostReaction;
import com.example.application.services.PostReactionService;
import com.example.application.data.User;
import com.example.application.services.UserServices;
import com.example.application.data.dto.post.ArtworkFeedDTO;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicLong;

public class PostReactionsView {
    private final NotificationService notificationService;
    private final UserServices userService;
    private final ArtworkService artworkService;
    private final PostReactionService postReactionService;
    private final Button likeButton;
    private final Span reacts;
    private final ArtworkFeedDTO artwork;

    public PostReactionsView(NotificationService notificationService, ArtworkService artworkService, PostReactionService postReactionService, UserServices userService, Button likeButton, Span reacts, ArtworkFeedDTO artwork) {
    	this.notificationService = notificationService;
        this.userService = userService;
        this.postReactionService = postReactionService;
        this.artworkService = artworkService;
        this.likeButton = likeButton;
        this.reacts = reacts;
        this.artwork = artwork;
    }

    public void showReactions(SvgIcon likeIcon, SvgIcon loveIcon, SvgIcon careIcon, SvgIcon hahaIcon, SvgIcon wowIcon, SvgIcon sadIcon, SvgIcon angryIcon) {
        User currentUser = userService.findCurrentUser();
        Long artworkId = artwork.getArtworkId();
        List<PostReactionDTO> reactions = postReactionService.getReactionsDTO(artworkId);
        Long totalReactions = postReactionService.countPostReactionsByArtworkId(artworkId);
        AtomicLong totalReacts = new AtomicLong(totalReactions);

        // Update total reactions and visibility
        updateTotalReactions(totalReactions);
        updateReactionsVisibility(reactions, likeIcon, loveIcon, careIcon, hahaIcon, wowIcon, sadIcon, angryIcon);

        // Map of icons for already reacted state
        Map<String, SvgIcon> alreadyReactedIcons = createAlreadyReactedIcons();
        PostReactionDTO reactor = postReactionService.getReactorDTO(artworkId, currentUser.getId());
        AtomicBoolean isReacted = new AtomicBoolean(reactor != null);

        if (isReacted.get()) {
            String reactType = reactor.getReactType().toLowerCase();
            SvgIcon icon = alreadyReactedIcons.get(reactType);
            if (icon != null) likeButton.setIcon(icon);
        }

        Dialog dialog = setupReactionDialog(isReacted, totalReacts, artwork, likeIcon, loveIcon, careIcon, hahaIcon, wowIcon, sadIcon, angryIcon);

        // Handle long press and click events for the like button
        CustomEvent.handleLongPressEvent(likeButton);
        likeButton.getElement().addEventListener("long-press", e -> dialog.open());
        likeButton.addClickListener(event -> handleLikeButtonClick(isReacted, totalReacts, currentUser, reactions, likeIcon, loveIcon, careIcon, hahaIcon, wowIcon, sadIcon, angryIcon));
    }

    // Helper to create a map of reaction icons
    private Map<String, SvgIcon> createAlreadyReactedIcons() {
        return Map.of(
            "like", new SvgIcon(new StreamResource("like.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/like.svg"))),
            "love", new SvgIcon(new StreamResource("love.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/love.svg"))),
            "care", new SvgIcon(new StreamResource("care.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/care.svg"))),
            "haha", new SvgIcon(new StreamResource("haha.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/haha.svg"))),
            "wow", new SvgIcon(new StreamResource("wow.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/wow.svg"))),
            "sad", new SvgIcon(new StreamResource("sad.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/sad.svg"))),
            "angry", new SvgIcon(new StreamResource("angry.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/angry.svg")))
        );
    }

    // Helper to set up the reaction dialog
    private Dialog setupReactionDialog(AtomicBoolean isReacted, AtomicLong totalReacts, ArtworkFeedDTO artwork, SvgIcon likeIcon, SvgIcon loveIcon, SvgIcon careIcon, SvgIcon hahaIcon, SvgIcon wowIcon, SvgIcon sadIcon, SvgIcon angryIcon) {
        Dialog dialog = new Dialog();
        dialog.addClassName("comment-dialog");

        Map<String, SvgIcon> reactionIcons = createReactionIcons();
        reactionIcons.forEach((reactType, icon) -> {
            icon.addClickListener(e -> {
                String type = getTypeByReactionType(reactType);
                createReactionsListener(isReacted, reactType, totalReacts, artwork, type, likeIcon, loveIcon, careIcon, hahaIcon, wowIcon, sadIcon, angryIcon);
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

        return dialog;
    }

    // Helper to handle the like button click
    private void handleLikeButtonClick(AtomicBoolean isReacted, AtomicLong totalReacts, User currentUser, List<PostReactionDTO> reactions, SvgIcon likeIcon, SvgIcon loveIcon, SvgIcon careIcon, SvgIcon hahaIcon, SvgIcon wowIcon, SvgIcon sadIcon, SvgIcon angryIcon) {
        if (!isReacted.get()) {
            addReaction(artwork, currentUser, "like", totalReacts, "primary", false);
            isReacted.set(true);
        } else {
            removeReaction(currentUser.getId(), artwork.getArtworkId(), totalReacts);
            isReacted.set(false);
        }

        List<PostReactionDTO> updatedReactions = postReactionService.getReactionsDTO(artwork.getArtworkId());
        reacts.setText(updatedReactions.isEmpty() ? "" : formatValue(updatedReactions.size(), true));

        // Update reactions visibility
        updateReactionsVisibility(updatedReactions, likeIcon, loveIcon, careIcon, hahaIcon, wowIcon, sadIcon, angryIcon);
    }

    // Update reactions visibility
    private void updateReactionsVisibility(List<PostReactionDTO> reactions, SvgIcon likeIcon, SvgIcon loveIcon, SvgIcon careIcon, SvgIcon hahaIcon, SvgIcon wowIcon, SvgIcon sadIcon, SvgIcon angryIcon) {
        Map<String, Integer> reactionCounts = new HashMap<>();
        reactionCounts.put("like", 0);
        reactionCounts.put("love", 0);
        reactionCounts.put("care", 0);
        reactionCounts.put("haha", 0);
        reactionCounts.put("wow", 0);
        reactionCounts.put("sad", 0);
        reactionCounts.put("angry", 0);

        for (PostReactionDTO reaction : reactions) {
            reactionCounts.computeIfPresent(reaction.getReactType(), (k, v) -> v + 1);
        }

        Map<String, SvgIcon> iconMap = Map.of(
            "like", likeIcon,
            "love", loveIcon,
            "care", careIcon,
            "haha", hahaIcon,
            "wow", wowIcon,
            "sad", sadIcon,
            "angry", angryIcon
        );

        iconMap.forEach((reactType, icon) -> updateVisibility(icon, reactionCounts.getOrDefault(reactType, 0)));
    }

    // Method to update visibility of each icon
    private void updateVisibility(SvgIcon icon, int count) {
        icon.setVisible(count > 0);
    }

    // Method to update reactions count
    private void updateTotalReactions(Long totalReactions) {
        AtomicLong totalReacts = new AtomicLong(totalReactions);
        if (totalReacts.get() > 1) {
            reacts.setText(formatValue(totalReacts.get(), true));
            likeButton.setText(formatValue(totalReacts.get(), false));
        } else {
            likeButton.setText("");
            reacts.setText("");
        }
    }

    // Method to create a map for all reactions
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

    // Method to get reaction type based on itself
    private String getTypeByReactionType(String reactType) {
        switch (reactType.toLowerCase()) {
            case "like": return "like";
            case "love": return "love";
            case "care": return "care";
            case "haha": return "haha";
            case "wow": return "wow";
            case "sad": return "sad";
            case "angry": return "angry";
            default: return "none";
        }
    }

    // Handle reactions listener
    private void createReactionsListener(AtomicBoolean isReacted, String reactType, AtomicLong totalReacts,
                                         ArtworkFeedDTO artwork, String colorTheme, SvgIcon likeIcon, SvgIcon loveIcon, SvgIcon careIcon, SvgIcon hahaIcon, SvgIcon wowIcon, SvgIcon sadIcon, SvgIcon angryIcon) {
        User user = userService.findCurrentUser();

        if (!isReacted.get()) {
            addReaction(artwork, user, reactType, totalReacts, colorTheme, true);
            isReacted.set(true);
        } else {
            handleExistingReaction(artwork, user, reactType, totalReacts, colorTheme, isReacted);
        }

        List<PostReactionDTO> reactions = postReactionService.getReactionsDTO(artwork.getArtworkId());

        if (reactions.isEmpty()) {
            reacts.setText("");
        } else {
            reacts.setText(formatValue(reactions.size(), true));
        }

        // Update reactions visibility
        updateReactionsVisibility(reactions, likeIcon, loveIcon, careIcon, hahaIcon, wowIcon, sadIcon, angryIcon);
    }

    private void addReaction(ArtworkFeedDTO artwork, User user, String reactType, AtomicLong totalReacts, String colorTheme, boolean isHold) {
    	Artwork _artwork = artworkService.getArtworkById(artwork.getArtworkId());
        postReactionService.savePostReaction(_artwork, user, reactType);
        updateReactionCount(totalReacts.incrementAndGet());
        setReactionIcon(likeButton, colorTheme);
        notificationService.createReactNotification(user, _artwork);

        if (!isHold) {
            setReactionIcon(likeButton, "primary");
        }
    }

    private void handleExistingReaction(ArtworkFeedDTO artwork, User user, String reactType, AtomicLong totalReacts, String colorTheme, AtomicBoolean isReacted) {
        Long reactorId = user.getId();
        Long artworkId = artwork.getArtworkId();
        PostReaction reactor = postReactionService.getPostReactionByReactorAndArtworkId(reactorId, artworkId);

        if (reactor.getReactType().equalsIgnoreCase(reactType)) {
            removeReaction(reactorId, artworkId, totalReacts);
            isReacted.set(false);
        } else {
            updateReaction(reactor, reactType, colorTheme);
            isReacted.set(true);
        }
    }

    private void removeReaction(Long reactorId, Long artworkId, AtomicLong totalReacts) {
        postReactionService.removePostReaction(reactorId, artworkId);
        updateReactionCount(totalReacts.decrementAndGet());

        SvgIcon likeIcon = new SvgIcon(new StreamResource("like.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/like.svg")));
        likeButton.setIcon(likeIcon);
    }

    private void updateReaction(PostReaction reactor, String reactType, String colorTheme) {
        postReactionService.updatePostReaction(reactor, reactType);
        setReactionIcon(likeButton, colorTheme);
    }

    private void updateReactionCount(long count) {
        String formattedValue = count > 0 ? formatValue(count, false) : "";
        likeButton.setText(formattedValue);
        reacts.setText(formattedValue);
    }

    private void setReactionIcon(Button button, String reactType) {
        Map<String, SvgIcon> reactionIcons = Map.of(
            "like", new SvgIcon(new StreamResource("like.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/like.svg"))),
            "love", new SvgIcon(new StreamResource("love.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/love.svg"))),
            "care", new SvgIcon(new StreamResource("care.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/care.svg"))),
            "haha", new SvgIcon(new StreamResource("haha.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/haha.svg"))),
            "wow", new SvgIcon(new StreamResource("wow.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/wow.svg"))),
            "sad", new SvgIcon(new StreamResource("sad.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/sad.svg"))),
            "angry", new SvgIcon(new StreamResource("angry.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/angry.svg")))
        );

        SvgIcon icon = reactionIcons.getOrDefault(reactType, new SvgIcon(new StreamResource("like.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/like.svg"))));
        button.setIcon(icon);
    }

    private String formatValue(long value, boolean includeDecimal) {
        if (value >= 1_000_000_000) {
            return formatWithSuffix(value / 1_000_000_000.0, "B", includeDecimal);
        } else if (value >= 1_000_000) {
            return formatWithSuffix(value / 1_000_000.0, "M", includeDecimal);
        } else if (value >= 1_000) {
            return formatWithSuffix(value / 1_000.0, "K", includeDecimal);
        } else {
            return String.valueOf(value);
        }
    }

    private String formatWithSuffix(double number, String suffix, boolean includeDecimal) {
        if (includeDecimal) {
            String formatted = String.format("%.1f", Math.floor(number * 10) / 10);
            return formatted.endsWith(".0") ? formatted.substring(0, formatted.length() - 2) + suffix : formatted + suffix;
        } else {
            return String.format("%.0f%s", Math.floor(number), suffix);
        }
    }
}
