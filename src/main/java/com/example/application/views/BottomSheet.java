package com.example.application.views;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

/*
 * Custom BottomSheet component to simulate a bottom sheet UI component with modal and non-modal behavior.
 * This component displays content from the bottom of the screen, often used for actions, options, or additional information.
 */
public class BottomSheet extends VerticalLayout {

    private final Div content = new Div(); // Main content area of the BottomSheet
    private final Div clickArea = new Div(); // Click area overlay for dismissing or interacting with BottomSheet
    private boolean modal = false; // Determines if BottomSheet is modal (click outside won't close it)
    private boolean isAnimating = false; // Tracks animation state to prevent action during animation

    /*
     * Constructs a BottomSheet component with default styling and behavior.
     * The BottomSheet is initially hidden and positioned off-screen.
     */
    public BottomSheet() {
        setVisible(false); // Hidden initially

        // Styles for BottomSheet overlay and positioning
        getStyle()
                .set("display", "flex")
                .set("position", "absolute")
                .set("bottom", "0")
                .set("left", "0")
                .set("height", "100%")
                .set("z-index", "9999")
                .set("background", "var(--lumo-shade-50pct)");

        // Styles for clickArea, used to detect clicks outside of content
        clickArea.setVisible(false); // Hidden initially
        clickArea.getStyle()
                .set("position", "fixed")
                .set("left", "0")
                .set("right", "0")
                .set("height", "100vh");

        // Default click behavior: close the BottomSheet when clickArea is clicked (if not modal)
        clickArea.addClickListener(event -> {
            if (!modal) {
                close(true);
            }
        });

        // Styles for content area
        content.getStyle()
                .set("transform", "translateY(100%)") // Initially off-screen
                .set("transition", "transform 0.3s ease-in-out") // Smooth transition for open/close
                .set("position", "fixed")
                .set("bottom", "0")
                .set("left", "0")
                .set("right", "0")
                .set("width", "100vw")
                .set("height", "auto")
                .set("background", "#242527") // Background color
                .set("border-top-left-radius", "15px")
                .set("border-top-right-radius", "15px");

        // Add the click area and content area to the BottomSheet component
        add(clickArea, content);
    }

    /*
     * Adds components to the content area of the BottomSheet.
     *
     * @param components Components to be added to the BottomSheet's content area.
     */
    public void addContent(Component... components) {
        content.add(components);
    }

    /*
     * Opens the BottomSheet with animation by default.
     */
    public void open() {
        open(true);
    }

    /*
     * Opens the BottomSheet.
     *
     * @param animate If true, opens with animation; otherwise, opens instantly.
     */
    public void open(boolean animate) {
        if (animate) {
            isAnimating = true; // Mark animation start
            content.getStyle().set("transform", "translateY(0)"); // Move content to visible position
            // Reset isAnimating to false after animation duration (300ms)
            content.getElement().executeJs("setTimeout(() => $0.isAnimating = false, 300)", content);
        }
        setVisible(true);
        clickArea.setVisible(true); // Make click area visible
    }

    /*
     * Closes the BottomSheet with animation by default.
     */
    public void close() {
        close(true);
    }

    /*
     * Closes the BottomSheet.
     *
     * @param animate If true, closes with animation; otherwise, closes instantly.
     */
    public void close(boolean animate) {
        if (animate) {
            isAnimating = true; // Mark animation start
            content.getStyle().set("transform", "translateY(100%)"); // Move content off-screen
            // Reset isAnimating to false after animation duration (300ms)
            content.getElement().executeJs("setTimeout(() => $0.isAnimating = false, 300)", content);
        }
        setVisible(false);
        clickArea.setVisible(false); // Hide click area
    }

    /*
     * Configures whether the BottomSheet should behave as a modal.
     * In modal mode, clicking outside the content area won't close the BottomSheet.
     *
     * @param isModal True to enable modal behavior; false otherwise.
     */
    public void setModal(boolean isModal) {
        this.modal = isModal;
        clickArea.setEnabled(isModal);
    }

    /*
     * Checks if the BottomSheet is in modal mode.
     *
     * @return True if BottomSheet is modal; false otherwise.
     */
    public boolean isModal() {
        return modal;
    }

    /*
     * Removes specific components from the BottomSheet's content area.
     *
     * @param components Components to be removed.
     */
    public void removeContent(Component... components) {
        content.remove(components);
    }

    /*
     * Removes all components from the BottomSheet's content area.
     */
    public void removeAllContent() {
        content.removeAll();
    }

    /*
     * Adds a custom click listener for the click area.
     * This allows external classes to handle click events on the click area directly.
     *
     * @param listener The custom click listener for click area events or closing the sheet.
     */
    /*public void addCloseListener(ComponentEventListener<ClickEvent<Div>> listener) {
        clickArea.addClickListener(listener);
    }*/
}
