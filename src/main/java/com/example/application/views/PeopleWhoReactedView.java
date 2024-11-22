package com.example.application.views;

import com.example.application.data.dto.post.PostReactionDTO;
import com.example.application.data.PostReaction;
import com.example.application.services.PostReactionService;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.SvgIcon;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.TabSheet;
import com.vaadin.flow.component.tabs.TabSheetVariant;
import com.vaadin.flow.function.SerializableSupplier;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.server.StreamResource;
import org.springframework.data.domain.Page;

import java.util.Map;
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.stream.Collectors;
import java.util.concurrent.ConcurrentHashMap;

public class PeopleWhoReactedView extends AppLayout {
    private final PostReactionService postService;
    private final Long artworkId;
    private final FormLayout formLayout;

    private List<PostReactionDTO> reactions = new ArrayList<>();
    private Map<String, Long> reactionCounts; // Number of reaction counts for each reaction type
    private int pageSize = 30; // Number of reactions per page
    private Map<String, Integer> currentPages = new HashMap<>(); // Track current page per reactType

    public PeopleWhoReactedView(FormLayout formLayout, Long artworkId, PostReactionService postService) {
    	this.formLayout = formLayout;
    	this.artworkId = artworkId;
    	this.postService = postService;
    	addClassName("people-reacted-app-layout");
    	getStyle().set("transform", "translateY(0)").set("position", "fixed").set("top", "0").set("bottom", "0").set("left", "0").set("right", "0").set("width", "100vw").set("z-index", "99999").set("background", "var(--primary)");

	createHeader();
	loadReactionCounts();

	TabSheet tabSheet = new TabSheet();
	tabSheet.addClassName("people-reacted-tabsheet");

	initializeTabs(tabSheet);
	setContent(tabSheet);
    }

    private void loadReactionCounts() {
    	reactionCounts = postService.getReactionCountsByArtworkId(artworkId);
    }

    private void initializeTabs(TabSheet tabSheet) {
    	long totalReactions = postService.getTotalReactionsByArtworkId(artworkId);
    	tabSheet.add(
            new Div(new Span("All"), new Span(formatValue(totalReactions, true))),
            new LazyComponent(() -> createPaginatedContent("all"))
    	);

    	List<String> sortedReactTypes = reactionCounts.entrySet().stream()
            .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());

        sortedReactTypes.forEach(reactType -> {
            if (reactionCounts.get(reactType) > 0) {
                tabSheet.add(
                    new Div(getIcon(reactType), new Span(formatValue(reactionCounts.get(reactType), true))),
                    new LazyComponent(() -> createPaginatedContent(reactType))
                );
            }
        });
    }

    private Div createPaginatedContent(String reactType) {
    	Div content = new Div();
    	CustomEvent.handleScrollEvent(content);
    	content.addClassName("people-reacted-div");
    	content.getElement().addEventListener("scroll-to-bottom", e -> loadMoreReactions(content, reactType));
    	loadMoreReactions(content, reactType); // Initial load
    	return content;
    }

    private void loadMoreReactions(Div content, String reactType) {
    	int currentPage = currentPages.getOrDefault(reactType, 0);
    	List<PostReactionDTO> reactions = postService.findReactionDTOsByArtworkIdAndType(
             artworkId, reactType.equals("all") ? null : reactType, pageSize, currentPage
    	).getContent();

    	reactions.forEach(reaction -> content.add(createReactionComponent(reaction)));
    	currentPages.put(reactType, currentPage + 1);
    }

    private Div createReactionComponent(PostReactionDTO reaction) {
    	Div reactionDiv = new Div();

        Avatar avatar = new Avatar("", reaction.getUserProfileImage());
        Span fullNameSpan = new Span(reaction.getUserFullName());
        SvgIcon tabSheetIcon = getIcon(reaction.getReactType());

        reactionDiv.add(new Div(avatar, tabSheetIcon), fullNameSpan);
	return reactionDiv;
    }

    private SvgIcon getIcon(String reactType) {
        Map<String, SvgIcon> reactionIcons = Map.of(
            "like", new SvgIcon(new StreamResource("like.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/like.svg"))),
            "love", new SvgIcon(new StreamResource("love.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/love.svg"))),
            "care", new SvgIcon(new StreamResource("care.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/care.svg"))),
            "haha", new SvgIcon(new StreamResource("haha.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/haha.svg"))),
            "wow", new SvgIcon(new StreamResource("wow.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/wow.svg"))),
            "sad", new SvgIcon(new StreamResource("sad.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/sad.svg"))),
            "angry", new SvgIcon(new StreamResource("angry.svg", () -> getClass().getResourceAsStream("/META-INF/resources/icons/angry.svg")))
        );

        SvgIcon icon = reactionIcons.getOrDefault(reactType, new SvgIcon(new StreamResource("like.svg",
        	() -> getClass().getResourceAsStream("/META-INF/resources/icons/like.svg"))));
        return icon;
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

    public void open() {
    	formLayout.add(this);
    }

    private void createHeader() {
        Icon backIcon = new Icon("lumo", "arrow-left");
        backIcon.addClassName("header-back-button");
        backIcon.addClickListener(event -> {
            formLayout.remove(this);
        });

        HorizontalLayout headerLayout = new HorizontalLayout(backIcon, new Span("People who reacted"));
        headerLayout.addClassName("message-settings-header-layout");

        addToNavbar(headerLayout);
   }

   public class LazyComponent extends Div {
        public LazyComponent(
                SerializableSupplier<? extends Component> supplier) {
            addAttachListener(e -> {
                if (getElement().getChildCount() == 0) {
                    add(supplier.get());
                }
            });
        }
    }
}
