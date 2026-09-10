package com.weatherapi.client;

import com.weatherapi.model.GeocodingResponse;
import com.weatherapi.model.OpenMeteoResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

@Component
public class OpenMeteoClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
    private static final String WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

    public Optional<GeocodingResponse.Result> getCoordinates(String city) {
        String url = UriComponentsBuilder.fromHttpUrl(GEOCODING_URL)
                .queryParam("name", city)
                .queryParam("count", 1)
                .queryParam("language", "en")
                .queryParam("format", "json")
                .toUriString();

        try {
            GeocodingResponse response = restTemplate.getForObject(url, GeocodingResponse.class);
            if (response != null && response.getResults() != null && !response.getResults().isEmpty()) {
                return Optional.of(response.getResults().get(0));
            }
        } catch (Exception e) {
            // Log error
            e.printStackTrace();
        }
        return Optional.empty();
    }

    public Optional<OpenMeteoResponse.Response> getWeather(double lat, double lon) {
        String url = UriComponentsBuilder.fromHttpUrl(WEATHER_URL)
                .queryParam("latitude", lat)
                .queryParam("longitude", lon)
                .queryParam("current_weather", true)
                .toUriString();

        try {
            return Optional.ofNullable(restTemplate.getForObject(url, OpenMeteoResponse.Response.class));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }
}
