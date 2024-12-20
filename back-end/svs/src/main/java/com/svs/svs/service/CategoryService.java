package com.svs.svs.service;

import com.svs.svs.dto.CategoryResponseDto;
import com.svs.svs.entity.Category;
import com.svs.svs.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponseDto> getAllCategories() {
        final List<Category> categories = categoryRepository.findAll();
        return categories.stream().map((this::toCategoryResponseDto)).toList();
    }

    private CategoryResponseDto toCategoryResponseDto(Category category) {
        return new CategoryResponseDto(category.getId(), category.getName());
    }
}
