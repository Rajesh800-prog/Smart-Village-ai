import { Link } from 'react-router-dom';
import { Leaf, CloudRain, ShoppingBag, Sprout, TrendingUp, Sparkles, ArrowRight, Zap, ShieldCheck, Globe } from 'lucide-react';
import './Home.css';
import heroImg from '../assets/hero_illustration.png';

const features = [
  { 
    icon: "🌦", 
    title: "Weather Intelligence", 
    desc: "Real-time updates and AI farming advice based on your local climate.", 
    link: "/weather",
    bg: "#e3f2fd",
    color: "#1976d2"
  },
  { 
    icon: "🌱", 
    title: "Crop Recommendation", 
    desc: "Find the most profitable crops for your specific soil type and season.", 
    link: "/recommendation",
    bg: "#e8f5e9",
    color: "var(--primary)"
  },
  { 
    icon: "🦠", 
    title: "Disease Detection", 
    desc: "Instant diagnosis and treatment suggestions for 30+ crop diseases.", 
    link: "/disease-detection",
    bg: "#f1f8e9",
    color: "#388e3c"
  },
  { 
    icon: "📈", 
    title: "Market Insights", 
    desc: "Live mandi rates and price trends to help you sell at the best time.", 
    link: "/marketplace",
    bg: "#fff3e0",
    color: "#f57c00"
  },
  { 
    icon: "🛒", 
    title: "Farmer Marketplace", 
    desc: "Direct access to buyers. Sell your harvest without any middleman.", 
    link: "/marketplace",
    bg: "#f3e5f5",
    color: "#7b1fa2"
  }
];

const Home = () => {
  return (
    <div className="home-container">
      {/* ── HERO SECTION ── */}
      <section className="home-hero">
        <div className="hero-content-wrap">
          <div className="hero-text">
            <div className="hero-tag">
              <Sparkles size={16} /> Empowering Rural Innovation
            </div>
            <h1 className="hero-headline">
              Empowering Farmers with <strong>Artificial Intelligence</strong>
            </h1>
            <p className="hero-subheadline">
              Smart Village AI helps farmers improve crop productivity, detect diseases instantly, and access live market prices to make smarter farming decisions.
            </p>
            <div className="hero-ctas">
              <Link to="/register" className="btn btn-primary">
                Get Started Free <ArrowRight size={20} />
              </Link>
              <Link to="/dashboard" className="btn btn-outline">
                Explore Features
              </Link>
            </div>
            
            <div className="hero-stats mt-4" style={{ display: 'flex', gap: '2rem', marginTop: '3rem', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.8rem' }}>10k+</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Active Farmers</p>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.8rem' }}>95%</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>AI Accuracy</p>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.8rem' }}>24/7</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Smart Advice</p>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <img src={heroImg} alt="Smart Farming AI" className="hero-illustration" />
          </div>
        </div>
      </section>

      {/* ── FEATURE HIGHLIGHTS ── */}
      <section className="feature-highlights">
        <div className="intro-text-center" style={{ maxWidth: '800px', margin: '0 auto 4rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Smarter Tools for Modern Farming</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            Our integrated platform brings the world's most advanced AI models directly to your fingertips, optimized for field use.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <Link to={f.link} key={i} className="feature-card" style={{ textDecoration: 'none' }}>
              <div className="feature-icon-box" style={{ backgroundColor: f.bg }}>
                <span style={{ fontSize: '2rem' }}>{f.icon}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem' }}>
                Try Tool <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── TRUST SECTION ── */}
      <section style={{ padding: '5rem 1rem', textAlign: 'center' }}>
        <h2 className="mb-4">Trusted by Village Communities</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="glass-card p-4 flex items-center gap-2" style={{ minWidth: '200px' }}>
            <Zap size={24} className="text-primary" />
            <span style={{ fontWeight: 700 }}>Fast Analysis</span>
          </div>
          <div className="glass-card p-4 flex items-center gap-2" style={{ minWidth: '200px' }}>
            <ShieldCheck size={24} className="text-primary" />
            <span style={{ fontWeight: 700 }}>Secure Data</span>
          </div>
          <div className="glass-card p-4 flex items-center gap-2" style={{ minWidth: '200px' }}>
            <Globe size={24} className="text-primary" />
            <span style={{ fontWeight: 700 }}>Local Support</span>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '4rem 1rem 8rem' }}>
        <div className="card text-center" style={{ 
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
          padding: '4rem 2rem',
          borderRadius: '40px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="bg-blob" style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'white', opacity: 0.1 }}></div>
          
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to Transform Your Farm?</h2>
          <p style={{ opacity: 0.9, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Join thousands of farmers using Smart Village AI to increase their yield and secure their future.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/register" className="btn btn-secondary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
