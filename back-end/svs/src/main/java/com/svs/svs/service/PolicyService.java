package com.svs.svs.service;

import com.svs.svs.dto.PolicyRequestDto;
import com.svs.svs.dto.PolicyResponseDto;
import com.svs.svs.dto.PolicyVoteRequestDto;
import com.svs.svs.repository.PolicyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyService {
    private final PolicyRepository policyRepository;

    public PolicyService(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    public List<PolicyResponseDto> getAllPolicies() {
        return null;
    }

    public PolicyResponseDto createPolicy(PolicyRequestDto payload) {
        return null;
    }

    public boolean upVotePolicy(PolicyVoteRequestDto payload) {
        return false;
    }

    public boolean downVotePolicy(PolicyVoteRequestDto payload) {
        return false;
    }
}
