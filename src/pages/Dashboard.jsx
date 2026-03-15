import { Link } from 'react-router-dom';
import { CloudRain, Sprout, Leaf, TrendingUp, ShoppingCart, Sun, Wind, Droplets } from 'lucide-react';

const Dashboard = () => {
  const cards = [
    {
      title: "Weather Alerts",
      description: "Get real-time local weather forecasts and severe weather alerts to protect your crops.",
      icon: <CloudRain size={36} color="#1976d2" />,
      link: "/weather",
      bgColor: "#e3f2fd"
    },
    {
      title: "Crop Recommendation",
      description: "Discover the most profitable crops to plant based on your specific soil and climate data.",
      icon: <Sprout size={36} color="var(--primary)" />,
      link: "/recommendation",
      bgColor: "#e8f5e9"
    },
    {
      title: "Plant Disease Detection",
      description: "Upload a photo of your sick plants for instant AI diagnosis and treatment plans.",
      icon: <Leaf size={36} color="#388e3c" />,
      link: "/disease-detection",
      bgColor: "#f1f8e9"
    },
    {
      title: "Crop Market Price",
      description: "Check the latest live trading prices for your crops at local and national markets.",
      icon: <TrendingUp size={36} color="#f57c00" />,
      link: "/marketplace",
      bgColor: "#fff3e0"
    },
    {
      title: "Farmer Marketplace",
      description: "Sell your harvest directly to verified buyers. Bypass middlemen for better profits.",
      icon: <ShoppingCart size={36} color="#7b1fa2" />,
      link: "/marketplace",
      bgColor: "#f3e5f5"
    }
  ];

  return (
    <div className="dashboard-modern">
      <div className="mb-4">
        <h1 style={{ color: 'var(--primary-dark)', fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>Select an AI-powered tool below to optimize your farm's productivity.</p>
      </div>

      {/* Weather Widget */}
      <div className="card mb-4" style={{ 
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle background decoration */}
        <Sun size={200} color="rgba(255,255,255,0.1)" style={{ position: 'absolute', right: '-40px', top: '-60px' }} />

        <div className="flex justify-between items-center flex-wrap gap-4 relative z-10">
          <div>
            <h2 style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '0.2rem' }}>Nashik, Maharashtra</h2>
            <div className="flex items-center gap-4 mt-2">
              <Sun size={48} />
              <h1 style={{ fontSize: '3.5rem', margin: 0 }}>32°C</h1>
            </div>
            <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Mostly Sunny</p>
          </div>

          <div className="flex gap-4 flex-wrap" style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '12px', backdropFilter: 'blur(5px)' }}>
            <div className="text-center">
              <Droplets size={24} style={{ margin: '0 auto 0.5rem' }} />
              <p style={{ margin: 0, opacity: 0.8 }}>Humidity</p>
              <h3 style={{ margin: 0 }}>70%</h3>
            </div>
            <div className="text-center pl-4 border-l" style={{ borderLeft: '1px solid rgba(255,255,255,0.3)' }}>
              <Wind size={24} style={{ margin: '0 auto 0.5rem' }} />
              <p style={{ margin: 0, opacity: 0.8 }}>Wind Speed</p>
              <h3 style={{ margin: 0 }}>12 km/h</h3>
            </div>
            <div className="text-center pl-4 border-l" style={{ borderLeft: '1px solid rgba(255,255,255,0.3)' }}>
              <CloudRain size={24} style={{ margin: '0 auto 0.5rem' }} />
              <p style={{ margin: 0, opacity: 0.8 }}>Rain Prediction</p>
              <h3 style={{ margin: 0 }}>Possible Tomorrow</h3>
            </div>
          </div>
        </div>

        {/* AI Farming Advice specific to weather */}
        <div className="mt-4" style={{ backgroundColor: 'rgba(0,0,0,0.15)', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '4px solid #fbc02d' }}>
          <strong>🌟 AI Farming Advice: </strong> 
          High humidity detected. Monitor closely for fungal diseases today. Delay heavy irrigation as rain is expected tomorrow.
        </div>
      </div>

      <div className="grid grid-3 dashboard-cards">
        {cards.map((card, index) => (
          <Link to={card.link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card modern-card">
              <div style={{ backgroundColor: card.bgColor, padding: '1.2rem', borderRadius: '16px', display: 'inline-flex', marginBottom: '1rem' }}>
                {card.icon}
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>{card.title}</h3>
              <p className="text-muted" style={{ flexGrow: 1, marginBottom: '1.5rem', lineHeight: '1.6' }}>{card.description}</p>
              
              <div className="mt-auto text-primary font-bold flex items-center gap-2 card-action">
                Open Tool
                <span className="arrow">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
