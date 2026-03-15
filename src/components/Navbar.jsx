import { NavLink, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, CloudRain, Sprout, ShoppingCart, User, Menu, X, Leaf, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", icon: <Home size={20} />, label: "Home" },
    { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/disease-detection", icon: <Leaf size={20} />, label: "Disease Detection" },
    { to: "/weather", icon: <CloudRain size={20} />, label: "Weather Alerts" },
    { to: "/recommendation", icon: <Sprout size={20} />, label: "Advice" },
    { to: "/marketplace", icon: <ShoppingCart size={20} />, label: "Market" },
    { to: "/profile", icon: <User size={20} />, label: "Profile" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '10px', display: 'flex' }}>
            <Sprout color="white" size={24} />
          </div>
          <span>Smart Village AI</span>
        </NavLink>
        
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
        
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          {navLinks.map((link) => (
            <li key={link.to} className="nav-item">
              <NavLink 
                to={link.to} 
                className={({isActive}) => isActive ? "nav-link active-link" : "nav-link"}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}

          {/* Auth section for mobile */}
          <div className="nav-auth-wrap" style={{ display: isOpen ? 'flex' : '' }}>
            {currentUser ? (
              <button className="nav-logout-btn" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <NavLink to="/login" className="nav-login-btn" onClick={() => setIsOpen(false)}>
                <LogIn size={18} />
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
