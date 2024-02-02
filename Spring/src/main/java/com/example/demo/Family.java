package com.example.demo;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class Family {
    private final String uid;
    private String name;
    private ArrayList<Member> members;

    public Family(String uid, String name, ArrayList<Member> members) {
        this.uid = uid;
        this.name = name;
        this.members = members;
    }
}
