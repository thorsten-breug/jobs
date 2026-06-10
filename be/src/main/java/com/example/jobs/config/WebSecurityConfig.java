package com.example.jobs.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    Environment environment;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(
            "/swagger-ui/**",
            "/v3/api-docs*/**"
        );
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) {
        if (Arrays.asList(environment.getActiveProfiles()).contains("develop")) {
            http.cors(AbstractHttpConfigurer::disable);
            http.csrf(AbstractHttpConfigurer::disable);
        }
        return http
            .authorizeHttpRequests((requests) -> requests
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()))
        /*
            .formLogin((form) -> form
                .loginPage("/login")
                .permitAll()
            )
            .logout(LogoutConfigurer::permitAll)
        */
        .build();
    }
}
