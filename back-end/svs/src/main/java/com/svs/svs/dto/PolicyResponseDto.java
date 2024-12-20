package com.svs.svs.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class PolicyResponseDto {
    private Long policyId;
    private CategoryResponseDto category;
    private AuthResponseDto user;
    private String title;
    private String description;
    @JsonFormat(pattern = "MM-dd-yyyy")
    private LocalDate date;
    private Long upVoteCount;
    private Long downVoteCount;

    public PolicyResponseDto() {
    }

    public PolicyResponseDto(Long policyId, String title, String description, LocalDate date, Long upVoteCount, Long downVoteCount) {
        this.policyId = policyId;
        this.title = title;
        this.description = description;
        this.date = date;
        this.upVoteCount = upVoteCount;
        this.downVoteCount = downVoteCount;
    }

    public Long getPolicyId() {
        return policyId;
    }

    public void setPolicyId(Long policyId) {
        this.policyId = policyId;
    }

    public CategoryResponseDto getCategory() {
        return category;
    }

    public void setCategory(CategoryResponseDto category) {
        this.category = category;
    }

    public AuthResponseDto getUser() {
        return user;
    }

    public void setUser(AuthResponseDto user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getUpVoteCount() {
        return upVoteCount;
    }

    public void setUpVoteCount(Long upVoteCount) {
        this.upVoteCount = upVoteCount;
    }

    public Long getDownVoteCount() {
        return downVoteCount;
    }

    public void setDownVoteCount(Long downVoteCount) {
        this.downVoteCount = downVoteCount;
    }
}
