package com.example.application.views.chat.utils;

import com.example.application.data.Block;
import com.example.application.data.User;
import com.example.application.data.Conversation;
import com.example.application.data.ChatMessage;
import com.example.application.services.ConversationService;
import com.example.application.services.ChatMessageService;
import com.example.application.services.chat.MuteService;
import com.example.application.services.UserServices;
import com.example.application.services.BlockService;
import com.example.application.views.chat.ChatUtils;

import com.example.application.views.chat.DeleteConversation;
import com.example.application.views.BottomSheet;
import com.example.application.views.chat.BlockView;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.data.value.ValueChangeMode;

import java.time.LocalDateTime;
import java.time.Duration;
import java.util.List;

public class MessageBottomSheet {

    private final ConversationService conversationService;
    private final ChatMessageService chatService;
    private final MuteService muteService;
    private final BottomSheet sheet;
    private final BottomSheet muteSheet;
    private final BottomSheet customDurationSheet;
    private final Div messagesLayout;
    private final UserServices userService;
    private final BlockService blockService;

    public MessageBottomSheet(BottomSheet sheet, BottomSheet muteSheet, BottomSheet customDurationSheet, UserServices userService, ConversationService conversationService, ChatMessageService chatService, MuteService muteService, BlockService blockService, Div messagesLayout) {
    	this.userService = userService;
    	this.conversationService = conversationService;
    	this.chatService = chatService;
    	this.muteService = muteService;
    	this.blockService = blockService;
    	this.sheet = sheet;
    	this.muteSheet = muteSheet;
    	this.customDurationSheet = customDurationSheet;
    	this.messagesLayout = messagesLayout;
    }

    // Method to show options for hold event
    public void showBottomSheet(User sender, User receiver, Div messageDiv, Conversation conversation, Icon mutedIcon, Span messageSpan, Span otherUserFullName, Div unseenDiv, List<ChatMessage> unseenMessages) {
        Long conversationId = conversation.getId();
	User blocker = userService.findCurrentUser();
	boolean isRead = conversationService.isReadByUser(conversationId, receiver);
        boolean isBlocked = blockService.isMessageOrFullBlocked(blocker, sender, Block.BlockType.MESSAGES_ONLY);

	Div unreadDiv = createUnreadDiv(isRead, conversationId, messageSpan, receiver, unseenMessages, unseenDiv, otherUserFullName);
	Div muteDiv = createMuteDiv(conversation, receiver, mutedIcon);
        Div archiveDiv = createArchiveDiv(conversation, receiver, messageDiv);
        Div deleteDiv = createDeleteDiv(messageDiv, conversation, receiver);
        Div blockDiv = createBlockDiv(sender, isBlocked);

        Div mainDiv = new Div(
            new Span(), unreadDiv, muteDiv, archiveDiv,
	    isBlocked ? blockDiv : deleteDiv,
            !isBlocked ? blockDiv : deleteDiv
	);
        mainDiv.addClassName("message-request-options");
        sheet.removeAllContent();
        sheet.addContent(mainDiv);
        sheet.open();
    }

    // Method to create a div reading or unreading the conversation
    private Div createUnreadDiv(boolean isRead, Long conversationId, Span messageSpan, User receiver, List<ChatMessage> unseenMessages, Div unseenDiv, Span otherUserFullName) {
    	Div unreadDiv = new Div(new Icon("vaadin", "envelope"), new Span(isRead ? "Mark as unread" : "Mark as Read"));
        unreadDiv.addClickListener(event -> {
            String textColor = !isRead ? "var(--secondary)" : "white";
            String textShadow = !isRead ? "none" : "0.5px 0.5px white";
            messageSpan.getStyle().set("color", textColor)
                                  .set("text-shadow", textShadow);

            String fullNameShadow = !isRead ? "none" : "0.5px 0.5px currentColor";
            otherUserFullName.getStyle().set("text-shadow", fullNameShadow);

            conversationService.setReadByUser(conversationId, receiver, !isRead);

            if (!isRead) {
                if (!unseenMessages.isEmpty()) {
                    chatService.markUnseenMessagesAsSeen(unseenMessages);
                }
                unseenDiv.setVisible(false);
            } else {
                unseenDiv.setVisible(true);
                unseenDiv.setText(String.valueOf(1));
            }
            sheet.close();
        });
        return unreadDiv;
    }

