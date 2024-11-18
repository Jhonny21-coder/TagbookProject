package com.example.application.views.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class TypingEvent {
    private Long senderId;
    private Long receiverId;
    private boolean isTyping;
}
