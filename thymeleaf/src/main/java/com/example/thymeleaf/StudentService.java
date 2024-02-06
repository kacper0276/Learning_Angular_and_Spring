package com.example.thymeleaf;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
public class StudentService {
    private Set<Student> studentSet = new HashSet<>();

    public StudentService() {
        Student student = new Student();
        student.setName("Adam");
        student.setSurname("Mickiewicz");
        student.setGrade("A");

        Student student1 = new Student();
        student.setName("Juliusz");
        student.setSurname("Słowacki");
        student.setGrade("A+");

        studentSet.add(student);
        studentSet.add(student1);
    }

    public Set<Student> getStudentSet() {
        return studentSet;
    }
}