    // Method to create a div for mute
    private Div createMuteDiv(Conversation conversation, User receiver, Icon mutedIcon) {
    	Long conversationId = conversation.getId();

    	boolean isMuted = isMuted(conversationId, receiver);
        String muteStatus = isMuted ? "Unmute" : "Mute";
        String muteIconName = isMuted ? "bell-slash" : "bell";

        Duration muteDuration = getDurationTime(conversation, receiver);
        LocalDateTime muteStartTime = getMuteStartTime(conversation, receiver);

        Div muteDiv = new Div(new Div(new Icon("vaadin", muteIconName), new Span(muteStatus)));
        muteDiv.addClickListener(event -> {
            sheet.close();
            if (isMuted) {
                muteService.unmuteConversation(conversationId, receiver);
                mutedIcon.setVisible(false);
            } else {
                showMuteNotificationsOptions(conversationId, receiver, mutedIcon);
            }
        });
        return muteDiv;
    }

    // Method to create a div for archive
    private Div createArchiveDiv(Conversation conversation, User receiver, Div messageDiv) {
    	Long conversationId = conversation.getId();

    	// Check if the conversation is currently archived by user
        boolean isArchived = ChatUtils.isConversationArchivedByCurrentUser(conversation, receiver);

        String archiveText = isArchived ? "Unarchive" : "Archive";

    	Div archiveDiv = new Div(new Icon("vaadin", "archive"), new Span(archiveText));
        archiveDiv.addClickListener(event -> {
            messagesLayout.remove(messageDiv);

            if (isArchived) {
            	conversationService.unarchiveConversationForUser(conversationId, receiver);
            } else {
            	conversationService.archiveConversationForUser(conversationId, receiver);
            }

            List<Conversation> archivedConversations = conversationService.getArchivedConversations(receiver);

	    if (archivedConversations.isEmpty()) {
		messagesLayout.add(createEmptyMessages());
            }
            sheet.close();
        });
        return archiveDiv;
    }

    // Method to create an empty messages for archive
    private Div createEmptyMessages() {
        Icon paperplaneIcon = new Icon("vaadin", "paperplane");
        Span message1 = new Span("Your archive is empty");
        Span message2 = new Span("Archiving keeps chats out the way without deleting them.");
        Div messageDiv = new Div(paperplaneIcon, message1, message2);
        messageDiv.addClassName("message-request-empty-div");
        return messageDiv;
   }

    // Method to create a div for deleting the conversation
    private Div createDeleteDiv(Div messageDiv, Conversation conversation, User receiver) {
    	Icon deleteIcon = new Icon("vaadin", "trash");
        deleteIcon.getStyle().set("color", "var(--sheet-error-color)");

        Div deleteDiv = new Div(deleteIcon, new Span("Delete conversation"));
        deleteDiv.addClickListener(event -> {
            Dialog deleteDialog = createDeleteDialog(messageDiv, conversation, receiver);
            deleteDialog.open();
            sheet.close();
        });
    	return deleteDiv;
    }

    // Method to create a div for blocking other user in a conversation
    private Div createBlockDiv(User sender, boolean isBlocked) {
    	Icon minusIcon = new Icon("vaadin", "minus-circle");
        minusIcon.getStyle().set("color", isBlocked ? "" : "var(--sheet-error-color)");

        String fullName = truncate(sender.getFullName(), 24);
        String actionText = isBlocked ? "Unblock " : "Block " + fullName;
        Div blockDiv = new Div();
        blockDiv.add(minusIcon, new Span(actionText));
        blockDiv.addClickListener(event -> {
            VaadinSession.getCurrent().getSession().setAttribute("message", sender.getId());
            UI.getCurrent().navigate(BlockView.class, sender.getId());
        });
        return blockDiv;
    }

