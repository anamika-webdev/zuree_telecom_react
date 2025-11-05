// src/pages/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import '../assets/css/admin-login.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('Admin login attempt:', { username: formData.username });

    try {
      const response = await login(formData);
      console.log('Admin login successful:', response);
      
      // Redirect to admin dashboard
      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 100);
    } catch (err) {
      console.error('Admin login error:', err);
      setError(err.message || 'Invalid admin credentials');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-box">
          <div className="admin-login-header">
            <div className="admin-logo">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h2>Admin Portal</h2>
            <p className="text-muted">Secure Admin Access</p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-circle me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label>
                <i className="fas fa-user-shield me-2"></i>
                Admin Username
              </label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter admin username"
                required
                autoFocus
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-lock me-2"></i>
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-admin-primary w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Authenticating...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Access Admin Portal
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <a href="/" className="back-to-site">
              <i className="fas fa-arrow-left me-2"></i>
              Back to Main Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;