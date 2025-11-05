// src/components/layout/AdminLayout.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../assets/css/admin-layout.css';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
          <p className="text-muted">{user?.name}</p>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className={`nav-link ${isActive('/admin/dashboard')}`}>
            <i className="fas fa-dashboard"></i> Dashboard
          </Link>
          
          <Link to="/admin/blogs" className={`nav-link ${isActive('/admin/blogs')}`}>
            <i className="fas fa-blog"></i> Blogs
          </Link>
          
          <Link to="/admin/jobs" className={`nav-link ${isActive('/admin/jobs')}`}>
            <i className="fas fa-briefcase"></i> Jobs
          </Link>
          
          <Link to="/admin/applications" className={`nav-link ${isActive('/admin/applications')}`}>
            <i className="fas fa-file-alt"></i> Applications
          </Link>
          
          <Link to="/admin/contacts" className={`nav-link ${isActive('/admin/contacts')}`}>
            <i className="fas fa-envelope"></i> Contact Messages
          </Link>
          
          <Link to="/admin/users" className={`nav-link ${isActive('/admin/users')}`}>
            <i className="fas fa-users"></i> Users
          </Link>

          <hr className="my-3" />

          <Link to="/" className="nav-link">
            <i className="fas fa-home"></i> Back to Site
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="header-content">
            <h2 className="header-title">Zuree Telecom Admin</h2>
            <div className="header-actions">
              <span className="me-3">Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;