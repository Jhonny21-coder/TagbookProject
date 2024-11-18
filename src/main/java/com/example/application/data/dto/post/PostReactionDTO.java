package com.example.application.data.dto.post;

import lombok.Getter;

@Getter
public class PostReactionDTO {
    private String reactType;

    public PostReactionDTO(String reactType) {
    	this.reactType = reactType;
    }
}
