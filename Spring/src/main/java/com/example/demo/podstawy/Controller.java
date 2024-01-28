package com.example.demo.podstawy;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1") // Endpointy przed adresem będą miały "/api/v1"
public class Controller {

    @GetMapping("/test")
    public String test() {
        return "Testowe API";
    }
}
