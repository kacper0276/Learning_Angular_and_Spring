package com.example.demo;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.net.URI;
import java.util.*;

@RestController
@RequestMapping(value = "/api/v1/family")
public class FamilyController {
    ArrayList<Family> families = new ArrayList<>();
    ArrayList<Member> members = new ArrayList<>();
//    @Autowired - zamiast konstruktora
    FamilyRepository familyRepository;

    // LUB
    public FamilyController(FamilyRepository familyRepository) {
        this.familyRepository = familyRepository;
    }


    @PostConstruct
    public void loadFamily() {
        members.add(new Member("Adam", 12, "M"));
        members.add(new Member("Wojtek", 16, "M"));
        members.add(new Member("Kasia", 24, "K"));

        families.add(new Family(UUID.randomUUID().toString(), "Kowalski", members));
        families.add(new Family(UUID.randomUUID().toString(), "Nowak", members));
    }

//  @GetMapping("/getall")
    // Lub
    @RequestMapping(value = "/getall", method = RequestMethod.GET)
    public ArrayList<Family> getAll(HttpServletResponse response) {
        response.setHeader("Length", String.valueOf(families.size()));
        Cookie cookie = new Cookie("Length", String.valueOf(families.size()));
        cookie.setMaxAge(10);
        response.addCookie(cookie);
        return families;
    }

    @GetMapping("/getByName")
    public Family getByName(@RequestParam String familyName) {
        return families.stream().filter(family -> family.getName().equals(familyName)).findFirst().orElseThrow();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public void createFamily(@RequestBody Family family, HttpServletResponse response) throws IOException {
        if(family.getName().length() < 2) {
            throw new FamilyLengthException("Pusta nazwa");
        }

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

    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public void updateFamily(@PathVariable String id, @RequestBody Family family, HttpServletResponse response) throws IOException {
        for(int i = 0; i < families.size(); i++) {
            if(families.get(i).getUid().equals(id)) {
                families.set(i, family);
                response.sendError(HttpServletResponse.SC_OK, "Value updated");
                break;
            }
            if(families.size() - 1 == i) {
                families.add(family);
                response.sendError(HttpServletResponse.SC_OK, "Value has been created");
            }
        }
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable String id, HttpServletResponse response) throws IOException {
        Optional<Family> familyOptional = families.stream().filter(value -> value.getUid().equals(id)).findFirst();
        if(familyOptional.isPresent()) {
            families.remove(familyOptional.get());
            response.sendError(HttpServletResponse.SC_OK);
            return;
        }

        response.sendError(HttpServletResponse.SC_CONFLICT, "Family doesn't exist");
    }

    @RequestMapping(value = "/getALLRD", method = RequestMethod.GET)
    public ResponseEntity<Void> getGoogle() {
        URI location = URI.create("https://google.com");
        URI location1 = URI.create("/api/v1/family/getall");
        return ResponseEntity.status(HttpStatus.FOUND).location(location1).build();
    }

    @RequestMapping(value = "/getHeader", method = RequestMethod.GET)
    public void getHeader(HttpServletRequest request) {
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String headerValue = request.getHeader(headerName);
            System.out.println(headerName + ": " + headerValue);
        }

        // Pobieranie wszystkich ciasteczek z żądania
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for(Cookie cookie: cookies) {
                System.out.println(cookie.getName() + ": " + cookie.getValue());
            }
        }
    }

    @GetMapping("/download")
    public ResponseEntity<InputStreamResource> downloadFile() throws IOException {
        File file = new File("src/main/resources/static/test.jpg");
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+ file.getName() + "\"")
                .contentLength(file.length())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(resource);
    }

    @GetMapping("/video")
    public StreamingResponseBody streamVideo(HttpServletResponse response) throws IOException {
        response.setContentType("video/mp4");
        InputStream videoFileStream = new FileInputStream(new File("src/main/resources/static/video.mp4"));
        return outputStream -> {
            int nRead;
            byte[] data = new byte[1024];
            while ((nRead = videoFileStream.read(data, 0, data.length)) != -1) {
                outputStream.write(data, 0, nRead);
            }
            videoFileStream.close();
        };
    }

    @GetMapping("createFamilyDB")
    @Transactional // Albo wykona się wszystko, albo zmiany zostaną wycofane
    public void craeteFamilyDB() {
        FamilyDB familyDB = new FamilyDB(13, "Mostowiak", "Polska", null);
        familyRepository.save(familyDB);
        throw new RuntimeException("Error");
    }

    @GetMapping("getFamilyDB")
    public List<FamilyDB> getFamilyDB() {
        return familyRepository.findByname("Mostowiak","Polska");
    }

    @GetMapping("removeFamilyDB")
    public void removeFamilyDB() {
        familyRepository.deleteById(5L);
    }
}
