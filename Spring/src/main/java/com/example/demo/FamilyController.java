package com.example.demo;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1/family")
public class FamilyController {
    ArrayList<Family> families = new ArrayList<>();
    ArrayList<Member> members = new ArrayList<>();

//  @GetMapping("/getall")
    // Lub
    @RequestMapping(value = "/getall", method = RequestMethod.GET)
    public ArrayList<Family> getAll() {
        members.add(new Member("Adam", 12, "M"));
        members.add(new Member("Wojtek", 16, "M"));
        members.add(new Member("Kasia", 24, "K"));

        families.add(new Family(UUID.randomUUID().toString(), "Kowalski", members));
        families.add(new Family(UUID.randomUUID().toString(), "Nowak", members));

        return families;
    }

    @GetMapping("/getByName")
    public Family getByName(@RequestParam String familyName) {
        members.add(new Member("Adam", 12, "M"));
        members.add(new Member("Wojtek", 16, "M"));
        members.add(new Member("Kasia", 24, "K"));

        families.add(new Family(UUID.randomUUID().toString(), "Kowalski", members));
        families.add(new Family(UUID.randomUUID().toString(), "Nowak", members));

        return families.stream().filter(family -> family.getName().equals(familyName)).findFirst().orElseThrow();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public void createFamily(@RequestBody Family family, HttpServletResponse response) throws IOException {
        if(family.getName() != null && !family.getMembers().isEmpty()) {
           families.add(family);
           response.sendError(HttpServletResponse.SC_OK, "Dodano do listy");
           return;
        }
        response.sendError(HttpServletResponse.SC_CONFLICT, "Nazwa rodziny nie może być pusta");
    }

}
