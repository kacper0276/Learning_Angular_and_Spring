package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "family")
@Getter
@Setter
@AllArgsConstructor
public class FamilyDB {
    private long id;
    private String name;
    private String origin;
    private long head;
}
