package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

@Service
public class RestTemplateApi {
    RestTemplate restTemplate;

    public RestTemplateApi(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getQuotes() throws URISyntaxException {
        URI api_url = new URI("https://api.api-ninjas.com/v1/quotes?category=happiness");
        ResponseEntity<String> response = restTemplate.getForEntity(api_url, String.class);
        return response.getBody();
    }
}
