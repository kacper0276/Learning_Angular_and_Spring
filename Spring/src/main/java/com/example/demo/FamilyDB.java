package com.example.demo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "family")
@Getter
@Setter
@AllArgsConstructor
public class FamilyDB {
    @Id
    @Column(name = "id")
    private long id;
    @Column(name = "name")
    private String name;
    @Column(name = "origin")
    private String origin;
    @Column(name = "head", nullable = true)
    @OneToOne(mappedBy = "id")
    private MembersDB head;
}
