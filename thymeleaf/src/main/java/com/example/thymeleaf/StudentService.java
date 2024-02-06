package com.example.thymeleaf;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
public class StudentService {
    private Set<Student> studentSet = new HashSet<>();

    public Set<Student> getStudentSet() {
        Student student = new Student();
        student.setName("Adam");
        student.setSurname("Mickiewicz");
        student.setGrade("A");
        studentSet.add(student);
        return studentSet;
    }
}
