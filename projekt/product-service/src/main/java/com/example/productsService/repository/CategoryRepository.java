package com.example.productsService.repository;

import com.example.productsService.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByShortId(String shortID);
    Optional<Category> findByName(String name);
}
