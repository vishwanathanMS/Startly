import { useState, useEffect } from 'react';
import './Weather.css';

interface WeatherData {
    temp: number;
    condition: string;
    icon: string;
    location: string;
    humidity: number;
    windSpeed: number;
}

// Mock weather data - in production, you'd use a weather API
const MOCK_WEATHER: WeatherData = {
    temp: 22,
    condition: 'Partly Cloudy',
    icon: '⛅',
    location: 'Your City',
    humidity: 65,
    windSpeed: 12,
};

export default function Weather() {
    const [weather, setWeather] = useState<WeatherData>(MOCK_WEATHER);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Simulate loading weather data
        setLoading(true);
        setTimeout(() => {
            setWeather(MOCK_WEATHER);
            setLoading(false);
        }, 500);
    }, []);

    if (loading) {
        return (
            <div className="weather-widget glass">
                <div className="weather-loading">Loading weather...</div>
            </div>
        );
    }

    return (
        <div className="weather-widget glass">
            <div className="weather-header">
                <span className="weather-icon">{weather.icon}</span>
                <div className="weather-temp">{weather.temp}°C</div>
            </div>
            <div className="weather-condition">{weather.condition}</div>
            <div className="weather-location">📍 {weather.location}</div>
            <div className="weather-details">
                <div className="weather-detail">
                    <span className="detail-icon">💧</span>
                    <span>{weather.humidity}%</span>
                </div>
                <div className="weather-detail">
                    <span className="detail-icon">💨</span>
                    <span>{weather.windSpeed} km/h</span>
                </div>
            </div>
        </div>
    );
}
