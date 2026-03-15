import { Link } from 'react-router-dom';
import { Leaf, CloudRain, ShoppingCart, Sprout, TrendingUp } from 'lucide-react';

const services = [
  { icon: <Leaf size={36} color="#388e3c" />, bg: '#f1f8e9', title: "Disease Detection", desc: "Upload a photo of your sick plant for instant AI diagnosis.", link: "/disease-detection" },
  { icon: <CloudRain size={36} color="#1976d2" />, bg: '#e3f2fd', title: "Weather Alerts", desc: "Timely forecasts and alerts to protect your harvest.", link: "/weather" },
  { icon: <Sprout size={36} color="var(--primary)" />, bg: '#e8f5e9', title: "Crop Recommendation", desc: "AI suggests the best crop for your soil and season.", link: "/recommendation" },
  { icon: <TrendingUp size={36} color="#f57c00" />, bg: '#fff3e0', title: "Market Prices", desc: "See today's live mandi prices before you sell.", link: "/marketplace" },
  { icon: <ShoppingCart size={36} color="#7b1fa2" />, bg: '#f3e5f5', title: "Farmer Marketplace", desc: "Sell your crops directly to buyers — no middlemen.", link: "/marketplace" },
];

const Home = () => (
  <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
    {/* Hero */}
    <div style={{
      background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--primary-dark) 100%)',
      borderRadius: '20px',
      padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
      color: 'white',
      marginBottom: '2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* BG decoration */}
      <Sprout size={200} color="rgba(255,255,255,0.06)" style={{ position: 'absolute', right: -40, top: -60, pointerEvents: 'none' }} />
      
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.9rem', marginBottom: '1rem' }}>
          🌾 AI-Powered Farming Platform
        </div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
          Welcome to Smart Village AI
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '560px', margin: '0.75rem auto 2rem', opacity: 0.9 }}>
          Empowering farmers with Artificial Intelligence to improve crop productivity and income.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/disease-detection" className="btn" style={{ background: 'white', color: 'var(--primary-dark)', minWidth: '160px' }}>
            🔬 Detect Disease
          </Link>
          <Link to="/dashboard" className="btn btn-outline" style={{ borderColor: 'white', color: 'white', minWidth: '160px' }}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>

    {/* Services */}
    <h2 className="text-center mb-2" style={{ color: 'var(--primary-dark)' }}>🌟 Our AI-Powered Services</h2>
    <p className="text-center text-muted mb-4">Everything you need to farm smarter</p>
    <div className="grid grid-3" style={{ gap: '1rem' }}>
      {services.map((s, i) => (
        <Link to={s.link} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card text-center" style={{ border: '1px solid var(--gray-light)', transition: 'all 0.25s' }}>
            <div style={{ backgroundColor: s.bg, padding: '1rem', borderRadius: '14px', display: 'inline-flex', marginBottom: '0.75rem' }}>
              {s.icon}
            </div>
            <h3 style={{ marginBottom: '0.4rem' }}>{s.title}</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{s.desc}</p>
          </div>
        </Link>
      ))}
    </div>

    {/* CTA Banner */}
    <div className="mt-4" style={{ background: '#e8f5e9', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <h3 style={{ color: 'var(--primary-dark)', margin: 0 }}>Ready to start farming smarter?</h3>
        <p className="text-muted" style={{ margin: '0.25rem 0 0' }}>Create your free farmer account today.</p>
      </div>
      <Link to="/register" className="btn btn-primary">🚀 Get Started Free</Link>
    </div>
  </div>
);

export default Home;
