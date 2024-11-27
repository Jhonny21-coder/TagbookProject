package com.example.application.views.utils;

import com.vaadin.flow.component.UI;
import com.example.application.views.BottomSheet;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;

public class PostUtils {

    public PostUtils() {
    }

    public BottomSheet createCopyTextSheet(String text) {
    	BottomSheet sheet = new BottomSheet();

    	Div copyTextDiv = new Div(new Icon("vaadin", "copy"), new Span("Copy text"));
    	copyTextDiv.addClickListener(e -> {
    	   copyToClipboard(text);
    	   sheet.close();
    	   Notification.show("Text copied to clipboard", 1000, Notification.Position.BOTTOM_STRETCH);
    	});

    	Div copyDiv = new Div(new Div(), copyTextDiv);
    	copyDiv.addClassName("copy-div");

    	sheet.addContent(copyDiv);
    	return sheet;
    }

    private void copyToClipboard(String text) {
        String jsCode = "navigator.clipboard.writeText('" + text + "').then(function() { "
                + "console.log('Copying to clipboard was successful!'); "
                + "}, function(err) { "
                + "	console.error('Could not copy text: ', err); "
                + "});";
        UI.getCurrent().getPage().executeJs(jsCode);
    }
}
