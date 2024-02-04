package com.example.demo.repository;

import com.example.demo.model.FamilyDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilyRepository extends JpaRepository<FamilyDB, Long> {

}
