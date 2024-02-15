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
        long totalCount = productService.countActiveProducts();
        return ResponseEntity.ok().header("X-Total-Count", String.valueOf(totalCount)).body("");
    }
}
