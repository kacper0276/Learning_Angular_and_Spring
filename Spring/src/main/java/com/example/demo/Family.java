package com.example.demo;

import lombok.*;

import java.util.ArrayList;

//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
@Data // - tworzy wszystkie 4 rzeczy w jednej
@AllArgsConstructor
@ToString
public class Family {
    private final String uid;
    private String name;
    private ArrayList<Member> members;

    public Family(String uid, String name) {
        this.uid = uid;
        this.name = name;
    }
}
