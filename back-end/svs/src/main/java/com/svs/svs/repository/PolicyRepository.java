package com.svs.svs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.svs.svs.entity.Policy;

public interface PolicyRepository extends JpaRepository<Policy, Long> {

    @Query("SELECT p FROM Policy p WHERE p.owner = ?1")
    List<Policy> findByOwner(String owner);
    
} 
