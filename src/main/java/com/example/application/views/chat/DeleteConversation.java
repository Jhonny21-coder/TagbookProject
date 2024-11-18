package com.example.application.views.chat;

import com.example.application.data.Conversation;
import com.example.application.services.ConversationService;

public class DeleteConversation {
    public static void markConversationAsDeleted(Conversation conversation, Long currentUserId, ConversationService conversationService) {
        if (currentUserId.equals(conversation.getUser1().getId())) {
            conversation.setDeletedByUser1(true);
        } else {
            conversation.setDeletedByUser2(true);
        }
	conversationService.updateConversation(conversation);
    }
}
