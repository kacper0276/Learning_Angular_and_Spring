package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

@Service
public class RestTemplateApi {
    RestTemplate restTemplate;

    @Value("${ninja.api.quotes}")
    String url;

    public RestTemplateApi(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getQuotes() throws URISyntaxException {
        Map<String, String> params = new HashMap<>();
        params.put("category", "happiness");

        URI api_url = UriComponentsBuilder.fromUriString(url)
                .queryParam("category", params.get("category"))
                .build()
                .toUri();

//        URI api_url = new URI("?category=happiness");
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Api-Key", "VOCI7sIXVR5rNp8Z2WW5cw==nDwd2CCndNPW1FH6");
        FamilyDB familyDB = new FamilyDB(13, "Test", "origin", null);
        HttpEntity<FamilyDB> request = new HttpEntity<>(familyDB, headers);
        ResponseEntity<String> response = restTemplate.exchange(api_url, HttpMethod.GET, request, String.class);
        return response.getBody();
    }
}
