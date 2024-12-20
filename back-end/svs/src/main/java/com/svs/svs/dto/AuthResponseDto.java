package com.svs.svs.dto;

public class AuthResponseDto {
    private Long userId;
    private String userName;

    public AuthResponseDto() {
    }

    public AuthResponseDto(Long userId, String userName) {
        this.userId = userId;
        this.userName = userName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
