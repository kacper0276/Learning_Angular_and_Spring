package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MembersDTO {
    private String name;
    private int age;
    private Gender gender;
    private FamilyDTO familyId;
}
