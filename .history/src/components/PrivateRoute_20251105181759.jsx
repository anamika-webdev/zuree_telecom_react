// src/components/PrivateRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log('PrivateRoute check:', { 
    user, 
    loading, 
    path: location.pathname,
    isAuthenticated: !!user 
  });

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!user) {
    console.log('PrivateRoute: No user, redirecting to login');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Check role if specified
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    console.log('PrivateRoute: User role not allowed:', user.role, 'Required:', allowedRoles);
    return <Navigate to="/" replace />;
  }

  console.log('PrivateRoute: Access granted');
  return children;
};

export default PrivateRoute;