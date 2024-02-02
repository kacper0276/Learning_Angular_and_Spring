package com.example.demo;

import com.example.demo.podstawy.Call;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class NaukaApplication {

	public static void main(String[] args) {
		SpringApplication.run(NaukaApplication.class, args);
	}

	@Bean
	public Call call() {
		Call call = new Call();
		call.setName("Adam");
		return call;
	}

	@Bean(name = "callKacper")
	Call call2() {
		Call call = new Call();
		call.setName("Kacper");
		return call;
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
