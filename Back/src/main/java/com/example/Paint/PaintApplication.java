package com.example.Paint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class PaintApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(PaintApplication.class, args);
	}
}