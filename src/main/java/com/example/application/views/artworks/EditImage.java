package com.example.application.views.artworks;

import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.Component;

public class EditImage extends FormLayout {

    private final FormLayout parent;

    public EditImage(FormLayout parent) {
    	this.parent = parent;
    	getStyle().set("transform", "translateY(0)")
                  .set("position", "fixed")
                  .set("top", "0")
                  .set("bottom", "0")
                  .set("left", "0")
                  .set("right", "0");
    }

    public void addContent(Component content) {
    	add(content);
    }

    public void setHeader(Component header) {
    	header.addClassName("edit-image-header-component");
    	add(header);
    }

    public void setFooter(Component footer) {
    	footer.addClassName("edit-image-footer-component");
        add(footer);
    }

    public void open() {
    	parent.add(this);
    }

    public void close() {
    	parent.remove(this);
    }
}
