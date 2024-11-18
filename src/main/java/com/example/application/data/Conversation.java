package com.example.application.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.Duration;
import java.time.ZoneId;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user1_id", nullable = false)
    private User user1;

    @ManyToOne
    @JoinColumn(name = "user2_id", nullable = false)
    private User user2;

    @Column(nullable = false)
    private LocalDateTime createdTime;

    @Column(nullable = false)
    private boolean archivedForUser1 = false;

    @Column(nullable = false)
    private boolean archivedForUser2 = false;

    @Column(nullable = false)
    private boolean deletedByUser1 = false;

    @Column(nullable = false)
    private boolean deletedByUser2 = false;

    @Column(nullable = false)
    private boolean readReceiptsByUser1 = false;

    @Column(nullable = false)
    private boolean readReceiptsByUser2 = false;

    // Track whether the message request is active and from which user
    @Column(nullable = false)
    private boolean messageRequest;

    @Column(nullable = true)
    private Long requestInitiatedByUserId;  // Stores userId of the requester (either user1 or user2)

    @Column(nullable = true)
    private LocalDateTime muteStartTimeUser1;

    @Column(nullable = true)
    private LocalDateTime muteStartTimeUser2;

    @Column(nullable = true)
    private Duration muteDurationUser1;

    @Column(nullable = true)
    private Duration muteDurationUser2;

    @Column(nullable = false)
    private boolean readByUser1;

    @Column(nullable = false)
    private boolean readByUser2;

    public Conversation(User user1, User user2) {
        this.user1 = user1;
        this.user2 = user2;
        this.createdTime = LocalDateTime.now(ZoneId.of("Asia/Manila"));
    }

    // Utility method to check if muted
    public boolean isMuted(User user) {
        if (user.equals(user1) && muteStartTimeUser1 != null && muteDurationUser1 != null) {
            return LocalDateTime.now().isBefore(muteStartTimeUser1.plus(muteDurationUser1));
        } else if (user.equals(user2) && muteStartTimeUser2 != null && muteDurationUser2 != null) {
            return LocalDateTime.now().isBefore(muteStartTimeUser2.plus(muteDurationUser2));
        }
        return false;
    }

    public void setMute(User user, Duration duration) {
        if (user.equals(user1)) {
            this.muteStartTimeUser1 = LocalDateTime.now();
            this.muteDurationUser1 = duration;
        } else if (user.equals(user2)) {
            this.muteStartTimeUser2 = LocalDateTime.now();
            this.muteDurationUser2 = duration;
        }
    }

    public void unmute(User user) {
        if (user.equals(user1)) {
            this.muteStartTimeUser1 = null;
            this.muteDurationUser1 = null;
        } else if (user.equals(user2)) {
            this.muteStartTimeUser2 = null;
            this.muteDurationUser2 = null;
        }
    }

    public boolean isRead(User user) {
    	if (user.equals(user1)) {
    	    return readByUser1;
    	}
    	return readByUser2;
    }
}
