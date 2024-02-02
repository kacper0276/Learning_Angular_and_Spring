package com.example.demo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "family")
@Getter
@Setter
@NoArgsConstructor
//@AllArgsConstructor
public class FamilyDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "name")
    private String name;
    @Column(name = "origin")
    private String origin;
//    @Column(name = "head", nullable = true)
    @OneToOne
    @JoinColumn(name = "head")
    private MembersDB head;

    public FamilyDB(long id, String name, String origin, MembersDB head) {
        this.id = id;
        this.name = name;
        this.origin = origin;
        this.head = head;
    }
}
