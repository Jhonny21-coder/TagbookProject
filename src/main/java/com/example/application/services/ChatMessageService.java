package com.example.application.services;

import com.example.application.data.Conversation;
import com.example.application.data.User;
import com.example.application.data.ChatMessage;
import com.example.application.repository.ChatMessageRepository;
import com.example.application.services.email.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.mail.MessagingException;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class ChatMessageService {

    @Autowired
    private ConversationService conversationService;
    @Autowired
    private ChatMessageRepository chatMessageRepository;
    @Autowired
    private UserServices userService;
    @Autowired
    private FollowerService followerService;
    @Autowired
    private EmailService emailService;

    // Send a new chat message
    public ChatMessage sendMessage(User sender, User receiver, String messageText) {
    	Conversation conversation = conversationService.getOrCreateConversation(sender, receiver);
        ChatMessage message = new ChatMessage(conversation, sender, receiver, messageText);
        emailService.sendMessageNotification(receiver.getEmail(), sender.getFullName(), "you");
        return chatMessageRepository.save(message);
    }

    // Mark unseen messages as seen
    @Transactional
    public void markUnseenMessagesAsSeen(List<ChatMessage> unseenMessages) {
    	chatMessageRepository.updateSeenMessages(unseenMessages);
    }

    // Get all unseen messages
    public List<ChatMessage> getAllUnseenMessagesForUser(Long userId, Long conversationId) {
    	return chatMessageRepository.findUnseenMessages(userId, conversationId);
    }

    // Get all request chat messages
    public List<ChatMessage> getAllMessageRequestsByUser(Long conversationId, Long userId) {
    	return chatMessageRepository.findAllMessageRequestsByConversationAndUser(conversationId, userId);
    }

    // Get latest request chat message
    public ChatMessage getLatestMessageRequestByUser(Long conversationId, Long userId) {
    	return chatMessageRepository.findFirstByConversationIdAndConversationMessageRequestAndConversationRequestInitiatedByUserIdOrderByTimeDesc(conversationId, true, userId);
    }

    // Get latest messages for conversation
    public ChatMessage getLatestMessageInConversation(Long conversationId) {
        return chatMessageRepository.findFirstByConversationIdOrderByTimeDesc(conversationId);
    }

    // Get messages for a conversation
    public List<ChatMessage> getMessagesForConversation(Long conversationId) {
        return chatMessageRepository.findByConversationId(conversationId);
    }

    // Get all chat messages between two users
    public List<ChatMessage> getChatMessagesBetweenUsers(Long user1Id, Long user2Id) {
        return chatMessageRepository.findChatMessagesBetweenUsers(user1Id, user2Id);
    }

    // Get the latest message between two users
    public ChatMessage getLatestChatMessageBetweenUsers(Long user1Id, Long user2Id) {
        return chatMessageRepository.findLatestChatMessageBetweenUsers(user1Id, user2Id);
    }

    // Get recent conversations for a user
    public List<ChatMessage> getRecentConversations(Long userId) {
        return chatMessageRepository.findRecentConversations(userId);
    }

    public List<ChatMessage> getMessagesForUser(Long userId) {
        return chatMessageRepository.findBySenderIdOrReceiverId(userId, userId);
    }

    // Mark message as delivered
    @Transactional
    public void markMessageAsDelivered(Long messageId) {
    	chatMessageRepository.markMessageAsDelivered(messageId);
    }

    // Mark message as seen
    @Transactional
    public void markMessageAsSeen(Long messageId) {
        chatMessageRepository.markMessageAsSeen(messageId);
    }

    // Find specific message by receiver
    public ChatMessage findMessageByReceiver(Long messageId, Long receiverId) {
    	return chatMessageRepository.findMessageByReceiver(messageId, receiverId);
    }

    // Find specific message by sender
    public ChatMessage findMessageBySender(Long messageId, Long senderId) {
        return chatMessageRepository.findMessageBySender(messageId, senderId);
    }

    // Get message by id
    public ChatMessage getMessageById(Long messageId) {
    	return chatMessageRepository.findById(messageId).orElse(null);
    }

    // Update message
    @Transactional
    public void updateChatMessage(ChatMessage chatMessage) {
    	chatMessageRepository.save(chatMessage);
    }
}
