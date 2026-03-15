import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Sprout, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', password: '', village: '',
    phone: '', farmSize: '', mainCrop: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setError('This email is already registered. Please login.');
      else setError('Registration failed. Please try again.');
    }
    setLoading(false);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-wide">
        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-icon-wrap"><Sprout size={32} color="white" /></div>
          <h2>Create Farmer Account</h2>
          <p className="text-muted">Join Smart Village AI — it's free!</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input name="name" placeholder="Rajesh Kumar" value={form.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Village / City *</label>
              <input name="village" placeholder="e.g., Nashik" value={form.village} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Farm Size (Acres) *</label>
              <input name="farmSize" type="number" step="0.1" placeholder="e.g., 3.5" value={form.farmSize} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Main Crop *</label>
              <select name="mainCrop" value={form.mainCrop} onChange={handleChange} required>
                <option value="">-- Select Main Crop --</option>
                <option>Rice</option>
                <option>Wheat</option>
                <option>Cotton</option>
                <option>Tomato</option>
                <option>Onion</option>
                <option>Soybean</option>
                <option>Maize</option>
                <option>Sugarcane</option>
                <option>Groundnut</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="form-group mt-2">
            <label>Password *</label>
            <div className="pass-wrap">
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-2" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Creating Account...' : <><UserPlus size={20} /> Create My Account</>}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
