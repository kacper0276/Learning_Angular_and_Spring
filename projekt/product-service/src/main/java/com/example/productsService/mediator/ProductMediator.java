package com.example.productsService.mediator;

import com.example.productsService.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductMediator {
    private final ProductService productService;

    public ResponseEntity<?> getProduct(int age, int limit) {
        return null;
    }
}
