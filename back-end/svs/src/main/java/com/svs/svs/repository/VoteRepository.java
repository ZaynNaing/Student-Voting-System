package com.svs.svs.repository;

import com.svs.svs.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByUser_IdAndPolicy_IdAndType(Long userId, Long policyId, String type);

    void deleteVoteByUser_IdAndPolicy_IdAndType(Long userId, Long policyId, String type);
}
