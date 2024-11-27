package com.example.application.data.dto.post;

import com.example.application.data.post.PostType;

import java.time.LocalDateTime;
import java.util.List;
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
    private PostType postType;
    private List<String> uploadedImages;
}
