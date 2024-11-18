package com.example.application.repository;

import com.example.application.data.User;
import com.example.application.data.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    // Update all unseen messages as seen
    @Modifying
    @Query("UPDATE ChatMessage c SET c.seen = true WHERE c IN :unseenMessages")
    void updateSeenMessages(@Param("unseenMessages") List<ChatMessage> unseenMessages);

    // Fetch all unseen messages
    @Query("SELECT m FROM ChatMessage m WHERE " +
    	   "m.receiver.id = :userId AND " +
    	   "m.conversation.id = :conversationId AND m.seen = false")
    List<ChatMessage> findUnseenMessages(@Param("userId") Long userId, @Param("conversationId") Long conversationId);

    // Fetch all messages between two users, ordered by time
    @Query("SELECT m FROM ChatMessage m WHERE " +
           "(m.sender.id = :user1Id AND m.receiver.id = :user2Id) OR " +
           "(m.sender.id = :user2Id AND m.receiver.id = :user1Id) " +
           "ORDER BY m.time ASC")
    List<ChatMessage> findChatMessagesBetweenUsers(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);

    // Fetch the latest message between two users
    @Query("SELECT m FROM ChatMessage m WHERE " +
           "(m.sender.id = :user1Id AND m.receiver.id = :user2Id) OR " +
           "(m.sender.id = :user2Id AND m.receiver.id = :user1Id) " +
           "ORDER BY m.time DESC")
    ChatMessage findLatestChatMessageBetweenUsers(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);

    // Fetch recent conversations (latest message per user pair) for a given user
    @Query("SELECT m FROM ChatMessage m WHERE " +
           "m.id IN (SELECT MAX(c.id) FROM ChatMessage c " +
           "WHERE c.sender.id = :userId OR c.receiver.id = :userId " +
           "GROUP BY CASE WHEN c.sender.id = :userId THEN c.receiver.id ELSE c.sender.id END) " +
           "ORDER BY m.time DESC")
    List<ChatMessage> findRecentConversations(@Param("userId") Long userId);

    // Fetch receiver's messages
    List<ChatMessage> findByReceiverId(Long receiverId);

    // Fetch all messages for specific user (user as sender or receiver)
    List<ChatMessage> findBySenderIdOrReceiverId(Long senderId, Long receiverId);

    // Update message as delivered
    @Modifying
    @Transactional
    @Query("UPDATE ChatMessage m SET m.delivered = true WHERE m.id = :messageId")
    void markMessageAsDelivered(@Param("messageId") Long messageId);

    // Update message as seen
    @Modifying
    @Transactional
    @Query("UPDATE ChatMessage m SET m.seen = true WHERE m.id = :messageId")
    void markMessageAsSeen(@Param("messageId") Long messageId);

    // Fetch receiver's single message
    @Query("SELECT m FROM ChatMessage m WHERE m.id = :messageId AND m.receiver.id = :receiverId")
    ChatMessage findMessageByReceiver(@Param("messageId") Long messageId, @Param("receiverId") Long receiverId);

    // Fetch sender's single message
    @Query("SELECT m FROM ChatMessage m WHERE m.id = :messageId AND m.sender.id = :senderId")
    ChatMessage findMessageBySender(@Param("messageId") Long messageId, @Param("senderId") Long senderId);

    // Fetch latest message by conversation id
    ChatMessage findFirstByConversationIdOrderByTimeDesc(Long conversationId);

    // Find all messages by conversation id
    List<ChatMessage> findByConversationId(Long conversationId);

    // Fetch all message requests by conversation id and user id
    @Query("SELECT cm FROM ChatMessage cm WHERE cm.conversation.id = :conversationId AND cm.conversation.messageRequest = true AND cm.conversation.requestInitiatedByUserId = :userId")
    List<ChatMessage> findAllMessageRequestsByConversationAndUser(@Param("conversationId") Long conversationId, @Param("userId") Long userId);

    // Fetch latest message requests
    ChatMessage findFirstByConversationIdAndConversationMessageRequestAndConversationRequestInitiatedByUserIdOrderByTimeDesc(
    	Long conversationId,
    	boolean messageRequest,
    	Long requestInitiatedByUserId
    );
}
