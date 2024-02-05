package com.example.demo.services;

import com.example.demo.model.FamilyDB;
import com.example.demo.repository.FamilyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FamilyService {
    FamilyRepository familyRepository;

    public FamilyService(FamilyRepository familyRepository) {
        this.familyRepository = familyRepository;
    }

    public void save(FamilyDB familyDB) {
        familyRepository.save(familyDB);
    }

    public List<FamilyDB> findByName(String name) {
        return (List<FamilyDB>) familyRepository.findByName(name);
    }

    public List<FamilyDB> getAll() {
        return familyRepository.findAll();
    }
}
