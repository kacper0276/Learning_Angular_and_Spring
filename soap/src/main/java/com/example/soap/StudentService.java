package com.example.soap;

import com.example.soap.student.Student;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {
    List<Student> students;

    public StudentService(){
        students = new ArrayList<>();

        Student student1 = new Student();
        student1.setId(1);
        student1.setName("Adam");
        student1.setSurname("Kwiatkowski");
        student1.setGrade("A");

        Student student2 = new Student();
        student2.setId(2);
        student2.setName("Rafał");
        student2.setSurname("Kowalski");
        student1.setGrade("C");

        students.add(student1);
        students.add(student2);
    }

    public Student getStudentById(long id){
        return students.stream().filter(value->value.getId() == id).findFirst().orElse(null);
    }
}
