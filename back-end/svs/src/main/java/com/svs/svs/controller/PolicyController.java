package com.svs.svs.controller;

import com.svs.svs.dto.PolicyRequestDto;
import com.svs.svs.dto.PolicyResponseDto;
import com.svs.svs.dto.PolicyVoteRequestDto;
import com.svs.svs.service.PolicyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {
    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    @GetMapping("")
    public List<PolicyResponseDto> getAllPolicies() {
        return policyService.getAllPolicies();
    }

    @PostMapping("")
    public PolicyResponseDto createPolicy(@RequestBody PolicyRequestDto payload) {
        return policyService.createPolicy(payload);
    }

    @PostMapping("/up-vote")
    public void upVotePolicy(@RequestBody PolicyVoteRequestDto payload) {
        policyService.upVotePolicy(payload);
    }

    @PostMapping("/down-vote")
    public void downVotePolicy(@RequestBody PolicyVoteRequestDto payload) {
        policyService.downVotePolicy(payload);
    }
}
