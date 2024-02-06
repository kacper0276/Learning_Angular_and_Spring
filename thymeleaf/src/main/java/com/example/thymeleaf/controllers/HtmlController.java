package com.example.thymeleaf.controllers;

import com.example.thymeleaf.Student;
import com.example.thymeleaf.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
@RequiredArgsConstructor
public class HtmlController {

    private final StudentService studentService;

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("students", studentService.getStudentSet());
        model.addAttribute("student", new Student());
        return "index";
    }

    @PostMapping("/")
    public String addElement(@ModelAttribute Student student) {
        studentService.addStudent(student);
        return "redirect:/";
    }
}
