// src/components/layout/AdminLayout.jsx - ENHANCED VERSION
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import '../../assets/css/admin-layout.css';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="admin-layout">
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle" 
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <i className={`fas fa-${mobileMenuOpen ? 'times' : 'bars'}`}></i>
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h3>
            <i className="fas fa-shield-halved me-2"></i>
            Admin Panel
          </h3>
          <p className="text-muted">{user?.fullName || user?.username || 'Administrator'}</p>
        </div>

        <nav className="sidebar-nav">
          <Link 
            to="/admin/dashboard" 
            className={`nav-link ${isActive('/admin/dashboard')}`}
            onClick={closeMobileMenu}
          >
            <i className="fas fa-chart-line"></i>
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/admin/blogs" 
            className={`nav-link ${isActive('/admin/blogs')}`}
            onClick={closeMobileMenu}
          >
            <i className="fas fa-blog"></i>
            <span>Blogs</span>
          </Link>
          
          <Link 
            to="/admin/jobs" 
            className={`nav-link ${isActive('/admin/jobs')}`}
            onClick={closeMobileMenu}
          >
            <i className="fas fa-briefcase"></i>
            <span>Jobs</span>
          </Link>
          
          <Link 
            to="/admin/applications" 
            className={`nav-link ${isActive('/admin/applications')}`}
            onClick={closeMobileMenu}
          >
            <i className="fas fa-file-alt"></i>
            <span>Applications</span>
          </Link>
          
          <Link 
            to="/admin/contacts" 
            className={`nav-link ${isActive('/admin/contacts')}`}
            onClick={closeMobileMenu}
          >
            <i className="fas fa-envelope"></i>
            <span>Contact Messages</span>
          </Link>
          
          <Link 
            to="/admin/users" 
            className={`nav-link ${isActive('/admin/users')}`}
            onClick={closeMobileMenu}
          >
            <i className="fas fa-users"></i>
            <span>Users</span>
          </Link>

          <hr />

          <Link 
            to="/" 
            className="nav-link"
            onClick={closeMobileMenu}
          >
            <i className="fas fa-home"></i>
            <span>Back to Site</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="header-content">
            <h2 className="header-title">
              <i className="fas fa-tower-cell me-2"></i>
              Zuree Telecom Admin
            </h2>
            <div className="header-actions">
              <span className="d-none d-md-inline">
                Welcome, <strong>{user?.fullName || user?.username || 'Admin'}</strong>
              </span>
              <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="admin-content">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={closeMobileMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: 'none'
          }}
        />
      )}
    </div>
  );
};

export default AdminLayout;