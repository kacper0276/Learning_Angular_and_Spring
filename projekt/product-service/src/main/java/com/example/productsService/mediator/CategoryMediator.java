package com.example.productsService.mediator;

import com.example.productsService.entity.CategoryDTO;
import com.example.productsService.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CategoryMediator {
    private final CategoryService categoryService;

    public ResponseEntity<List<CategoryDTO>> getCategory() {
        categoryService.getCategory();
    }
}
