import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Sprout, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

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
      toast.success('Login Successful! Welcome back.');
      navigate('/dashboard');
    } catch (err) {
      console.error("DEBUG - Login Error:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        toast.error('Invalid Credentials: High-security alert. Please check email/password.');
      } else if (err.code === 'auth/too-many-requests') {
        toast.error('Account locked temporarily due to too many failed attempts.');
      } else if (err.code === 'auth/configuration-not-found') {
        toast.error('Authentication not set up. Please enable "Email/Password" in your Firebase console.');
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
          <div className="auth-icon-wrap"><Sprout size={36} /></div>
          <h2>Welcome back!</h2>
          <p>Login to your farmer dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="e.g., farmer@village.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Password</label>
            <div className="pass-wrap">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Logging in...' : <><LogIn size={20} /> Login Now</>}
          </button>
        </form>

        <div className="auth-footer">
          New here? <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
