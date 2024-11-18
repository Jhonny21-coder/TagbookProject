package com.example.application.data;

import jakarta.persistence.*;

import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.ZoneId;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private LocalDateTime time;

    @Column(nullable = false)
    private boolean delivered;

    @Column(nullable = false)
    private boolean seen;

    public ChatMessage(Conversation conversation, User sender, User receiver, String message) {
    	this.conversation = conversation;
    	this.sender = sender;
    	this.receiver = receiver;
    	this.message = message;
    	this.time = LocalDateTime.now(ZoneId.of("Asia/Manila"));
    }
}
