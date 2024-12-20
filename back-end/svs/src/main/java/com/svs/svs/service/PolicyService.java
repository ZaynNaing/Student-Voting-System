package com.svs.svs.service;

import com.svs.svs.dto.*;
import com.svs.svs.entity.Category;
import com.svs.svs.entity.Policy;
import com.svs.svs.entity.User;
import com.svs.svs.exception.Exception404;
import com.svs.svs.repository.CategoryRepository;
import com.svs.svs.repository.PolicyRepository;
import com.svs.svs.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PolicyService {
    private final PolicyRepository policyRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public PolicyService(PolicyRepository policyRepository, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.policyRepository = policyRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<PolicyResponseDto> getAllPolicies() {
        return null;
    }

    public PolicyResponseDto createPolicy(PolicyRequestDto payload) {
        final Optional<User> optionalUser = userRepository.findById(Long.valueOf(payload.getUserId()));
        if (optionalUser.isEmpty()) {
            throw new Exception404("User not found with given userId.");
        }

        final Optional<Category> optionalCategory = categoryRepository.findById(Long.valueOf(payload.getCategoryId()));
        if (optionalCategory.isEmpty()) {
            throw new Exception404("Category not found with given categoryId.");
        }

        final User user = optionalUser.get();
        final Category category = optionalCategory.get();
        final Policy policyToSave = new Policy(payload.getTitle(), payload.getDescription(), LocalDate.now(), category, user);
        final Policy savedPolicy = policyRepository.save(policyToSave);

        final PolicyResponseDto responseDto = new PolicyResponseDto(savedPolicy.getId(), savedPolicy.getTitle(), savedPolicy.getDescription(), savedPolicy.getDate(), 0L, 0L);
        responseDto.setCategory(new CategoryResponseDto(category.getId(), category.getName()));
        responseDto.setUser(new AuthResponseDto(user.getId(), user.getName()));

        return responseDto;
    }

    public boolean upVotePolicy(PolicyVoteRequestDto payload) {
        return false;
    }

    public boolean downVotePolicy(PolicyVoteRequestDto payload) {
        return false;
    }
}
