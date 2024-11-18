package com.example.application.data.dto.conversation;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ConversationUserDTO {
    private Long conversationId;      // Conversation ID
    private Long chatPartnerId;       // ID of the other user (chat partner)
    private String fullName;          // Full name of the chat partner
    private String profileImage;      // Profile image of the chat partner
    private boolean messageRequest;   // Represents if message request is active
}
