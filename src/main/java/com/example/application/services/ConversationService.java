package com.example.application.services;

import com.example.application.repository.ConversationRepository;
import com.example.application.data.User;
import com.example.application.data.dto.conversation.ConversationUserDTO;
import com.example.application.data.Conversation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class ConversationService {
    @Autowired
    private ConversationRepository conversationRepository;
    @Autowired
    private FollowerService followerService;

    // Update conversation
    public void updateConversation(Conversation conversation) {
    	conversationRepository.save(conversation);
    }

    public Conversation getConversationById(Long conversationId) {
    	return conversationRepository.findById(conversationId).orElse(null);
    }

    // Get all requested conversations by receiver
    public List<Conversation> getRequestedConversationsByUser(Long receiverUserId) {
    	return conversationRepository.findRequestedConversationsByReceiver(receiverUserId);
    }

    // Get or create a conversation between two users
    public Conversation getOrCreateConversation(User user1, User user2) {
        Optional<Conversation> existingConversation = conversationRepository.findByUsers(user1, user2);
        return existingConversation.orElseGet(() -> {
            // Create a new conversation if it doesn't exist
            Conversation newConversation = new Conversation(user1, user2);

            boolean isFollowing = followerService.isFollowing(user1, user2);
            if (!isFollowing) {
                newConversation.setMessageRequest(true);
                newConversation.setRequestInitiatedByUserId(user1.getId());
            }
            return conversationRepository.save(newConversation);
        });
    }

    // Archive a conversation for a specific user
    public void archiveConversationForUser(Long conversationId, User user) {
        Conversation conversation = conversationRepository.findById(conversationId)
            .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));

        if (conversation.getUser1().equals(user)) {
            conversation.setArchivedForUser1(true);
            System.out.println("Archive for user 1");
        } else if (conversation.getUser2().equals(user)) {
            System.out.println("Archive for user 2");
            conversation.setArchivedForUser2(true);
        }
        conversationRepository.save(conversation);
    }

    // Unarchive a conversation for a specific user
    public void unarchiveConversationForUser(Long conversationId, User user) {
        Conversation conversation = conversationRepository.findById(conversationId)
            .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));

        if (conversation.getUser1().equals(user)) {
            conversation.setArchivedForUser1(false);
        } else if (conversation.getUser2().equals(user)) {
            conversation.setArchivedForUser2(false);
        }
        conversationRepository.save(conversation);
    }

    public List<Conversation> getConversationsForUser(User user) {
    	return conversationRepository.findByUser(user);
    }

    public List<Conversation> getArchivedConversations(User user) {
    	return conversationRepository.findArchivedConversationsByUser(user);
    }

    public void setReadByUser(Long conversationId, User user, boolean isRead) {
    	Conversation conversation = conversationRepository.findById(conversationId).orElse(null);
    	if (conversation.getUser1().equals(user)) {
    	    conversation.setReadByUser1(isRead);
    	} else {
    	    conversation.setReadByUser2(isRead);
    	}
    	conversationRepository.save(conversation);
    }

    public boolean isReadByUser(Long conversationId, User user) {
    	Conversation conversation = conversationRepository.findById(conversationId).orElse(null);
	return conversation.isRead(user);
    }

    public List<ConversationUserDTO> getActiveConversationsByUserDTO(User user) {
        return conversationRepository.findActiveConversationsByUserDTO(user);
    }
}
