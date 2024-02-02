package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FamilyRepository extends JpaRepository<FamilyDB, Long> {
    Optional<FamilyDB> findById(Long id);

    Iterable<FamilyDB> findByNameAndOrigin(String name, String origin);
}
