package com.example.productsService.service;

import com.example.productsService.entity.ProductEntity;
import com.example.productsService.repository.ProductRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    @PersistenceContext
    EntityManager entityManager;
    private final ProductRepository productRepository;

    public long countActiveProducts() {
        return productRepository.countActiveProducts();
    }

    public List<ProductEntity> getProduct(String name, String category, Float price_min, Float price_max, String data){
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<ProductEntity> query = criteriaBuilder.createQuery(ProductEntity.class);
        Root<ProductEntity> root = query.from(ProductEntity.class);
        List<Predicate> predicates = new ArrayList<>();
        if (data != null && !data.equals("") && name != null && !name.trim().equals("")){
            DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            LocalDate date = LocalDate.parse(data, inputFormatter);
            return productRepository.findByNameAndCreateAt(name,date);
        }
        if (name != null && !name.trim().equals("")) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
        }
        if (category != null && !category.equals("")) {
            predicates.add(criteriaBuilder.equal(root.get("category"), category));
        }
        if (price_min != null) {
            predicates.add(criteriaBuilder.greaterThan(root.get("price"), price_min-0.01));
        }
        if (price_max != null) {
            predicates.add(criteriaBuilder.lessThan(root.get("price"), price_max+0.01));
        }
        query.where(predicates.toArray(new Predicate[0]));

        return entityManager.createQuery(query).getResultList();
    }

}
