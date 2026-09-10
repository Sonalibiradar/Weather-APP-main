package com.weatherapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OpenMeteoResponse {

    @Data
    public static class Response {
        private double latitude;
        private double longitude;

        @JsonProperty("current_weather")
        private CurrentWeather currentWeather;
    }

    @Data
    public static class CurrentWeather {
        private double temperature;
        private double windspeed;
        private double winddirection;
        private int weathercode;
        @JsonProperty("is_day")
        private int isDay;
        private String time;
    }
}
