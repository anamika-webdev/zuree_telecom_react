// src/pages/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify'; // <-- 1. Import toast
import '../assets/css/admin-login.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth(); // <-- 2. Get 'loginAdmin', not 'login'
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });
  // const [error, setError] = useState(''); // No longer needed
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 3. Call 'loginAdmin'
      await loginAdmin(formData); 
      
      toast.success('Admin login successful! Redirecting...');
      navigate('/admin/dashboard');

    } catch (err) {
      console.error('Admin login error:', err);
      // 4. Use toast for errors
      toast.error(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="mb-4 text-center admin-login-logo">
          {/* Using text logo, replace with <img> if you have one */}
          <h2 className="fw-bold">Zuree Telecom</h2>
          <p className="text-muted">Admin Portal</p>
        </div>

        {/* Error display is now handled by react-toastify */}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Login ID</label>
            <input
              type="text"
              name="loginId"
              className="form-control"
              value={formData.loginId}
              onChange={handleChange}
              placeholder="Enter your admin ID"
              required
              autoFocus
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <small>
            <a href="/" className="text-decoration-none">&larr; Back to main site</a>
          </small>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;