    // Method to show mute duration options
    private void showMuteNotificationsOptions(Long conversationId, User currentUser, Icon mutedIcon/*VisualTimer visualTimer*/) {
        Span headerSpan = new Span("Mute notifications for this conversation");
        headerSpan.addClassName("message-mute-header");

        // Create separate RadioButtonGroups for each option
        RadioButtonGroup<String> radio15Minutes = new RadioButtonGroup<>("", "");
        RadioButtonGroup<String> radio1Hour = new RadioButtonGroup<>("", "");
        RadioButtonGroup<String> radio8Hours = new RadioButtonGroup<>("", "");
        RadioButtonGroup<String> radio24Hours = new RadioButtonGroup<>("", "");
        RadioButtonGroup<String> radioPermanent = new RadioButtonGroup<>("", "");
        RadioButtonGroup<String> radioCustom = new RadioButtonGroup<>("", "");

        // Disable direct user selection on radio buttons (handled via spans instead)
        radio15Minutes.setValue("");
        radio15Minutes.setEnabled(false);
        radio1Hour.setEnabled(false);
        radio8Hours.setEnabled(false);
        radio24Hours.setEnabled(false);
        radioPermanent.setEnabled(false);
        radioCustom.setEnabled(false);

        // Create clickable spans for each option, each toggling its corresponding radio button
        Span for15MinutesDiv = createMuteOptionSpan("For 15 minutes", radio15Minutes, radio15Minutes, radio1Hour, radio8Hours, radio24Hours, radioPermanent, radioCustom);
        Span for1HourDiv = createMuteOptionSpan("For 1 hour", radio1Hour, radio15Minutes, radio1Hour, radio8Hours, radio24Hours, radioPermanent, radioCustom);
        Span for8HoursDiv = createMuteOptionSpan("For 8 hours", radio8Hours, radio15Minutes, radio1Hour, radio8Hours, radio24Hours, radioPermanent, radioCustom);
        Span for24HoursDiv = createMuteOptionSpan("For 24 hours", radio24Hours, radio15Minutes, radio1Hour, radio8Hours, radio24Hours, radioPermanent, radioCustom);
        Span forPermanentDiv = createMuteOptionSpan("Until I turn it back", radioPermanent, radio15Minutes, radio1Hour, radio8Hours, radio24Hours, radioPermanent, radioCustom);
        Span forCustomDiv = createMuteOptionSpan("Custom", radioCustom, radio15Minutes, radio1Hour, radio8Hours, radio24Hours, radioPermanent, radioCustom);

        // Button to confirm selection
        Button okayButton = new Button("Ok", event -> {
            String selectedOption = getSelectedOption(radio15Minutes, radio1Hour, radio8Hours, radio24Hours, radioPermanent, radioCustom);
            if (selectedOption != null) {
                MuteService.MuteDuration duration = switch (selectedOption) {
                    case "For 15 minutes" -> MuteService.MuteDuration.FIFTEEN_MINUTES;
                    case "For 1 hour" -> MuteService.MuteDuration.ONE_HOUR;
                    case "For 8 hours" -> MuteService.MuteDuration.EIGHT_HOURS;
                    case "For 24 hours" -> MuteService.MuteDuration.TWENTY_FOUR_HOURS;
                    case "Until I turn it back" -> MuteService.MuteDuration.PERMANENT;
                    case "Custom" -> {
                        showCustomDurationSelector(conversationId, currentUser, mutedIcon); // Open custom duration selector
                        yield null; // Exit here to wait for user to set custom duratiol
                    }
                    default -> null;
                };

                if (duration != null) {
                    muteService.muteConversation(conversationId, currentUser, duration);
                    mutedIcon.setVisible(true);
                }
            }
            muteSheet.close();
        });

        // Layout to hold all components
        Div muteMainLayout = new Div(new Span(), headerSpan, for15MinutesDiv, for1HourDiv, for8HoursDiv, for24HoursDiv, forPermanentDiv, forCustomDiv, okayButton);
        muteMainLayout.addClassName("message-mute-main-layout");

        // Adding header and main layout to the bottom sheet
        muteSheet.removeAllContent();
        muteSheet.addContent(muteMainLayout);
        muteSheet.open();
    }

    private void showCustomDurationSelector(Long conversationId, User currentUser, Icon mutedIcon) {
        // Header
        Span headerSpan = new Span("Set custom mute duration");

        // Span for displaying duration and unit
        Span unitValueSpan = new Span();
        unitValueSpan.setVisible(false);
        unitValueSpan.addClassName("custom-mute-unit-value");

        // NumberField for the duration value
        IntegerField durationField = createDurationField();

        // RadioButtonGroup for duration unit
        RadioButtonGroup<String> unitRadio = createUnitRadio(durationField, unitValueSpan);

        // Button to confirm the custom duration
        Button confirmButton = createConfirmButton(conversationId, currentUser, mutedIcon, durationField, unitValueSpan, unitRadio);

        // Layout to hold components
        VerticalLayout layout = new VerticalLayout(headerSpan, durationField, new Div(unitRadio), unitValueSpan, confirmButton);
        layout.addClassName("custom-mute-layout");

        // Add layout to the BottomSheet
        customDurationSheet.removeAllContent();
        customDurationSheet.addContent(layout);
        // Open sheet for custom duration
        customDurationSheet.open();
    }

    // Methos to create an integer field for duration
    private IntegerField createDurationField() {
        IntegerField durationField = new IntegerField("Duration", "Enter number"); // Label and placeholder
        durationField.setValueChangeMode(ValueChangeMode.EAGER); // Immediate updates
        durationField.setMin(1); // Minimum of 1
        durationField.setHelperText("Must be a positive number greater than zero."); // Helper text to clarify user
        durationField.addValueChangeListener(event -> {
            if (event.getValue() != null && event.getValue() < 1) {
                durationField.setValue(1);
            }
        });
        return durationField;
    }

    // Method to create a radio for duration unit
    private RadioButtonGroup<String> createUnitRadio(IntegerField durationField, Span unitValueSpan) {
        return new RadioButtonGroup<>("Time Unit", e -> {
            Integer value = durationField.getValue();
            unitValueSpan.getElement().getThemeList().remove("badge");
            unitValueSpan.setVisible(value != null ? true : false);

            if (value != null) {
                String unit = e.getValue();
                unitValueSpan.setText(value + " " + unit.toLowerCase());
            }
        }, "Minutes", "Hours", "Days", "Months"); // Items
    }

