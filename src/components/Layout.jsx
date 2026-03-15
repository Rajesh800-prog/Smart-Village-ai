import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { Sprout } from 'lucide-react';

const Layout = () => (
  <div className="app-container">
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
    <footer style={{
      backgroundColor: 'var(--primary-dark)',
      color: 'white',
      textAlign: 'center',
      padding: '1.5rem 1rem',
      marginTop: 'auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
        <Sprout size={20} />
        <strong>Smart Village AI</strong>
      </div>
      <p style={{ fontSize: '0.85rem', opacity: 0.7, margin: 0 }}>
        © {new Date().getFullYear()} Empowering Farmers with AI Technology
      </p>
    </footer>
  </div>
);

export default Layout;

