// src/pages/Login.jsx - FIXED
import { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate, useSearchParams } from 'react-router-dom'; // Import useSearchParams
import PageTitle from '../components/common/PageTitle';
import { useAuth } from '../hooks/useAuth.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [searchParams] = useSearchParams(); // To check for registration message
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // For registration message
  const [loading, setLoading] = useState(false);

  const breadcrumbs = [{ label: 'Login' }];

  // Check for 'registered=true' query param from Register.jsx
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccess('Registration successful! Please log in.');
    }
  }, [searchParams]);


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError(''); // Clear error on new input
    if (success) setSuccess(''); // Clear success on new input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(''); // Clear any messages
    setLoading(true);

    console.log('User login attempt:', { loginId: formData.loginId });

    try {
      const response = await loginUser(formData);
      console.log('User login successful:', response);
      
      // Redirect to user dashboard
      navigate('/dashboard');
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
                
                {/* Success Message (from registration) */}
                {success && (
                  <div className="alert alert-success" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    {success}
                  </div>
                )}
                
                {/* Error Message Display (FIXED) */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                    {/* I removed the close button ('btn-close'). 
                      The error will now only disappear when the user 
                      starts typing again (handled in handleChange).
                    */}
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

                {/* Admin login option was removed in previous request */}
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;