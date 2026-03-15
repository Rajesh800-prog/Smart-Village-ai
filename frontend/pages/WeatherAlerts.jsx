import { Sun, CloudRain, Wind, Droplets, Thermometer, MapPin, Calendar, Sparkles, CloudLightning, Edit2, Check, Loader2, Info, Droplet, Sprout, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../styles/WeatherAlerts.css';

const weatherData = {
  location: "Nashik, Maharashtra",
  temp: 31,
  feelsLike: 34,
  humidity: 62,
  windSpeed: 14,
  condition: "Partly Cloudy",
  rainChance: 65,
  uvIndex: 7,
};

const forecast = [
  { day: "Mon", icon: <Sun size={32} color="#fbc02d" />, high: 32, low: 22, rain: 10, active: true },
  { day: "Tue", icon: <CloudRain size={32} color="#1976d2" />, high: 27, low: 20, rain: 75 },
  { day: "Wed", icon: <CloudLightning size={32} color="#4527a0" />, high: 25, low: 19, rain: 80 },
  { day: "Thu", icon: <Wind size={32} color="#78909c" />, high: 28, low: 21, rain: 20 },
  { day: "Fri", icon: <Sun size={32} color="#fbc02d" />, high: 31, low: 22, rain: 5 },
  { day: "Sat", icon: <Sun size={32} color="#fbc02d" />, high: 33, low: 23, rain: 5 },
  { day: "Sun", icon: <Sun size={32} color="#f57c00" />, high: 36, low: 25, rain: 0 },
];

const WeatherAlerts = () => {
  const { currentUser, farmerProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newLoc, setNewLoc] = useState(farmerProfile?.village || "Nashik, Maharashtra");
  const [locLoading, setLocLoading] = useState(false);

  const location = farmerProfile?.village || "Nashik, Maharashtra";
  const isRainWarning = weatherData.rainChance > 60;

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

  const currentFarmingAdvice = [
    { 
      category: "Irrigation", 
      advice: "Soil moisture is sufficient due to upcoming rain. No irrigation needed today.", 
      icon: <Droplet color="#2196f3" />, 
      color: "#e3f2fd" 
    },
    { 
      category: "Pesticide Spray", 
      advice: "Avoid spraying today. High probability of rain (65%) will wash away the treatment.", 
      icon: <Info color="#f44336" />, 
      color: "#ffebee" 
    },
    { 
      category: "Harvesting", 
      advice: "If harvest is ready, move to storage immediately before tomorrow's showers.", 
      icon: <Sprout color="#4caf50" />, 
      color: "#e8f5e9" 
    },
  ];

  return (
    <div className={`weather-page ${isRainWarning ? 'is-raining' : ''}`}>
      {/* BACKGROUND DECORATION */}
      <div className="bg-blob" style={{ top: '-10%', left: '-10%' }}></div>
      <div className="bg-blob" style={{ bottom: '10%', right: '0%', opacity: 0.1 }}></div>

      {/* HERO WEATHER CARD */}
      <div className={`weather-hero ${isRainWarning ? 'rain-theme' : 'sunny-theme'}`}>
        {/* ANIMATION LAYERS */}
        <div className="hero-anim-overlay">
          {!isRainWarning && <div className="sun-glow"></div>}
          <div className="cloud-drift" style={{ top: '10%' }}>☁️</div>
          <div className="cloud-drift" style={{ top: '30%', animationDelay: '10s', opacity: 0.1 }}>☁️</div>
          <div className="rain-drops"></div>
        </div>

        <div className="weather-hero-inner">
          <div className="weather-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div className="weather-location">
              <MapPin size={18} />
              {isEditing ? (
                <div className="loc-edit-wrap">
                  <input 
                    value={newLoc} 
                    onChange={(e) => setNewLoc(e.target.value)}
                    placeholder="Enter village"
                  />
                  <button onClick={handleUpdateLocation}><Check size={14} /></button>
                </div>
              ) : (
                <>
                  <span>{location}</span>
                  <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.7 }}>
                    <Edit2 size={14} />
                  </button>
                </>
              )}
            </div>
            <div className="weather-badge safe">Updated Now</div>
          </div>

          <div className="weather-main-display" style={{ display: 'flex', alignItems: 'center', gap: '2rem', margin: '3rem 0' }}>
            <h1 className="temp-big">{weatherData.temp}°C</h1>
            <div>
              <p className="weather-condition-text" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                {weatherData.condition}
              </p>
              <p style={{ margin: 0, opacity: 0.8 }}>Feels like {weatherData.feelsLike}°C</p>
            </div>
          </div>

          <div className="weather-stats-panel">
            <div className="weather-stat">
              <p>Humidity</p>
              <h3>{weatherData.humidity}%</h3>
            </div>
            <div className="weather-stat">
              <p>Wind Speed</p>
              <h3>{weatherData.windSpeed} km/h</h3>
            </div>
            <div className="weather-stat">
              <p>Rain Luck</p>
              <h3>{weatherData.rainChance}%</h3>
            </div>
            <div className="weather-stat">
              <p>UV Index</p>
              <h3>{weatherData.uvIndex}/11</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="section-header-wrap mb-4">
        <h2 style={{ margin: 0 }}><Sparkles size={24} color="var(--primary)" /> AI Farming Strategist</h2>
        <p className="text-muted" style={{ margin: '0.25rem 0 0' }}>Based on local weather, here are your recommended actions.</p>
      </div>

      <div className="grid grid-3 mb-4" style={{ gap: '1.5rem' }}>
        {currentFarmingAdvice.map((card, i) => (
          <div key={i} className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              background: card.color, 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              {card.icon}
            </div>
            <h4 style={{ margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', color: 'var(--gray)' }}>
              {card.category}
            </h4>
            <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-dark)', lineHeight: 1.5 }}>
              "{card.advice}"
            </p>
          </div>
        ))}
      </div>

      <div className="section-header-wrap mt-5 mb-3">
        <h3><Calendar size={20} color="var(--primary)" /> 7-Day Outlook</h3>
      </div>
      <div className="forecast-grid">
        {forecast.map((day, i) => (
          <div key={i} className={`forecast-card ${day.active ? 'active' : ''}`}>
            <p className="forecast-day">{day.day}</p>
            <div className="forecast-icon">{day.icon}</div>
            <h3 style={{ margin: 0 }}>{day.high}°</h3>
            <p style={{ margin: 0, opacity: 0.7 }}>{day.low}°</p>
            {day.rain > 30 && (
              <div style={{ marginTop: '0.5rem', background: 'rgba(33,150,243,0.1)', color: '#1976d2', fontSize: '0.7rem', fontWeight: 800, padding: '4px 8px', borderRadius: '8px' }}>
                {day.rain}% Rain
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default WeatherAlerts;
