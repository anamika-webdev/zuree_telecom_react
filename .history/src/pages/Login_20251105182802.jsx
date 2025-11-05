// src/pages/Login.jsx - Regular User Login
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { useAuth } from '../hooks/useAuth.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const breadcrumbs = [{ label: 'Login' }];

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

    console.log('User login attempt:', { loginId: formData.loginId });

    try {
      const response = await loginUser(formData);
      console.log('User login successful:', response);
      
      // Redirect to user dashboard or home
      navigate('/');
    } catch (err) {
      console.error('User login error:', err);
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <PageTitle title="User Login" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8">
              <div className="p-5 rounded shadow login-box">
                <div className="mb-4 text-center">
                  <h3>Welcome Back</h3>
                  <p className="text-muted">Sign in to your account</p>
                </div>
                
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setError('')}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-user me-2"></i>
                      Login ID
                    </label>
                    <input
                      type="text"
                      name="loginId"
                      className="form-control"
                      value={formData.loginId}
                      onChange={handleChange}
                      placeholder="Enter your login ID"
                      required
                      autoFocus
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">
                      <i className="fas fa-lock me-2"></i>
                      Password
                    </label>
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
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Login
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <small className="text-muted">
                    Don't have an account? <a href="/register">Sign up</a>
                  </small>
                </div>

                <hr className="my-4" />

                <div className="text-center">
                  <small className="text-muted">
                    <a href="/admin-login" className="text-decoration-none">
                      <i className="fas fa-shield-alt me-1"></i>
                      Admin Login
                    </a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;