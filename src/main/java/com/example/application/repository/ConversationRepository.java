package com.example.application.repository;

import com.example.application.data.User;
import com.example.application.data.Conversation;
import com.example.application.data.dto.conversation.ConversationUserDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    /*@Query("SELECT new com.example.application.data.dto.conversation.ConversationUserDTO(" +
       "c.id, " +
       "CASE WHEN c.user1 = :user THEN c.user2.id ELSE c.user1.id END, " +
       "CASE WHEN c.user1 = :user THEN CONCAT(c.user2.firstName, ' ', c.user2.lastName) ELSE CONCAT(c.user1.firstName, ' ', c.user1.lastName) END, " +
       "CASE WHEN c.user1 = :user THEN c.user2.profileImage ELSE c.user1.profileImage END, " +
       "c.messageRequest) " +
       "FROM Conversation c " +
       "WHERE c.user1 = :user OR c.user2 = :user")
    List<ConversationUserDTO> findConversationUsersByUserDTO(@Param("user") User user);*/

    @Query("""
    SELECT new com.example.application.data.dto.conversation.ConversationUserDTO(
        c.id,
        CASE
            WHEN c.user1 = :user THEN c.user2.id
            ELSE c.user1.id
        END,
        CASE
            WHEN c.user1 = :user THEN CONCAT(c.user2.firstName, ' ', c.user2.lastName)
            ELSE CONCAT(c.user1.firstName, ' ', c.user1.lastName)
        END,
        CASE
            WHEN c.user1 = :user THEN c.user2.profileImage
            ELSE c.user1.profileImage
        END,
        c.messageRequest
    )
    FROM Conversation c
    WHERE
        (c.user1 = :user OR c.user2 = :user)
        AND
        (
            CASE
                WHEN c.user1 = :user THEN c.deletedByUser1
                ELSE c.deletedByUser2
            END = false
        )
    """)
    List<ConversationUserDTO> findActiveConversationsByUserDTO(@Param("user") User user);

    @Query("SELECT c FROM Conversation c WHERE " +
           "(c.user1 = :user1 AND c.user2 = :user2) " +
           "OR (c.user1 = :user2 AND c.user2 = :user1)")
    Optional<Conversation> findByUsers(@Param("user1") User user1, @Param("user2") User user2);

    @Query("SELECT c FROM Conversation c WHERE c.user1 = :user OR c.user2 = :user")
    List<Conversation> findByUser(@Param("user") User user);

    @Query("SELECT c FROM Conversation c WHERE " +
           "(c.user1 = :user AND c.archivedForUser1 = true) OR " +
       	   "(c.user2 = :user AND c.archivedForUser2 = true)")
    List<Conversation> findArchivedConversationsByUser(@Param("user") User user);

    @Query("SELECT c FROM Conversation c " +
           "WHERE c.messageRequest = true " +
           "AND ((c.user1.id = :userId AND c.deletedByUser1 = false AND c.requestInitiatedByUserId = c.user2.id) " +
           "OR   (c.user2.id = :userId AND c.deletedByUser2 = false AND c.requestInitiatedByUserId = c.user1.id))")
    List<Conversation> findRequestedConversationsByReceiver(@Param("userId") Long userId);

    @Query("SELECT c FROM Conversation c " +
       	   "WHERE (c.muteStartTimeUser1 IS NOT NULL AND c.muteDurationUser1 IS NOT NULL AND " +
           "c.muteStartTimeUser1 + c.muteDurationUser1 < CURRENT_TIMESTAMP) " +
           "OR (c.muteStartTimeUser2 IS NOT NULL AND c.muteDurationUser2 IS NOT NULL AND " +
           "c.muteStartTimeUser2 + c.muteDurationUser2 < CURRENT_TIMESTAMP)")
    Page<Conversation> findExpiredMutes(Pageable pageable);

    @Query("SELECT c FROM Conversation c " +
       	   "WHERE (c.muteStartTimeUser1 IS NOT NULL AND c.muteDurationUser1 IS NOT NULL AND " +
           "c.muteStartTimeUser1 + c.muteDurationUser1 > CURRENT_TIMESTAMP) " +
           "OR (c.muteStartTimeUser2 IS NOT NULL AND c.muteDurationUser2 IS NOT NULL AND " +
           "c.muteStartTimeUser2 + c.muteDurationUser2 > CURRENT_TIMESTAMP)")
    Page<Conversation> findActiveMutedConversations(Pageable pageable);
}
