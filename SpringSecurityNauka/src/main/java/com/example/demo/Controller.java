package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @GetMapping("/")
    public String get() {
        return "Witaj świecie";
    }

    @GetMapping("/h1")
    public String get1() {
        return "Witaj świecie1";
    }
}
