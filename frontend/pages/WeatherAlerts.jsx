import { Sun, CloudRain, Wind, Droplets, Thermometer, MapPin, Calendar, Sparkles, CloudLightning, Edit2, Check, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../styles/WeatherAlerts.css';

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
  { day: "Today", icon: <Sun size={32} color="#fbc02d" />, high: 32, low: 22, rain: 10, active: true },
  { day: "Tue", icon: <CloudRain size={32} color="#1976d2" />, high: 27, low: 20, rain: 75 },
  { day: "Wed", icon: <CloudLightning size={32} color="#4527a0" />, high: 25, low: 19, rain: 80 },
  { day: "Thu", icon: <Wind size={32} color="#78909c" />, high: 28, low: 21, rain: 20 },
  { day: "Fri", icon: <Sun size={32} color="#fbc02d" />, high: 31, low: 22, rain: 5 },
  { day: "Sat", icon: <Sun size={32} color="#fbc02d" />, high: 33, low: 23, rain: 5 },
  { day: "Sun", icon: <Sun size={32} color="#f57c00" />, high: 36, low: 25, rain: 0 },
];

const alerts = [
  {
    type: "rain",
    icon: <CloudRain size={24} />,
    title: "Heavy Rain Warning",
    message: "Expect heavy showers. Harvest stored crops and cover fields.",
    color: "#1565c0",
    bg: "#e3f2fd",
    border: "#1976d2",
  },
  {
    type: "heat",
    icon: <Thermometer size={24} />,
    title: "Heat Wave Alert",
    message: "Temperatures reaching 36°C. Increase irrigation for sensitive crops.",
    color: "#bf360c",
    bg: "#fff3e0",
    border: "#e64a19",
  },
];

const farmingAdvice = [
  { icon: "💧", tip: "High humidity detected. Monitor and spray for fungal protection." },
  { icon: "🌧️", tip: "Rain expected soon. Avoid applying fertilizer today." },
  { icon: "☀️", tip: "UV index is high. Schedule outdoor work for early morning." },
];

const WeatherAlerts = () => {
  const { currentUser, farmerProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newLoc, setNewLoc] = useState(farmerProfile?.village || "Nashik, Maharashtra");
  const [locLoading, setLocLoading] = useState(false);

  const location = farmerProfile?.village || "Farmer Location";
  const isRainWarning = weatherData.rainChance > 60;
  const isHeatWarning = weatherData.temp > 30;

  const handleUpdateLocation = async () => {
    if (!currentUser) {
      toast.error("Please login to save your location.");
      return;
    }
    setLocLoading(true);
    try {
      await updateDoc(doc(db, 'farmers', currentUser.uid), {
        village: newLoc
      });
      toast.success("Location updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Update Location Error:", err);
      toast.error("Failed to update location.");
    }
    setLocLoading(false);
  };

  return (
    <div className="weather-page">
      {/* BACKGROUND DECORATION */}
      <div className="bg-blob" style={{ top: '-10%', left: '-10%' }}></div>
      <div className="bg-blob" style={{ bottom: '10%', right: '0%', opacity: 0.1 }}></div>

      {/* HERO WEATHER CARD */}
      <div className={`weather-hero card mb-4 ${isRainWarning ? 'rain-theme' : 'sunny-theme'}`}>
        <div className="weather-hero-inner">
          <div className="weather-location">
            <MapPin size={18} />
            {isEditing ? (
              <div className="loc-edit-wrap">
                <input 
                  value={newLoc} 
                  onChange={(e) => setNewLoc(e.target.value)}
                  placeholder="Enter village/city"
                  autoFocus
                />
                <button onClick={handleUpdateLocation} disabled={locLoading}>
                  {locLoading ? <Loader2 className="spin" size={14} /> : <Check size={14} />}
                </button>
              </div>
            ) : (
              <>
                <span>{location}</span>
                <button className="edit-loc-btn" onClick={() => setIsEditing(true)}>
                  <Edit2 size={14} />
                </button>
              </>
            )}
          </div>

          <div className="weather-main">
            <div className="weather-temp-block">
              {isRainWarning
                ? <CloudRain size={100} className="weather-main-icon" color="white" />
                : <Sun size={100} className="weather-main-icon" color="white" />}
              <div>
                <h1 className="temp-big">{weatherData.temp}°C</h1>
                <p className="feels-like">Feels like {weatherData.feelsLike}°C · {weatherData.condition}</p>
              </div>
            </div>

            <div className="weather-stats-panel">
              <div className="weather-stat">
                <div className="stat-icon-wrap"><Droplets size={20} color="white" /></div>
                <div><p>Humidity</p><h3>{weatherData.humidity}%</h3></div>
              </div>
              <div className="weather-stat">
                <div className="stat-icon-wrap"><Wind size={20} color="white" /></div>
                <div><p>Wind</p><h3>{weatherData.windSpeed} km/h</h3></div>
              </div>
              <div className="weather-stat">
                <div className="stat-icon-wrap"><CloudRain size={20} color="white" /></div>
                <div><p>Rain</p><h3>{weatherData.rainChance}%</h3></div>
              </div>
              <div className="weather-stat">
                <div className="stat-icon-wrap"><Sun size={20} color="white" /></div>
                <div><p>UV Index</p><h3>{weatherData.uvIndex}/11</h3></div>
              </div>
            </div>
          </div>

          <div className="weather-badges">
            {isRainWarning && <span className="weather-badge rain">🌧️ Rain Warning</span>}
            {isHeatWarning && <span className="weather-badge heat">🌡️ Heat Warning</span>}
            <span className="weather-badge safe">✅ Updated 2 mins ago</span>
          </div>
        </div>
      </div>

      <div className="grid grid-2 mb-4">
        {/* ALERTS */}
        <div className="glass-card p-4">
          <h3 className="section-title mt-2 mb-4">⚠️ Active Alerts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {alerts.map((alert, i) => (
              <div key={i} className="alert-card" style={{ borderLeft: `5px solid ${alert.border}` }}>
                <div style={{ color: alert.color }}>{alert.icon}</div>
                <div>
                  <h4 style={{ color: alert.color, margin: 0 }}>{alert.title}</h4>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem' }}>{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI FARMING ADVICE */}
        <div className="glass-card p-4">
          <h3 className="section-title mt-2 mb-4"><Sparkles size={20} className="text-primary" /> AI Farming Advice</h3>
          <div className="advice-list">
            {farmingAdvice.map((item, i) => (
              <div key={i} className="advice-item">
                <span className="advice-emoji">{item.icon}</span>
                <p style={{ margin: 0 }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-DAY FORECAST */}
      <h3 className="section-title"><Calendar size={20} /> 7-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day, i) => (
          <div key={i} className={`forecast-card ${day.active ? 'active' : ''}`}>
            <p className="forecast-day">{day.day}</p>
            <div className="forecast-icon">{day.icon}</div>
            <h3 style={{ margin: 0 }}>{day.high}°</h3>
            <p className="forecast-low" style={{ margin: 0 }}>{day.low}°</p>
            {day.rain > 30 && <span className="rain-tag">{day.rain}% Rain</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts;
