package com.codewith.mortgageoptibackend;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MortgageoptibackendApplicationTests {

    private static HttpServer mockMlService;
    private static String mockMlServiceUrl;

    @Autowired
    private MockMvc mockMvc;

    @BeforeAll
    static void startMockMlService() {
        if (mockMlService != null) {
            return;
        }

        try {
            mockMlService = HttpServer.create(new InetSocketAddress(0), 0);
            mockMlService.createContext("/predict/approval", exchange ->
                    writeJson(exchange, "{\"decision\":\"PASS\",\"approval_probability\":0.91,\"rate_type\":\"Fixed\",\"approval_reasons\":[\"Test approval\"],\"rate_reasons\":[\"Test rate\"]}")
            );
            mockMlService.createContext("/predict/strategy", exchange ->
                    writeJson(exchange, "{\"strategy\":\"baseline\",\"rate_type\":\"Fixed\",\"adjusted_probabilities\":{\"baseline\":0.7},\"feasibility\":{\"baseline\":true},\"preferences\":{\"pref_stability\":0.5},\"rate_reasons\":[\"Stable rate\"],\"reasons\":[\"Baseline fits\"]}")
            );
            mockMlService.start();
            mockMlServiceUrl = "http://127.0.0.1:" + mockMlService.getAddress().getPort();
        } catch (IOException e) {
            throw new RuntimeException("Failed to start mock ML service", e);
        }
    }

    @AfterAll
    static void stopMockMlService() {
        if (mockMlService != null) {
            mockMlService.stop(0);
        }
    }

    @DynamicPropertySource
    static void registerProperties(DynamicPropertyRegistry registry) {
        startMockMlService();
        registry.add("ml.service.url", () -> mockMlServiceUrl);
        registry.add("frontend.url", () -> "https://mortgage-optimizer.vercel.app");
    }

    @Test
    void statusRouteReturnsHealthPayload() throws Exception {
        mockMvc.perform(get("/api/mortgage/status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("running"))
                .andExpect(jsonPath("$.app").value("Mortgage Optimizer Backend"));
    }

    @Test
    void preflightRequestReturnsCorsHeaders() throws Exception {
        mockMvc.perform(options("/api/mortgage/approval")
                        .header("Origin", "https://mortgage-optimizer.vercel.app")
                        .header("Access-Control-Request-Method", "POST")
                        .header("Access-Control-Request-Headers", "content-type"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "https://mortgage-optimizer.vercel.app"))
                .andExpect(header().string("Access-Control-Allow-Headers", "content-type"));
    }

    @Test
    void approvalRouteProxiesToMlService() throws Exception {
        String payload = """
                {
                  "age": 35,
                  "employment_type": "full_time",
                  "employment_years": 8,
                  "income_monthly": 7000,
                  "credit_score": 720,
                  "property_value": 500000,
                  "mortgage_balance": 300000,
                  "amortization_remaining": 20,
                  "monthly_payment_current": 1800,
                  "expenses_monthly": 2000,
                  "debt_payments_monthly": 500,
                  "interest_rate_current": 3.5,
                  "rate_type": "fixed",
                  "pref_low_payment": 0.5,
                  "pref_flexibility": 0.5,
                  "pref_stability": 0.5,
                  "pref_fast_payoff": 0.5,
                  "pref_equity_growth": 0.5,
                  "pref_risk_tolerance": 0.5,
                  "steady_payment": 1
                }
                """;

        mockMvc.perform(post("/api/mortgage/approval")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.decision").value("PASS"))
                .andExpect(jsonPath("$.rate_type").value("Fixed"));
    }

    @Test
    void strategyRouteProxiesToMlService() throws Exception {
        String payload = """
                {
                  "age": 35,
                  "employment_type": "full_time",
                  "employment_years": 8,
                  "income_monthly": 7000,
                  "credit_score": 720,
                  "property_value": 500000,
                  "mortgage_balance": 300000,
                  "amortization_remaining": 20,
                  "monthly_payment_current": 1800,
                  "expenses_monthly": 2000,
                  "debt_payments_monthly": 500,
                  "interest_rate_current": 3.5,
                  "rate_type": "fixed",
                  "pref_low_payment": 0.5,
                  "pref_flexibility": 0.5,
                  "pref_stability": 0.5,
                  "pref_fast_payoff": 0.5,
                  "pref_equity_growth": 0.5,
                  "pref_risk_tolerance": 0.5,
                  "steady_payment": 1
                }
                """;

        mockMvc.perform(post("/api/mortgage/strategy")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.strategy").value("baseline"))
                .andExpect(jsonPath("$.rate_type").value("Fixed"));
    }

    private static void writeJson(HttpExchange exchange, String body) throws IOException {
        byte[] response = body.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().add("Content-Type", "application/json");
        exchange.sendResponseHeaders(200, response.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response);
        }
    }
}
