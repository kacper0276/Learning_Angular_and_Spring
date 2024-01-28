package com.example.demo.podstawy;

public class Call {
    private String name;

    public void start() {
        System.out.println("Nawiązano połączenie " + name);
    }

    public void setName(String name) {
        this.name = name;
    }
}
