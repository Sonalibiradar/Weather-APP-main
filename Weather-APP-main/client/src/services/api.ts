export interface WeatherData {
    city: string;
    country: string;
    temperature: number;
    windSpeed: number;
    weatherCode: number;
    isDay: boolean;
    localTime: string;
    description?: string; // Derived on frontend
}

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchWeather = async (city: string): Promise<WeatherData> => {
    const response = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('City not found');
        }
        throw new Error('Failed to fetch weather data');
    }

    return response.json();
};
