import { User, Settings, LogOut, Shield } from 'lucide-react';

const Profile = () => {
  return (
    <div className="profile-page">
      <h2 className="mb-4 text-primary-dark">Farmer Profile</h2>
      
      <div className="grid grid-2">
        <div className="card text-center relative overflow-hidden">
          <div style={{ 
            height: '100px', 
            backgroundColor: 'var(--primary-light)', 
            position: 'absolute', 
            top: 0, left: 0, right: 0 
          }}></div>
          <div style={{ position: 'relative', marginTop: '40px' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              backgroundColor: '#fff', 
              borderRadius: '50%', 
              margin: '0 auto', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '4px solid white',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <User size={48} color="var(--primary)" />
            </div>
            <h3 className="mt-2 text-primary-dark">Rajesh Kumar</h3>
            <p className="text-muted">Verified Farmer</p>
            <p className="mt-1 flex items-center justify-center gap-1 text-primary">
              <Shield size={16} /> Premium Account
            </p>
          </div>
        </div>

        <div className="card">
          <h3 className="mb-2">Farm Details</h3>
          <div className="flex justify-between border-b py-2" style={{ borderBottom: '1px solid var(--gray-light)', padding: '0.75rem 0' }}>
            <span className="text-muted">Location</span>
            <span className="font-bold">Nashik, Maharashtra</span>
          </div>
          <div className="flex justify-between border-b py-2" style={{ borderBottom: '1px solid var(--gray-light)', padding: '0.75rem 0' }}>
            <span className="text-muted">Total Land</span>
            <span className="font-bold">5.2 Acres</span>
          </div>
          <div className="flex justify-between py-2" style={{ padding: '0.75rem 0' }}>
            <span className="text-muted">Primary Crops</span>
            <span className="font-bold">Grapes, Wheat, Onion</span>
          </div>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h3 className="mb-2">Account Settings</h3>
          <div className="flex flex-column gap-2 mt-2">
            <button className="btn btn-outline flex justify-start items-center gap-2" style={{ width: '100%', borderColor: 'var(--gray-light)', color: 'var(--text-dark)' }}>
              <Settings size={20} /> Edit Personal Information
            </button>
            <button className="btn btn-outline flex justify-start items-center gap-2" style={{ width: '100%', borderColor: 'var(--gray-light)', color: 'var(--text-dark)' }}>
              <Shield size={20} /> Privacy & Security
            </button>
            <button className="btn btn-danger flex justify-start items-center gap-2 mt-2" style={{ width: '100%' }}>
              <LogOut size={20} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
