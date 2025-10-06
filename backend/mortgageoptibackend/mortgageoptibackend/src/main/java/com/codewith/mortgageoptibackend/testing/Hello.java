package com.codewith.mortgageoptibackend.testing;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@RestController
@RequestMapping("/api/mortgage")



// Allow both Vite (5173) and CRA (3000) dev servers
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class Hello {

    private final WebClient webClient;

    public Hello() {
        this.webClient = WebClient.builder()
                .baseUrl("http://localhost:8001") // FastAPI URL
                .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader("Accept", MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    // Test Route
    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello from a Testing Mortgage Optimizer Backend!";
    }

    // Health Status 
    @GetMapping("/status")
    public Map<String, String> status() {
        return Map.of("status", "running", "app", "Mortgage Optimizer Backend");
    }

    // Approval Route 
    @SuppressWarnings("unchecked")
    @PostMapping(
            value = "/approval",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Map<String, Object> approval(@RequestBody Map<String, Object> applicant) {
        return (Map<String, Object>) webClient.post()
                .uri("/predict/approval")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .bodyValue(applicant)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
    }

    // Strategy Route 
    @SuppressWarnings("unchecked")
    @PostMapping(
            value = "/strategy",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Map<String, Object> strategy(@RequestBody Map<String, Object> applicant) {
        return (Map<String, Object>) webClient.post()
                .uri("/predict/strategy")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .bodyValue(applicant)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
    }
}
