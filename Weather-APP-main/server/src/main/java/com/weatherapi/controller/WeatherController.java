package com.weatherapi.controller;

import com.weatherapi.model.WeatherResponse;
import com.weatherapi.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // In production, restrict this.
@RequiredArgsConstructor
public class WeatherController {

    private final WeatherService weatherService;

    @GetMapping("/weather")
    public ResponseEntity<WeatherResponse> getWeather(@RequestParam String city) {
        return weatherService.getWeatherForCity(city)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
