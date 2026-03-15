import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Sprout, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', password: '', village: '',
    phone: '', farmSize: '', mainCrop: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { 
      toast.error('Password must be 6+ characters for security.'); 
      return; 
    }
    setLoading(true);
    try {
      await register(form);
      toast.success('Professional Farmer Account Created!');
      navigate('/dashboard');
    } catch (err) {
      console.error("Registration Error:", err);
      if (err.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered.');
      } else {
        toast.error(`Registration error: ${err.message}`);
      }
    }
    setLoading(false);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="auth-page">
      <div className="auth-blob-1"></div>
      <div className="auth-blob-2"></div>

      <div className="auth-card auth-card-wide">
        <div className="auth-logo">
          <div className="auth-icon-wrap"><Sprout size={44} /></div>
          <h2>Join the Village</h2>
          <p>Create your smart farming account in 60 seconds</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" placeholder="Rajesh Kumar" value={form.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input name="email" type="email" placeholder="farmer@village.com" value={form.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Village Name</label>
              <input name="village" placeholder="Village / City" value={form.village} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Farm Area (Acres)</label>
              <input name="farmSize" type="number" step="0.1" placeholder="e.g., 5.0" value={form.farmSize} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Major Crop</label>
              <select name="mainCrop" value={form.mainCrop} onChange={handleChange} required>
                <option value="">-- Select Your Main Crop --</option>
                <option>Rice</option>
                <option>Wheat</option>
                <option>Cotton</option>
                <option>Tomato</option>
                <option>Sugarcane</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="form-group mt-2">
            <label>Secure Password</label>
            <div className="pass-wrap">
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4" style={{ width: '100%', padding: '1.25rem', fontSize: '1.2rem' }} disabled={loading}>
            {loading ? 'Creating Profile...' : <><UserPlus size={22} /> Register My Profile</>}
          </button>
        </form>

        <div className="auth-footer">
          Already a member? <Link to="/login">Sign In Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
