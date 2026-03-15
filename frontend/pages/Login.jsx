import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Sprout, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome Back to Smart Village!');
      navigate('/dashboard');
    } catch (err) {
      console.error("Login Error:", err);
      if (err.code === 'auth/invalid-credential') {
        toast.error('Invalid Credentials. Please check your email and password.');
      } else {
        toast.error(`Login failed: ${err.message}`);
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-blob-1"></div>
      <div className="auth-blob-2"></div>
      
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-icon-wrap"><Sprout size={40} /></div>
          <h2>Sign In</h2>
          <p>Access your professional farmer dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="farmer@village.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Secure Password</label>
            <div className="pass-wrap">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.2rem', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Authenticating...' : <><LogIn size={22} /> Login to Dashboard</>}
          </button>
        </form>

        <div className="auth-footer">
          New to the village? <Link to="/register">Create Farmer Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
