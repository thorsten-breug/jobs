package com.example.jobs.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.logging.Logger;

public class RequestLoggingInterceptor implements HandlerInterceptor {

    protected Logger logger = Logger.getLogger(RequestLoggingInterceptor.class.getName());

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Log request details for auditing
        logger.info(String.format("Request %s: %s", request.getMethod(), request.getRequestURL()));
        return true;  // Allow the request to proceed
    }
}
