// src/pages/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { toast } from 'react-toastify'; // 1. Import toast for notifications
import '../assets/css/admin-login.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth(); // 2. FIX: Use 'loginAdmin' from your auth hook
  
  const [formData, setFormData] = useState({
    loginId: '', // 3. FIX: Changed 'username' to 'loginId' to match API
    password: ''
  });
  
  // const [error, setError] = useState(''); // No longer needed, using toast
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // if (error) setError(''); // No longer needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError(''); // No longer needed
    setLoading(true);

    // 4. FIX: Log the correct state property
    console.log('Admin login attempt:', { loginId: formData.loginId }); 

    try {
      // 5. FIX: Call the correct 'loginAdmin' function
      const response = await loginAdmin(formData); 
      console.log('Admin login successful:', response);
      
      toast.success('Login successful! Redirecting...');
      
      // 6. FIX: Use 'navigate' for a clean React redirect
      navigate('/admin/dashboard'); 

    } catch (err) {
      console.error('Admin login error:', err);
      // 7. Use toast for error messages
      toast.error(err.message || 'Invalid admin credentials'); 
    } finally {
      // 8. Set loading to false in 'finally' to ensure it always runs
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

          {/* Error display is now handled by react-toastify */}
          {/* {error && ( ... )} */}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label>
                <i className="fas fa-user-shield me-2"></i>
                Admin ID
              </label>
              <input
                type="text"
                // 9. FIX: 'name' and 'value' now point to 'loginId'
                name="loginId" 
                className="form-control"
                value={formData.loginId}
                onChange={handleChange}
                placeholder="Enter admin ID"
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