package com.example.productsService.fasada;

import com.example.productsService.entity.CategoryDTO;
import com.example.productsService.exceptions.ObjectExistInDBException;
import com.example.productsService.mediator.CategoryMediator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryMediator categoryMediator;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<CategoryDTO>> getCategory() {
        return categoryMediator.getCategory();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> createCategory(@RequestBody CategoryDTO categoryDTO) {
        try {
            categoryMediator.createCategory(categoryDTO);
        } catch (ObjectExistInDBException e) {
            return ResponseEntity.status(404).body("");
        }
        return ResponseEntity.ok("");
    }
}
