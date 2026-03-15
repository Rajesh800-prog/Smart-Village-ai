import { Sprout, IndianRupee, CloudRain, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="mb-4">Farmer Dashboard</h1>
      
      <div className="grid grid-4 mb-4">
        <div className="card flex items-center gap-4">
          <div style={{ backgroundColor: '#e8f5e9', padding: '1rem', borderRadius: '50%' }}>
            <Sprout color="var(--primary)" size={32} />
          </div>
          <div>
            <p className="text-muted" style={{ margin: 0 }}>Active Crops</p>
            <h2 style={{ margin: 0 }}>Wheat, Rice</h2>
          </div>
        </div>
        
        <div className="card flex items-center gap-4">
          <div style={{ backgroundColor: '#fff8e1', padding: '1rem', borderRadius: '50%' }}>
            <IndianRupee color="var(--secondary)" size={32} />
          </div>
          <div>
            <p className="text-muted" style={{ margin: 0 }}>Est. Income</p>
            <h2 style={{ margin: 0 }}>₹45,000</h2>
          </div>
        </div>
        
        <div className="card flex items-center gap-4">
          <div style={{ backgroundColor: '#e3f2fd', padding: '1rem', borderRadius: '50%' }}>
            <CloudRain color="#1976d2" size={32} />
          </div>
          <div>
            <p className="text-muted" style={{ margin: 0 }}>Today's Weather</p>
            <h2 style={{ margin: 0 }}>28°C, Clear</h2>
          </div>
        </div>
        
        <div className="card flex items-center gap-4">
          <div style={{ backgroundColor: '#ffebee', padding: '1rem', borderRadius: '50%' }}>
            <AlertTriangle color="var(--danger)" size={32} />
          </div>
          <div>
            <p className="text-muted" style={{ margin: 0 }}>Alerts</p>
            <h2 style={{ margin: 0 }}>0 Alerts</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3>Recent Activities</h3>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
            <li style={{ padding: '1rem 0', borderBottom: '1px solid var(--gray-light)' }}>
              <strong>Detected Rust in Wheat</strong> - 2 days ago
            </li>
            <li style={{ padding: '1rem 0', borderBottom: '1px solid var(--gray-light)' }}>
              <strong>Added 50kg Rice to Marketplace</strong> - 5 days ago
            </li>
            <li style={{ padding: '1rem 0' }}>
              <strong>Checked Crop Recommendation</strong> - 1 week ago
            </li>
          </ul>
        </div>
        <div className="card">
          <h3>Market Prices (Local Mandi)</h3>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
            <li className="flex justify-between" style={{ padding: '1rem 0', borderBottom: '1px solid var(--gray-light)' }}>
              <span>Wheat (Sharbati)</span>
              <strong className="text-primary">₹2,800 / Quintal</strong>
            </li>
            <li className="flex justify-between" style={{ padding: '1rem 0', borderBottom: '1px solid var(--gray-light)' }}>
              <span>Rice (Basmati)</span>
              <strong className="text-primary">₹3,500 / Quintal</strong>
            </li>
            <li className="flex justify-between" style={{ padding: '1rem 0' }}>
              <span>Mustard</span>
              <strong className="text-primary">₹5,200 / Quintal</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
