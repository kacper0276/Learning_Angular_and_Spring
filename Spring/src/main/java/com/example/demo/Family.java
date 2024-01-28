package com.example.demo;

import java.util.ArrayList;

public class Family {
    private final String uid;
    private String name;
    private ArrayList<Member> members;

    public Family(String uid, String name, ArrayList<Member> members) {
        this.uid = uid;
        this.name = name;
        this.members = members;
    }

    public String getUid() {
        return uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArrayList<Member> getMembers() {
        return new ArrayList<>(members);
    }

    public void setMembers(ArrayList<Member> members) {
        this.members = members;
    }
}
