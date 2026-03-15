import { useNavigate } from 'react-router-dom';
import { CloudRain, Sprout, Leaf, TrendingUp, ShoppingBag, Sun, Wind, Droplets, ArrowRight, MapPin, Sparkles, Zap, Bot } from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const weatherData = {
    temp: 31,
    condition: "Sunny",
    rainProb: "10%",
    advice: "Optimal weather for pesticide spraying. Avoid irrigation today if soil moisture is high.",
    humidity: "62%",
    wind: "14 km/h",
    location: "Warangal, Telangana"
  };

  const menuCards = [
    { 
      title: "Weather Intelligence 🌦", 
      desc: "Live temperature, rainfall predictions, and smart farming advice.", 
      icon: <CloudRain size={30} />, 
      path: "/weather", 
      color: "#1e88e5" 
    },
    { 
      title: "Crop Recommendation 🌱", 
      desc: "Choose the best crop based on your soil type, season and location.", 
      icon: <Sprout size={30} />, 
      path: "/recommendation", 
      color: "#fb8c00" 
    },
    { 
      title: "Plant Disease Detection 🦠", 
      desc: "Upload a plant image and detect diseases instantly using AI.", 
      icon: <Leaf size={30} />, 
      path: "/disease-detection", 
      color: "#43a047" 
    },
    { 
      title: "Crop Market Prices 📈", 
      desc: "Current mandi prices for rice, tomato, wheat, cotton and more.", 
      icon: <TrendingUp size={30} />, 
      path: "/marketplace", 
      color: "#2e7d32" 
    },
    { 
      title: "Farmer Marketplace 🛒", 
      desc: "Connect with buyers directly and list your crops for sale.", 
      icon: <ShoppingBag size={30} />, 
      path: "/marketplace", 
      color: "#8e24aa" 
    },
    { 
      title: "AI Farming Assistant 🤖", 
      desc: "Ask any farming question and get instant AI-powered expert guidance.", 
      icon: <Bot size={30} />, 
      path: "/ai-assistant", 
      color: "#00796b" 
    },
  ];

  /* Add Bot to imports if not there */

  return (
    <div className="dashboard-modern">
      {/* ─── HEADER ─── */}
      <div className="section-header-wrap">
        <div>
          <h1 style={{ margin: 0, fontSize: '2.2rem' }}>Farmer Dashboard</h1>
          <p className="text-muted" style={{ margin: '0.25rem 0 0' }}>Welcome back! Here's what's happening on your farm today.</p>
        </div>
        <div className="loc-pill">
          <MapPin size={18} />
          <span>{weatherData.location}</span>
        </div>
      </div>

      {/* ─── WEATHER HERO WIDGET ─── */}
      <section className="weather-hero">
        <div className="weather-stats-column">
          <div className="weather-main-stats">
            <div className="floating">
              <Sun size={100} color="#ffb300" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 179, 0, 0.4))' }} />
            </div>
            <div>
              <h2 className="temp-big">{weatherData.temp}°C</h2>
              <span className="weather-condition-text">{weatherData.condition} · Clear Sky</span>
            </div>
          </div>

          <div className="weather-sub-metrics">
            <div className="metric-item">
              <p className="metric-item-val">{weatherData.humidity}</p>
              <p className="metric-item-label">Humidity</p>
            </div>
            <div className="metric-item">
              <p className="metric-item-val">{weatherData.rainProb}</p>
              <p className="metric-item-label">Rain Prob.</p>
            </div>
            <div className="metric-item">
              <p className="metric-item-val">{weatherData.wind}</p>
              <p className="metric-item-label">Wind Speed</p>
            </div>
          </div>
        </div>

        <div className="weather-advice-wrap">
          <div className="weather-advice-box">
            <div className="advice-label">
              <Sparkles size={18} />
              AI Farming Insight
            </div>
            <p className="advice-text">"{weatherData.advice}"</p>
            <div style={{ marginTop: '1.2rem', display: 'flex', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '10px' }}>
                <Zap size={12} inline /> Low Risk
              </span>
              <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '10px' }}>
                📅 24h Window
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TOOL GRID ─── */}
      <div className="section-header-wrap" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Smart Farming Suite</h2>
      </div>

      <div className="dash-tool-grid">
        {menuCards.map((card, i) => (
          <div 
            key={i} 
            className="dash-tool-card" 
            onClick={() => navigate(card.path)}
          >
            <div className="card-icon-box" style={{ color: card.color }}>
              <div className="card-icon-bg" style={{ backgroundColor: card.color }}></div>
              {card.icon}
            </div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <button className="btn btn-primary card-action-btn">
              Explore Tool <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
