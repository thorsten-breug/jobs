package com.example.jobs.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(
            "/swagger-ui/**",
            "/v3/api-docs*/**"
        );
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) {
        return http
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests((requests) -> requests
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()))
        .build();
    }
}
