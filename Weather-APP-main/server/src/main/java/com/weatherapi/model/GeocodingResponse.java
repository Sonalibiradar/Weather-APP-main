package com.weatherapi.model;

import lombok.Data;
import java.util.List;

@Data
public class GeocodingResponse {
    private List<Result> results;

    @Data
    public static class Result {
        private String name;
        private double latitude;
        private double longitude;
        private String country;
        private String admin1; // State/Region
    }
}
