package com.svs.svs.dto;

public class PolicyVoteRequestDto {
    private String userId;
    private String policyId;

    public PolicyVoteRequestDto() {
    }

    public PolicyVoteRequestDto(String userId, String policyId) {
        this.userId = userId;
        this.policyId = policyId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPolicyId() {
        return policyId;
    }

    public void setPolicyId(String policyId) {
        this.policyId = policyId;
    }
}
