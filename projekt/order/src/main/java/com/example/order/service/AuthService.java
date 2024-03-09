package com.example.order.service;

import com.example.order.entity.UserRegisterDTO;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Value("${auth.url}")
    private String auth_url;
    private final RestTemplate restTemplate;

    public UserRegisterDTO getUserDetails(List<Cookie> cookies) throws HttpClientErrorException {
        HttpHeaders httpHeaders = new HttpHeaders();
        StringBuilder cookieString = new StringBuilder();
        cookies.forEach(value -> {
            cookieString.append(value.getName()).append("=").append(value.getValue()).append(";");
        });
        if (cookieString.length() == 0) throw new RuntimeException("Bład");

        cookieString.deleteCharAt(cookieString.length() - 1);
        httpHeaders.add("Cookie", cookieString.toString());
        HttpEntity<Void> requestEntity = new HttpEntity<>(httpHeaders);
        ResponseEntity<UserRegisterDTO> response = restTemplate.exchange(auth_url, HttpMethod.GET, requestEntity, UserRegisterDTO.class);
        return response.getStatusCode().isError() ? null : response.getBody();
    }
}