    // Method to create a button to cofirm custom mute duration
    private Button createConfirmButton(Long conversationId, User currentUser, Icon mutedIcon, IntegerField durationField, Span unitValueSpan, RadioButtonGroup<String> unitRadio) {
        return new Button("Set Duration", event -> {
            unitValueSpan.setVisible(true);
            Integer value = durationField.getValue();
            String unit = unitRadio.getValue();

            if (value == null || unit == null) {
                unitValueSpan.setText(
                    value == null && unit == null ? "Please enter both duration and time unit." :
                    value == null ? "Please enter duration." : "Please select a unit."
                );
                unitValueSpan.getElement().getThemeList().add("badge error");
                return;
            }

            Duration customDuration = getCustomDurationByUnit(unit, value);

            MuteService.MuteDuration.setCustomDuration(customDuration);
            muteService.muteConversation(conversationId, currentUser, MuteService.MuteDuration.CUSTOM);
            mutedIcon.setVisible(true);
            customDurationSheet.close();
        });
    }

    // Helper method for custom mute confirm button to get duration by unit
    private Duration getCustomDurationByUnit(String unit, Integer value) {
        return switch (unit) {
            case "Minutes" -> Duration.ofMinutes(value);
            case "Hours" -> Duration.ofHours(value);
            case "Days" -> Duration.ofDays(value);
            case "Months" -> Duration.ofDays(value * 30);
            default -> Duration.ZERO;
        };
    }

    // Helper method to create a span for each mute option and handle selection
    private Span createMuteOptionSpan(String label, RadioButtonGroup<String> selectedRadio, RadioButtonGroup<String>... allRadios) {
        Span optionSpan = new Span(label);
        optionSpan.addClassName("mute-option");

        Span parentSpan = new Span(optionSpan, selectedRadio);
        // On click, select this radio button and clear others
        parentSpan.addClickListener(event -> {
            for (RadioButtonGroup<String> radio : allRadios) {
                radio.setValue(null); // Unselect all radios
            }
            selectedRadio.setValue(""); // Select the target radio button
        });

        // Wrap the radio button in the span so it displays inline
        return parentSpan;
    }

    // Helper method to get the selected option label
    private String getSelectedOption(RadioButtonGroup<String>... radios) {
        if (radios[0].getValue() != null) return "For 15 minutes";
        if (radios[1].getValue() != null) return "For 1 hour";
        if (radios[2].getValue() != null) return "For 8 hours";
        if (radios[3].getValue() != null) return "For 24 hours";
        if (radios[4].getValue() != null) return "Until I turn it back";
        if (radios[5].getValue() != null) return "Custom";
        return null;
    }

    // Creates a dialog to confirm deleting of conversation
    private Dialog createDeleteDialog(Div messageDiv, Conversation conversation, User receiver) {
        Dialog dialog = new Dialog();
        dialog.addClassName("block-dialog");

        Span headerText = new Span("Delete this entire conversation?");
        Span mainText = new Span("Once you delete your copy of the conversation, it can't be undone.");

        // Cancel and action buttons for the dialog
        Button cancelButton = new Button("CANCEL", e -> dialog.close());
        Button deleteButton = new Button("DELETE", e -> {
            messagesLayout.remove(messageDiv);
            deleteConversation(conversation, receiver);
            dialog.close();
        });

        Div buttonContainer = new Div(cancelButton, deleteButton);
        dialog.add(headerText, mainText, buttonContainer);

        return dialog;
    }

    // Method to delete a conversation for specific user
    private void deleteConversation(Conversation conversation, User receiver) {
        DeleteConversation.markConversationAsDeleted(conversation, receiver.getId(), conversationService);
        List<Conversation> updatedConversations = conversationService.getConversationsForUser(receiver);

        if (updatedConversations.isEmpty()) {
        }
    }

    // Method to truncate long texts
    private String truncate(String text, int length) {
        return text.length() > length ? text.substring(0, length) + "…" : text;
    }

    private LocalDateTime getMuteStartTime(Conversation conversation, User user) {
        if (conversation.getUser1().equals(user)) {
            return conversation.getMuteStartTimeUser1();
        } else {
            return conversation.getMuteStartTimeUser2();
        }
    }

    private Duration getDurationTime(Conversation conversation, User user) {
        if (conversation.getUser1().equals(user)) {
            return conversation.getMuteDurationUser1();
        } else {
            return conversation.getMuteDurationUser2();
        }
    }

    private boolean isMuted(Long conversationId, User user) {
        return muteService.isConversationMuted(conversationId, user);
    }
}
