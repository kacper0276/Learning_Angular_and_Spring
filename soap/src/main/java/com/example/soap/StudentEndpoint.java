package com.example.soap;

import com.example.soap.student.GetStudent;
import com.example.soap.student.GetStudentResponse;
import com.example.soap.student.Student;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class StudentEndpoint {
    private final StudentService studentService;

    public StudentEndpoint(StudentService studentService){
        this.studentService = studentService;
    }


    @PayloadRoot(namespace = "http://coffecode.pl/soup-example", localPart = "getStudent")
    @ResponsePayload
    public GetStudentResponse getStudent(@RequestPayload GetStudent getStudent){
        Student student = studentService.getStudentById(getStudent.getId());
        GetStudentResponse getStudentResponse = new GetStudentResponse();
        getStudentResponse.setStudent(student);
        return getStudentResponse;
    }
}
