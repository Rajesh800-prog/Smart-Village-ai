import { useNavigate } from 'react-router-dom';
import { CloudRain, Sprout, Leaf, TrendingUp, ShoppingBag, Sun, Wind, Droplets, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const weatherData = {
    temp: 32,
    condition: "Sunny",
    advice: "Perfect day for harvesting tomatoes. Maintain moderate irrigation.",
    humidity: "65%",
    wind: "12 km/h"
  };

  const menuCards = [
    { title: "Disease Detection", desc: "Scan crops for instant AI diagnosis", icon: <Leaf size={28} />, path: "/disease-detection", color: "var(--primary)" },
    { title: "Crop Advice", desc: "Best seeds and soil recommendations", icon: <Sprout size={28} />, path: "/recommendation", color: "#fb8c00" },
    { title: "Weather Alerts", desc: "Storm warnings and frost protection", icon: <CloudRain size={28} />, path: "/weather", color: "#1e88e5" },
    { title: "Market Prices", desc: "Live mandi rates for 15+ crops", icon: <TrendingUp size={28} />, path: "/marketplace", color: "#43a047" },
    { title: "Marketplace", desc: "Sell direct to buyers with no middleman", icon: <ShoppingBag size={28} />, path: "/marketplace", color: "#8e24aa" },
  ];

  return (
    <div className="dashboard-modern">
      {/* Background Decor */}
      <div className="bg-blob" style={{ top: '10%', right: '5%' }}></div>
      <div className="bg-blob" style={{ bottom: '5%', left: '0%', opacity: 0.1 }}></div>

      <div className="flex items-center justify-between mb-4">
        <h1 style={{ margin: 0 }}>Farmer Dashboard</h1>
        <div style={{ background: '#e8f5e9', padding: '0.5rem 1rem', borderRadius: '30px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700 }}>
          📍 Nashik, Maharashtra
        </div>
      </div>

      {/* ── PREMIUM WEATHER WIDGET ── */}
      <div className="glass-card mb-4" style={{ 
        padding: '2rem', 
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        border: 'none'
      }}>
        <div className="bg-blob" style={{ top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)' }}></div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Sun size={80} color="var(--secondary)" style={{ filter: 'drop-shadow(0 0 20px rgba(251, 192, 45, 0.4))' }} />
            <div>
              <h2 style={{ color: 'white', fontSize: '4rem', margin: 0, lineHeight: 1 }}>{weatherData.temp}°C</h2>
              <p style={{ opacity: 0.9, fontSize: '1.1rem', fontWeight: 600 }}>{weatherData.condition} · Good Farming Day</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <div className="text-center">
              <Droplets size={24} color="rgba(255,255,255,0.7)" style={{ margin: '0 auto 0.5rem' }} />
              <p style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.7 }}>Humidity</p>
              <h3 style={{ color: 'white', margin: 0 }}>{weatherData.humidity}</h3>
            </div>
            <div className="text-center">
              <Wind size={24} color="rgba(255,255,255,0.7)" style={{ margin: '0 auto 0.5rem' }} />
              <p style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.7 }}>Wind</p>
              <h3 style={{ color: 'white', margin: 0 }}>{weatherData.wind}</h3>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.15)', 
            backdropFilter: 'blur(10px)', 
            padding: '1.25rem', 
            borderRadius: '20px', 
            flex: '1', 
            minWidth: '280px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <p style={{ color: 'white', margin: '0 0 0.5rem', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>💡 AI Farming Advice</p>
            <p style={{ color: 'white', margin: 0, lineHeight: 1.5, fontSize: '1rem', fontStyle: 'italic' }}>"{weatherData.advice}"</p>
          </div>
        </div>
      </div>

      <div className="section-header mt-4"><h3>AI Farming Tools</h3></div>
      
      {/* ── TOOL CARDS ── */}
      <div className="grid grid-3 mb-4">
        {menuCards.map((card, i) => (
          <div key={i} className="card" onClick={() => navigate(card.path)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', minHeight: '200px' }}>
            <div style={{ 
              width: '56px', height: '56px', 
              background: `${card.color}15`, 
              color: card.color, 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: '1.25rem' 
            }}>
              {card.icon}
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>{card.title}</h3>
            <p style={{ fontSize: '0.9rem', flexGrow: 1 }}>{card.desc}</p>
            <div className="card-action" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', marginTop: '1rem' }}>
              Open Tool <ArrowRight size={16} className="arrow" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
