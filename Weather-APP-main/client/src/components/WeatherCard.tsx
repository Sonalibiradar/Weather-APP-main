import React from 'react';
import { WeatherData } from '../services/api';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, Droplets } from 'lucide-react';

interface WeatherCardProps {
    data: WeatherData;
}

const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun size={64} color="#ffd700" />;
    if (code >= 1 && code <= 3) return <Cloud size={64} color="#d3d3d3" />;
    if (code >= 51 && code <= 67) return <CloudRain size={64} color="#a0c4ff" />;
    if (code >= 71 && code <= 77) return <CloudSnow size={64} color="#e0fbfc" />;
    if (code >= 95) return <CloudLightning size={64} color="#ffd166" />;
    return <Cloud size={64} color="#d3d3d3" />;
};

const getWeatherDescription = (code: number): string => {
    const codes: Record<number, string> = {
        0: "Clear Sky",
        1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
        45: "Fog", 48: "Depositing Rime Fog",
        51: "Light Drizzle", 53: "Moderate Drizzle", 55: "Dense Drizzle",
        61: "Slight Rain", 63: "Moderate Rain", 65: "Heavy Rain",
        80: "Slight Showers", 81: "Moderate Showers", 82: "Violent Showers",
        95: "Thunderstorm"
    };
    return codes[code] || "Unknown";
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
    return (
        <div className="glass-panel" style={{ marginTop: '3rem', textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '1px', marginBottom: '0.5rem' }}>
                {data.city}, {data.country}
            </div>
            <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>
                {data.localTime.replace('T', ' ')}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }}>
                    {getWeatherIcon(data.weatherCode)}
                </div>
                <div style={{ fontSize: '5rem', fontWeight: 700, textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                    {Math.round(data.temperature)}°
                </div>
            </div>

            <div style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '2rem', textTransform: 'capitalize' }}>
                {getWeatherDescription(data.weatherCode)}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                background: 'rgba(0,0,0,0.2)',
                padding: '1.5rem',
                borderRadius: '12px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                    <Wind size={24} color="#ffd700" />
                    <div style={{ textAlign: 'left' }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', opacity: 0.7 }}>Wind</span>
                        <span style={{ fontWeight: 600 }}>{data.windSpeed} km/h</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', opacity: 0.7 }}>Code</span>
                        <span style={{ fontWeight: 600 }}>WMO: {data.weatherCode}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
