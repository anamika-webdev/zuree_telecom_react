// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { useAuth } from '../hooks/useAuth'; 
import { toast } from 'react-toastify'; // <-- IMPORT TOAST

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    confirmPassword: ''
  });
  // const [error, setError] = useState(''); // <-- No longer needed
  const [loading, setLoading] = useState(false);

  const breadcrumbs = [{ label: 'Register' }];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- Client-side Validation ---
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    // --- End Validation ---

    setLoading(true);

    try {
      await registerUser({
        loginId: formData.loginId,
        password: formData.password
      });

      // Redirect to login page, which will show the success toast
      navigate('/login?registered=true'); 
      
    } catch (err) {
      console.error('User registration error:', err);
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <PageTitle title="Create Account" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8">
              <div className="p-5 rounded shadow login-box">
                <div className="mb-4 text-center">
                  <h3>Get Started</h3>
                  <p className="text-muted">Create your new account</p>
                </div>
                
                {/* The {error} alert div is no longer needed */}

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
                      placeholder="Enter your Login ID or Email"
                      required
                      autoFocus
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-3">
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
                      placeholder="Minimum 6 characters"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">
                      <i className="fas fa-check-circle me-2"></i>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
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
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user-plus me-2"></i>
                        Register
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <small className="text-muted">
                    Already have an account? <a href="/login">Sign In</a>
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

export default Register;