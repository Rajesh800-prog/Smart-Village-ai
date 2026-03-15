import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut, MapPin, Crop, Sprout, Phone, Tractor, Star } from 'lucide-react';

const Profile = () => {
  const { currentUser, farmerProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!currentUser) {
    return (
      <div className="text-center" style={{ padding: '6rem 1rem' }}>
        <User size={80} color="var(--gray-light)" style={{ margin: '0 auto 1.5rem' }} />
        <h2 style={{ color: 'var(--primary-dark)', fontSize: '2rem' }}>Not Authenticated</h2>
        <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>Please sign in to access your farmer profile and farm data.</p>
        <Link to="/login" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>Sign In Now</Link>
      </div>
    );
  }

  const profile = farmerProfile || {};

  return (
    <div className="profile-page" style={{ maxWidth: '900px', margin: '0 auto', animation: 'fadeIn 0.6s ease-out' }}>
      {/* Premium Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1b5e20 0%, #003300 100%)',
        borderRadius: '35px',
        padding: '3.5rem 2.5rem',
        color: 'white',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,51,0,0.2)'
      }}>
        <Sprout size={180} color="rgba(255,255,255,0.05)" style={{ position: 'absolute', right: -30, bottom: -30 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', position: 'relative', flexWrap: 'wrap' }}>
          <div style={{
            width: 110, height: 110,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '35px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(12px)',
            border: '2px solid rgba(255,255,255,0.3)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
          }}>
            <User size={56} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '2.5rem', color: 'white' }}>{profile.name || currentUser.displayName || 'Farmer'}</h1>
            <p style={{ margin: '0.4rem 0 0', opacity: 0.8, fontSize: '1.1rem' }}>{profile.email || currentUser.email}</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
               <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Star size={14} fill="currentColor" /> Premium Account
              </span>
              <span style={{ background: 'rgba(76, 175, 80, 0.3)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, color: '#a5d6a7' }}>
                ID: 88492
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-2" style={{ gap: '2rem' }}>
        {/* Farm Identity Card */}
        <div className="card" style={{ padding: '2.5rem' }}>
          <div className="flex items-center gap-2 mb-4">
             <Tractor size={24} color="var(--primary)" />
             <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Farm Identity</h3>
          </div>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {[
              { label: 'Village Residence', value: profile.village || 'Not Set', icon: <MapPin size={20} /> },
              { label: 'Verified Phone', value: profile.phone || 'Not Set', icon: <Phone size={20} /> },
              { label: 'Cultivation Area', value: profile.farmSize ? `${profile.farmSize} Acres` : 'Not Set', icon: <Crop size={20} /> },
              { label: 'Primary Harvest', value: profile.mainCrop || 'Not Set', icon: <Sprout size={20} /> },
            ].map((item, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1.25rem', 
                background: '#f8fafc',
                borderRadius: '20px',
                border: '1px solid #f1f5f9'
              }}>
                <div style={{ color: 'var(--primary)', opacity: 0.8 }}>{item.icon}</div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{item.label}</p>
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)' }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="card" style={{ padding: '2.5rem' }}>
          <div className="flex items-center gap-2 mb-4">
             <Star size={24} color="var(--secondary)" />
             <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Farm Analytics</h3>
          </div>
          <p className="text-muted mb-4">Your AI-driven farming activity overview</p>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { label: 'Health Scans', value: '12', color: '#e8f5e9', sub: 'Last 30 days' },
              { label: 'Market Deals', value: '4', color: '#fff8e1', sub: 'Completed' },
              { label: 'AI Advice used', value: '85%', color: '#f3e5f5', sub: 'Accuracy rate' },
            ].map((s, i) => (
              <div key={i} style={{ 
                padding: '1.5rem', 
                background: s.color, 
                borderRadius: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ margin: 0, color: 'rgba(0,0,0,0.7)' }}>{s.label}</h4>
                  <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{s.sub}</span>
                </div>
                <strong style={{ fontSize: '1.8rem', color: 'var(--primary-dark)' }}>{s.value}</strong>
              </div>
            ))}
          </div>

          <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', marginTop: '2.5rem', borderStyle: 'dashed' }}>
            <LogOut size={18} /> Sign Out Safely
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
