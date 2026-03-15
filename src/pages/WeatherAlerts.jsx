import { Sun, CloudRain, Wind, Droplets, Thermometer, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';
import './WeatherAlerts.css';

const weatherData = {
  location: "Nashik, Maharashtra",
  temp: 32,
  feelsLike: 35,
  humidity: 70,
  windSpeed: 12,
  condition: "Mostly Sunny",
  rainChance: 65,
  uvIndex: 8,
};

const forecast = [
  { day: "Mon", icon: <Sun size={28} color="#fbc02d" />, high: 32, low: 22, rain: 10 },
  { day: "Tue", icon: <CloudRain size={28} color="#1976d2" />, high: 27, low: 20, rain: 75 },
  { day: "Wed", icon: <CloudRain size={28} color="#1976d2" />, high: 25, low: 19, rain: 80 },
  { day: "Thu", icon: <Wind size={28} color="#78909c" />, high: 28, low: 21, rain: 20 },
  { day: "Fri", icon: <Sun size={28} color="#fbc02d" />, high: 31, low: 22, rain: 5 },
  { day: "Sat", icon: <Sun size={28} color="#fbc02d" />, high: 33, low: 23, rain: 5 },
  { day: "Sun", icon: <Sun size={28} color="#f57c00" />, high: 36, low: 25, rain: 0 },
];

const alerts = [
  {
    type: "rain",
    icon: <CloudRain size={22} />,
    title: "Heavy Rain Warning",
    message: "Expect heavy showers on Tuesday and Wednesday. Harvest stored crops and cover fields.",
    color: "#1565c0",
    bg: "#e3f2fd",
    border: "#1976d2",
  },
  {
    type: "heat",
    icon: <Thermometer size={22} />,
    title: "Heat Wave Alert",
    message: "Sunday temperatures may reach 36°C. Increase irrigation and provide shade for seedlings.",
    color: "#bf360c",
    bg: "#fff3e0",
    border: "#e64a19",
  },
];

const farmingAdvice = [
  { icon: "💧", tip: "High humidity (70%) detected. Monitor for fungal diseases — especially in wheat and tomatoes." },
  { icon: "🌧️", tip: "Rain expected in 2 days. Delay fertilizer application to avoid nutrient runoff." },
  { icon: "☀️", tip: "UV index is high (8). Spray pesticides early morning or after sunset to avoid evaporation." },
  { icon: "💨", tip: "Wind speed is manageable today. Good day for foliar spray application." },
];

const WeatherAlerts = () => {
  const isRainWarning = weatherData.rainChance > 60;
  const isHeatWarning = weatherData.temp > 30;

  return (
    <div className="weather-page">
      {/* HERO WEATHER CARD */}
      <div className={`weather-hero card mb-4 ${isRainWarning ? 'rain-theme' : 'sunny-theme'}`}>
        <div className="weather-hero-inner">
          <div className="weather-location">
            <MapPin size={18} />
            <span>{weatherData.location}</span>
          </div>

          <div className="weather-main">
            <div className="weather-temp-block">
              {isRainWarning
                ? <CloudRain size={80} className="weather-main-icon" />
                : <Sun size={80} className="weather-main-icon" />}
              <div>
                <h1 className="temp-big">{weatherData.temp}°C</h1>
                <p className="feels-like">Feels like {weatherData.feelsLike}°C · {weatherData.condition}</p>
              </div>
            </div>

            <div className="weather-stats-grid">
              <div className="weather-stat">
                <Droplets size={22} />
                <div>
                  <p>Humidity</p>
                  <h3>{weatherData.humidity}%</h3>
                </div>
              </div>
              <div className="weather-stat">
                <Wind size={22} />
                <div>
                  <p>Wind Speed</p>
                  <h3>{weatherData.windSpeed} km/h</h3>
                </div>
              </div>
              <div className="weather-stat">
                <CloudRain size={22} />
                <div>
                  <p>Rain Chance</p>
                  <h3
                    style={{ color: isRainWarning ? '#ffcc02' : 'white' }}
                  >
                    {weatherData.rainChance}%
                  </h3>
                </div>
              </div>
              <div className="weather-stat">
                <Sun size={22} />
                <div>
                  <p>UV Index</p>
                  <h3 style={{ color: weatherData.uvIndex > 6 ? '#ffcc02' : 'white' }}>
                    {weatherData.uvIndex} / 11
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Color Indicator Badges */}
          <div className="weather-badges">
            {isRainWarning && (
              <span className="weather-badge rain">
                🌧️ Rain Warning
              </span>
            )}
            {isHeatWarning && (
              <span className="weather-badge heat">
                🌡️ Heat Warning
              </span>
            )}
            {!isRainWarning && !isHeatWarning && (
              <span className="weather-badge safe">
                ✅ Good Farming Conditions
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-2 mb-4">
        {/* ALERTS */}
        <div>
          <h3 className="section-title mb-2">⚠️ Active Alerts</h3>
          <div className="alerts-list">
            {alerts.map((alert, i) => (
              <div key={i} className="alert-card" style={{ backgroundColor: alert.bg, borderLeft: `4px solid ${alert.border}` }}>
                <div className="alert-icon" style={{ color: alert.color }}>{alert.icon}</div>
                <div>
                  <h4 style={{ color: alert.color, marginBottom: '0.25rem' }}>{alert.title}</h4>
                  <p style={{ margin: 0, color: '#555', lineHeight: 1.6 }}>{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI FARMING ADVICE */}
        <div>
          <h3 className="section-title mb-2">🌱 AI Farming Advice</h3>
          <div className="advice-list">
            {farmingAdvice.map((item, i) => (
              <div key={i} className="advice-item">
                <span className="advice-emoji">{item.icon}</span>
                <p>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-DAY FORECAST */}
      <h3 className="section-title mb-2">📅 7-Day Forecast</h3>
      <div className="forecast-scroll">
        {forecast.map((day, i) => (
          <div key={i} className={`forecast-card card text-center ${day.rain > 60 ? 'forecast-rain' : ''}`}>
            <p className="forecast-day">{day.day}</p>
            <div className="forecast-icon">{day.icon}</div>
            <p className="forecast-high">{day.high}°</p>
            <p className="forecast-low">{day.low}°</p>
            <div className="rain-pill" style={{ backgroundColor: day.rain > 60 ? '#bbdefb' : '#f5f5f5', color: day.rain > 60 ? '#1565c0' : '#9e9e9e' }}>
              {day.rain}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts;
