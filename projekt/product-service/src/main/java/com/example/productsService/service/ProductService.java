package com.example.productsService.service;

import com.example.productsService.entity.ProductDTO;
import com.example.productsService.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public ProductDTO getProductDto() {
        return null;
    }
}
