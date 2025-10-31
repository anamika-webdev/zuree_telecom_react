// FILE: src/pages/Login.jsx
// ============================================
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      navigate('/'); // redirect to home after login
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <PageTitle title="Login" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="login-box shadow p-5 rounded">
                <h3 className="text-center mb-4">Login to Dashboard</h3>
                
                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label>Login ID</label>
                    <input
                      type="text"
                      name="loginId"
                      className="form-control"
                      value={formData.loginId}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;