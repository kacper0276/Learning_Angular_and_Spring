package com.example.demo;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
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
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Api-Key", "VOCI7sIXVR5rNp8Z2WW5cw==nDwd2CCndNPW1FH6");
        HttpEntity<String> request = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(api_url, HttpMethod.GET, request, String.class);
        return response.getBody();
    }
}
