package com.example.application.views;

import com.example.application.data.dto.post.ArtworkFeedDTO;

import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.Component;

public class ViewPostImage extends AppLayout {

    private final Component component;
    private final ArtworkFeedDTO artwork;

    public ViewPostImage(Component component, ArtworkFeedDTO artwork) {
    	this.component = component;
    	this.artwork = artwork;
    	createHeader();
    }

    public void open() {
    	component.getElement().appendChild(this.getElement());
    }

    public void close() {
        component.getElement().removeChild(this.getElement());
    }

    /*private void createFooter() {
    	Div userLayout = new Div(
    	   new Span(artwork.getUserFullName()),
    	   new Div(
    	   	new Span(formatValue(artwork.getPostTimestamp())),
    	   	new Span("•"),
    	   	new Icon("vaadin", "globe")
    	   )
    	);

    	Div totalReactions = new Div(mostReactions);

    	Div buttonsLayout = new Div(likeButton, commentButton, shareButton);

    	Div mainLayout = new Div(userLayout, totalReactions, buttonsLayout);
    	mainLayout.addClassName("view-post-image-footer");

    	addToNavbar(true, mainLayout);
    }*/

    private void createHeader() {
    	Icon closeIcon = new Icon("lumo", "cross");
    	closeIcon.addClickListener(event -> close());

    	Icon moreIcon = new Icon("vaadin", "ellipsis-h-o");

    	HorizontalLayout headerLayout = new HorizontalLayout(closeIcon, moreIcon);
    	headerLayout.addClassName("view-post-image-header");

    	addToNavbar(headerLayout);
    }
}
