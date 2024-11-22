package com.example.application.data.dto.post;

import lombok.Getter;

@Getter
public class PostReactionDTO {
    private String reactType;
    private String userProfileImage;
    private String userFullName;

    public PostReactionDTO(String reactType) {
    	this.reactType = reactType;
    }

    public PostReactionDTO(String reactType, String userProfileImage, String userFullName) {
    	this.reactType = reactType;
    	this.userProfileImage = userProfileImage;
    	this.userFullName = userFullName;
    }
}
