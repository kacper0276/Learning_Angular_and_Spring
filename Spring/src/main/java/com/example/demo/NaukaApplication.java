package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

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
}
