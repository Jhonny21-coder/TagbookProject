package com.example.application.data.dto.post;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ArtworkFeedDTO {
    private Long artworkId;
    private String artworkDescription;
    private String artworkBackground;
    private LocalDateTime postTimestamp;

    private Long userId;
    private String userFullName;
    private String userProfileImage;
    private String artworkUrl;

    private Long commentsCount;
}
