/ src/pages/Login.jsx
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
      navigate('/admin/dashboard'); // Or wherever you want to redirect
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    
      
      
      
        
          
            
              
                Login to Dashboard
                
                {error && (
                  {error}
                )}

                
                  
                    Login ID
                    
                  

                  
                    Password
                    
                  

                  
                    {loading ? 'Logging in...' : 'Login'}
                  
                
              
            
          
        
      
    
  );
};

export default Login;