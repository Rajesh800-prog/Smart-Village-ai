import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, CloudRain, Sprout, ShoppingCart, User, Menu, X, Leaf } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", icon: <Home size={20} />, label: "Home" },
    { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/disease-detection", icon: <Leaf size={20} />, label: "Disease Detection" },
    { to: "/weather", icon: <CloudRain size={20} />, label: "Weather Alerts" },
    { to: "/recommendation", icon: <Sprout size={20} />, label: "Crop Recommendation" },
    { to: "/marketplace", icon: <ShoppingCart size={20} />, label: "Marketplace" },
    { to: "/profile", icon: <User size={20} />, label: "Profile" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Sprout color="var(--primary-dark)" size={32} />
          <span>Smart Village AI</span>
        </div>
        
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
