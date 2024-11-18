package com.example.application.services;

import com.example.application.data.ChatMessage;
import com.example.application.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDateTime;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;

    public ChatService(ChatMessageRepository chatMessageRepository) {
    	this.chatMessageRepository = chatMessageRepository;
    }
}
