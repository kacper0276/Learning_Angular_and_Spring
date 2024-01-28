package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1/family")
public class FamilyController {

//  @GetMapping("/getall")
    // Lub
    @RequestMapping(value = "/getall", method = RequestMethod.GET)
    public ArrayList<Family> getAll() {
        ArrayList<Family> families = new ArrayList<>();
        ArrayList<Member> members = new ArrayList<>();
        members.add(new Member("Adam", 12, "M"));
        members.add(new Member("Wojtek", 16, "M"));
        members.add(new Member("Kasia", 24, "K"));

        families.add(new Family(UUID.randomUUID().toString(), "Kowalski", members));
        families.add(new Family(UUID.randomUUID().toString(), "Nowak", members));

        return families;
    }

}
