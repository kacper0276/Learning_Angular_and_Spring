package com.example.demo;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.*;

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

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.PATCH, consumes = "application/json-patch+json")
    public void editFamily(@RequestBody Map<Object, Object> fields, @PathVariable String id, HttpServletResponse response) throws IOException {
        Optional<Family> family = families.stream().filter(value -> value.getUid().equals(id)).findFirst();
        try {
            if(family.isPresent()) {
                fields.forEach((k, v) -> {
                    Field field = ReflectionUtils.findField(Family.class, (String) k);
                    field.setAccessible(true);
                    ReflectionUtils.setField(field, family.get(), v);
                });
                response.sendError(HttpServletResponse.SC_OK, "Updated family information");
                return;
            }
        } catch (NullPointerException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Fields aren't correct");
            return;
        }
        response.sendError(HttpServletResponse.SC_NO_CONTENT, "Family doesn't exist");
    }


}
