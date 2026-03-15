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
      <div className="text-center" style={{ padding: '4rem 1rem' }}>
        <User size={64} color="var(--gray-light)" style={{ margin: '0 auto 1rem' }} />
        <h2 style={{ color: 'var(--gray)' }}>You are not logged in</h2>
        <p className="text-muted mb-4">Please login to view your profile.</p>
        <Link to="/login" className="btn btn-primary">Login Now</Link>
      </div>
    );
  }

  const profile = farmerProfile || {};

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
        borderRadius: '20px',
        padding: '2.5rem 2rem',
        color: 'white',
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Sprout size={120} color="rgba(255,255,255,0.08)" style={{ position: 'absolute', right: -20, top: -20 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative', flexWrap: 'wrap' }}>
          <div style={{
            width: 90, height: 90,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            border: '3px solid rgba(255,255,255,0.4)',
          }}>
            <User size={44} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.8rem' }}>{profile.name || currentUser.displayName}</h1>
            <p style={{ margin: '0.25rem 0 0', opacity: 0.85 }}>{profile.email || currentUser.email}</p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              <Star size={14} /> Verified Farmer
            </span>
          </div>
        </div>
      </div>

      {/* Farm Details */}
      <div className="grid grid-2 mb-4" style={{ gap: '1rem' }}>
        <div className="card">
          <h3 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>🌍 Farm Details</h3>
          {[
            { label: 'Village / City', value: profile.village || '—', icon: <MapPin size={18} color="var(--primary)" /> },
            { label: 'Phone Number', value: profile.phone || '—', icon: <Phone size={18} color="var(--primary)" /> },
            { label: 'Farm Size', value: profile.farmSize ? `${profile.farmSize} Acres` : '—', icon: <Tractor size={18} color="var(--primary)" /> },
            { label: 'Main Crop', value: profile.mainCrop || '—', icon: <Sprout size={18} color="var(--primary)" /> },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem 0', borderBottom: i < 3 ? '1px solid var(--gray-light)' : 'none' }}>
              {item.icon}
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--gray)' }}>{item.label}</p>
                <p style={{ margin: 0, fontWeight: 600 }}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>📊 My Activity</h3>
          {[
            { label: 'Disease Scans Done', value: '5', color: '#e8f5e9' },
            { label: 'Marketplace Listings', value: '2', color: '#fff3e0' },
            { label: 'Crop Recommendations', value: '8', color: '#f3e5f5' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: s.color, borderRadius: '10px', marginBottom: '0.5rem' }}>
              <span>{s.label}</span>
              <strong style={{ fontSize: '1.2rem' }}>{s.value}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/disease-detection" className="btn btn-outline" style={{ flex: 1 }}>🔬 Scan a Plant</Link>
        <Link to="/recommendation" className="btn btn-outline" style={{ flex: 1 }}>🌱 Get Crop Advice</Link>
        <button onClick={handleLogout} className="btn btn-danger" style={{ flex: 1 }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
