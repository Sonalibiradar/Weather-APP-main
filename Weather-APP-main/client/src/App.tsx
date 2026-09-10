import { useState } from 'react';
import { SearchBox } from './components/SearchBox';
import { WeatherCard } from './components/WeatherCard';
import { fetchWeather, WeatherData } from './services/api';
import './index.css';

function App() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bgImage, setBgImage] = useState<string>('url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000")');

    const getBackground = (code: number, isDay: boolean): string => {
        if (code === 0 || code === 1) {
            return isDay 
              ? 'url("https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=2000")'
              : 'url("https://images.unsplash.com/photo-1532074550055-688dd68d778e?q=80&w=2000")';
        }
        if (code >= 2 && code <= 48) return 'url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2000")';
        if (code >= 50 && code <= 67) return 'url("https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2000")';
        if (code >= 71 && code <= 77) return 'url("https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2000")';
        if (code >= 95) return 'url("https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2000")';
        return 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000")';
    };

    if (typeof document !== 'undefined') {
        document.body.style.backgroundImage = bgImage;
    }

    const handleSearch = async (city: string) => {
        setLoading(true);
        setError(null);
        setWeather(null);

        try {
            const data = await fetchWeather(city);
            setWeather(data);
            setBgImage(getBackground(data.weatherCode, data.isDay));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Weather Scope</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Real-time weather data at your fingertips</p>
            </header>

            <SearchBox onSearch={handleSearch} />

            {loading && <div className="spinner" />}

            {error && (
                <div className="glass-panel error-msg">
                    {error}
                </div>
            )}

            {weather && <WeatherCard data={weather} />}
        </div>
    );
}

export default App;
