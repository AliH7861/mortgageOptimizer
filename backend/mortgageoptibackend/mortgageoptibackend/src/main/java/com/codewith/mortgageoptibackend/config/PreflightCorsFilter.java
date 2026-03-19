package com.codewith.mortgageoptibackend.config;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class PreflightCorsFilter extends OncePerRequestFilter {

    private final String frontendUrl;

    public PreflightCorsFilter(@Value("${frontend.url:*}") String frontendUrl) {
        this.frontendUrl = frontendUrl;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String origin = request.getHeader("Origin");
        String allowedOrigin = resolveAllowedOrigin(origin);

        if (allowedOrigin != null) {
            String requestedHeaders = request.getHeader("Access-Control-Request-Headers");
            response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
            response.setHeader("Vary", "Origin");
            response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
            response.setHeader(
                    "Access-Control-Allow-Headers",
                    requestedHeaders == null || requestedHeaders.isBlank() ? "*" : requestedHeaders
            );
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Max-Age", "3600");
        }

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String resolveAllowedOrigin(String requestOrigin) {
        if (requestOrigin == null || requestOrigin.isBlank()) {
            return null;
        }

        String[] configuredOrigins = frontendUrl.split(",");
        for (String configuredOrigin : configuredOrigins) {
            String normalizedOrigin = configuredOrigin.trim();
            if (normalizedOrigin.endsWith("/")) {
                normalizedOrigin = normalizedOrigin.substring(0, normalizedOrigin.length() - 1);
            }

            if ("*".equals(normalizedOrigin) || normalizedOrigin.equals(requestOrigin)) {
                return requestOrigin;
            }
        }

        return null;
    }
}
