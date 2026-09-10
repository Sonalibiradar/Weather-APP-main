package com.weatherapi.service;

import com.weatherapi.client.OpenMeteoClient;
import com.weatherapi.model.GeocodingResponse;
import com.weatherapi.model.OpenMeteoResponse;
import com.weatherapi.model.WeatherResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WeatherService {

    private final OpenMeteoClient openMeteoClient;

    @Cacheable(value = "weather", key = "#city.toLowerCase()")
    public Optional<WeatherResponse> getWeatherForCity(String city) {
        // 1. Get Coordinates
        Optional<GeocodingResponse.Result> geoResult = openMeteoClient.getCoordinates(city);
        
        if (geoResult.isEmpty()) {
            return Optional.empty();
        }
        
        GeocodingResponse.Result location = geoResult.get();
        
        // 2. Get Weather
        Optional<OpenMeteoResponse.Response> weatherResult = openMeteoClient.getWeather(location.getLatitude(), location.getLongitude());
        
        if (weatherResult.isEmpty()) {
            return Optional.empty();
        }
        
        OpenMeteoResponse.CurrentWeather current = weatherResult.get().getCurrentWeather();
        
        // 3. Map to DTO
        return Optional.of(WeatherResponse.builder()
                .city(location.getName())
                .country(location.getCountry())
                .latitude(location.getLatitude())
                .longitude(location.getLongitude())
                .temperature(current.getTemperature())
                .windSpeed(current.getWindspeed())
                .weatherCode(current.getWeathercode())
                .isDay(current.getIsDay() == 1)
                .localTime(current.getTime())
                .build());
    }
}
