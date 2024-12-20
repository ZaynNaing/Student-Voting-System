package com.svs.svs.service;

import com.svs.svs.dto.*;
import com.svs.svs.entity.Category;
import com.svs.svs.entity.Policy;
import com.svs.svs.entity.User;
import com.svs.svs.entity.Vote;
import com.svs.svs.exception.Exception403;
import com.svs.svs.exception.Exception404;
import com.svs.svs.repository.CategoryRepository;
import com.svs.svs.repository.PolicyRepository;
import com.svs.svs.repository.UserRepository;
import com.svs.svs.repository.VoteRepository;
import com.svs.svs.util.VoteType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PolicyService {
    private final PolicyRepository policyRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final VoteRepository voteRepository;

    public PolicyService(PolicyRepository policyRepository, UserRepository userRepository, CategoryRepository categoryRepository, VoteRepository voteRepository) {
        this.policyRepository = policyRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.voteRepository = voteRepository;
    }

    public List<PolicyResponseDto> getAllPolicies() {
        final List<PolicyResponseDto> responseDtoList = new ArrayList<>();

        final List<Policy> policies = policyRepository.findAll();
        for (Policy policy : policies) {
            long upVoteCount = 0;
            long downVoteCount = 0;

            final List<Vote> votes = policy.getVotes();
            for (Vote vote : votes) {
                if (vote.getType().equals(VoteType.UP)) {
                    upVoteCount++;
                } else {
                    downVoteCount++;
                }
            }

            final User user = policy.getUser();
            final Category category = policy.getCategory();
            final PolicyResponseDto responseDto = new PolicyResponseDto(policy.getId(), policy.getTitle(), policy.getDescription(), policy.getDate(), upVoteCount, downVoteCount);
            responseDto.setUser(new AuthResponseDto(user.getId(), user.getName()));
            responseDto.setCategory(new CategoryResponseDto(category.getId(), category.getName()));

            responseDtoList.add(responseDto);
        }

        return responseDtoList;
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

    @Transactional
    public void upVotePolicy(PolicyVoteRequestDto payload) {
        final Optional<User> optionalUser = userRepository.findById(Long.valueOf(payload.getUserId()));
        if (optionalUser.isEmpty()) {
            throw new Exception404("User not found with given userId.");
        }

        final Optional<Policy> optionalPolicy = policyRepository.findById(Long.valueOf(payload.getPolicyId()));
        if (optionalPolicy.isEmpty()) {
            throw new Exception404("Policy not found with given policyId.");
        }

        if (voteRepository.existsByUser_IdAndPolicy_IdAndType(Long.valueOf(payload.getUserId()), Long.valueOf(payload.getPolicyId()), VoteType.UP)) {
            throw new Exception403("You have already up-voted to this policy.");
        }
        voteRepository.deleteVoteByUser_IdAndPolicy_IdAndType(Long.valueOf(payload.getUserId()), Long.valueOf(payload.getPolicyId()), VoteType.DOWN);

        final Vote upVoteToSave = new Vote(VoteType.UP, optionalUser.get(), optionalPolicy.get());
        voteRepository.save(upVoteToSave);
    }

    @Transactional
    public void downVotePolicy(PolicyVoteRequestDto payload) {
        final Optional<User> optionalUser = userRepository.findById(Long.valueOf(payload.getUserId()));
        if (optionalUser.isEmpty()) {
            throw new Exception404("User not found with given userId.");
        }

        final Optional<Policy> optionalPolicy = policyRepository.findById(Long.valueOf(payload.getPolicyId()));
        if (optionalPolicy.isEmpty()) {
            throw new Exception404("Policy not found with given policyId.");
        }

        if (voteRepository.existsByUser_IdAndPolicy_IdAndType(Long.valueOf(payload.getUserId()), Long.valueOf(payload.getPolicyId()), VoteType.DOWN)) {
            throw new Exception403("You have already down-voted to this policy.");
        }
        voteRepository.deleteVoteByUser_IdAndPolicy_IdAndType(Long.valueOf(payload.getUserId()), Long.valueOf(payload.getPolicyId()), VoteType.UP);

        final Vote downVoteToSave = new Vote(VoteType.DOWN, optionalUser.get(), optionalPolicy.get());
        voteRepository.save(downVoteToSave);
    }
}
