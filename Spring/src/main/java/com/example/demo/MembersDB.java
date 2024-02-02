package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "members")
@Getter
@Setter
@AllArgsConstructor
public class MembersDB {
    private long id;
    private String name;
    private int age;
    private String gender;
    private long family_id;
}
