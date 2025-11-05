// src/hooks/useAuth.jsx - Updated with separate login methods
import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user on mount
    console.log('AuthProvider: Checking for existing user...');
    const currentUser = authService.getCurrentUser();
    const isAuth = authService.isAuthenticated();
    
    console.log('Current user:', currentUser);
    console.log('Is authenticated:', isAuth);
    
    if (currentUser && isAuth) {
      setUser(currentUser);
      console.log('User restored from localStorage:', currentUser);
    }
    
    setLoading(false);
  }, []);

  // Admin login - for admin portal access
  const login = async (credentials) => {
    try {
      console.log('useAuth.login (Admin): Attempting admin login...');
      const response = await authService.adminLogin(credentials);
      
      if (response.success && response.user) {
        setUser(response.user);
        console.log('useAuth.login (Admin): User state updated:', response.user);
        return response;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('useAuth.login (Admin) error:', error);
      throw error;
    }
  };

  // Regular user login - for main site access
  const loginUser = async (credentials) => {
    try {
      console.log('useAuth.loginUser: Attempting user login...');
      const response = await authService.userLogin(credentials);
      
      if (response.success && response.user) {
        setUser(response.user);
        console.log('useAuth.loginUser: User state updated:', response.user);
        return response;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('useAuth.loginUser error:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('useAuth.logout: Logging out...');
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,        // Admin login
    loginUser,    // Regular user login
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.role === 'super_admin',
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};