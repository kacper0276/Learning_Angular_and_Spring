package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
public class Family {
    private final String uid;
    private String name;
    private ArrayList<Member> members;

    public Family(String uid, String name) {
        this.uid = uid;
        this.name = name;
    }
}
