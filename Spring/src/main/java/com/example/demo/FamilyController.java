package com.example.demo;

import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/getByName")
    public Family getByName(@RequestParam String familyName) {
        ArrayList<Family> families = new ArrayList<>();
        ArrayList<Member> members = new ArrayList<>();
        members.add(new Member("Adam", 12, "M"));
        members.add(new Member("Wojtek", 16, "M"));
        members.add(new Member("Kasia", 24, "K"));

        families.add(new Family(UUID.randomUUID().toString(), "Kowalski", members));
        families.add(new Family(UUID.randomUUID().toString(), "Nowak", members));

        return families.stream().filter(family -> family.getName().equals(familyName)).findFirst().orElseThrow();
    }

}
