package com.example.application.data.dto.block;

import com.example.application.data.Block;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) for representing blocked users.
 */
@NoArgsConstructor
@Data
public class BlockedUserDTO {
    private Long id;
    private String fullName;
    private String profileImage;
    private String blockType;

    public BlockedUserDTO(Long id, String fullName, String profileImage, Block.BlockType blockType) {
        this.id = id;
        this.fullName = fullName;
        this.profileImage = profileImage;
        this.blockType = blockTypeToString(blockType);
    }

    // Convert BlockType enum to a user-friendly string
    private String blockTypeToString(Block.BlockType blockType) {
        switch (blockType) {
            case FULL_BLOCK:
                return "Blocked on Tagbook";
            case MESSAGES_ONLY:
                return "Blocked on messages";
            default:
                return "Unknown Block Type";
        }
    }
}
