package com.weatherapi.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WeatherResponse {
    private String city;
    private String country;
    private double latitude;
    private double longitude;
    private double temperature;
    private double windSpeed;
    private int weatherCode;  // WMO Weather interpretation code
    private boolean isDay;
    private String localTime;
    
    // Additional helpers for the frontend can be mapped here or handled in frontend
}
