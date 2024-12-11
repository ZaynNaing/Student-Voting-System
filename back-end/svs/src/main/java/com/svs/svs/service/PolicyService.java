package com.svs.svs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.svs.svs.entity.Policy;
import com.svs.svs.repository.PolicyRepository;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;
        
        public void save(Policy policy) {
            policyRepository.save(policy);
        }

        public void fetchAllPolicy() {
            policyRepository.findAll().forEach(System.out::println);
        }

        public void fetchPolicyByOwner(String owner) {
            policyRepository.findByOwner(owner).forEach(System.out::println);
        }
    
}
