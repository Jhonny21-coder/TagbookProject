package com.example.application.views.chat;

import com.example.application.data.User;
import com.example.application.data.Conversation;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class ChatUtils {

    // Method to format the time in a conversation
    public static String formatDateTime(LocalDateTime timestamp) {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Manila"));

        // Check if it's today
        if (timestamp.toLocalDate().equals(now.toLocalDate())) {
            return timestamp.format(DateTimeFormatter.ofPattern("h:mm a"));
        }

        // Check if it was yesterday
        if (timestamp.toLocalDate().equals(now.minus(1, ChronoUnit.DAYS).toLocalDate())) {
            return "YESTERDAY AT " + timestamp.format(DateTimeFormatter.ofPattern("h:mm a"));
        }

        // For older messages, show full date and time
        return timestamp.format(DateTimeFormatter.ofPattern("MMM d 'AT' h:mm a")).toUpperCase();
    }

    // Method to check if a conversation is deleted
    public static boolean isConversationDeletedByCurrentUser(Conversation conversation, User currentUser) {
        return (conversation.getUser1().equals(currentUser) && conversation.isDeletedByUser1()) ||
               (conversation.getUser2().equals(currentUser) && conversation.isDeletedByUser2());
    }

    // Method to check if a conversation is archived
    public static boolean isConversationArchivedByCurrentUser(Conversation conversation, User currentUser) {
        return (conversation.getUser1().equals(currentUser) && conversation.isArchivedForUser1()) ||
               (conversation.getUser2().equals(currentUser) && conversation.isArchivedForUser2());
    }

    // Consolidated method to check if the conversation should be visible to the current user
    public static boolean isConversationVisibleToCurrentUser(Conversation conversation, User user) {
        // Check if the conversation is a message request, deleted, or archived
        return !conversation.isMessageRequest() &&
               !isConversationDeletedByCurrentUser(conversation, user) &&
               !isConversationArchivedByCurrentUser(conversation, user);
    }

    // Method to truncate long texts
    public static String truncate(String text, int length) {
        return text.length() > length ? text.substring(0, length) + "…" : text;
    }
}
