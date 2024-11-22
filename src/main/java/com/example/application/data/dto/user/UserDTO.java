package com.example.application.data.dto.user;

import lombok.Getter;

@Getter
public class UserDTO {
    private Long id;
    private String fullName;

    public UserDTO(String fullName, Long id) {
    	this.fullName = fullName;
    	this.id = id;
    }
}
