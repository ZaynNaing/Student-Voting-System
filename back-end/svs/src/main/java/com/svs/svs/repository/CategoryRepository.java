package com.svs.svs.repository;

import com.svs.svs.entity.Category;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE c.name = ?1")
    Optional<Category> findByName(String categoryName);
}
