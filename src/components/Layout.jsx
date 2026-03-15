import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="container" style={{ flex: 1, padding: '2rem 1rem' }}>
        <Outlet />
      </main>
      <footer style={{ backgroundColor: 'var(--primary-dark)', color: 'white', textAlign: 'center', padding: '1.5rem', marginTop: 'auto' }}>
        <p>&copy; {new Date().getFullYear()} Smart Village AI - Empowering Farmers with Technology</p>
      </footer>
    </div>
  );
};

export default Layout;
