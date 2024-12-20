package com.svs.svs.dto;

public class LoginResponseDto {
    private Long userId;
    private String userName;

    public LoginResponseDto() {
    }

    public LoginResponseDto(Long userId, String userName) {
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
