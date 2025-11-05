// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { useAuth } from '../hooks/useAuth.jsx';
import { toast } from 'react-toastify'; // <-- IMPORT TOAST

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [searchParams] = useSearchParams(); 
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });
  // const [error, setError] = useState('');     // <-- No longer needed
  // const [success, setSuccess] = useState(''); // <-- No longer needed
  const [loading, setLoading] = useState(false);

  const breadcrumbs = [{ label: 'Login' }];

  // Check for 'registered=true' query param from Register.jsx
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      toast.success('Registration successful! Please log in.');
    }
  }, [searchParams]);

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
      await loginUser(formData);
      toast.success('Login successful! Redirecting...');
      navigate('/dashboard');
    } catch (err) {
      console.error('User login error:', err);
      toast.error(err.message || 'Invalid credentials');
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
                
                {/* The {success} and {error} alert divs are no longer needed */}

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
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;