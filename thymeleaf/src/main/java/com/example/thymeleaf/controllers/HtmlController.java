package com.example.thymeleaf.controllers;

import com.example.thymeleaf.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@RequiredArgsConstructor
public class HtmlController {

    private final StudentService studentService;

    @GetMapping
    public String index(Model model) {
        model.addAttribute("students", studentService.getStudentSet());
        return "index";
    }
}
