// src/components/layout/AdminLayout.jsx - UPDATED WITH SERVICES & FIXED REDIRECTS
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

  const isActiveGroup = (paths) => {
    return paths.some(path => location.pathname.startsWith(path)) ? 'active' : '';
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
          {/* Dashboard */}
          <Link 
            to="/admin/dashboard" 
            className={`nav-link ${isActive('/admin/dashboard')}`}
            onClick={closeMobileMenu}
          >
            <i className="fas fa-chart-line"></i>
            <span>Dashboard</span>
          </Link>
          
          {/* Blogs Section */}
          <div className="nav-section">
            <div className="nav-section-title">
              <i className="fas fa-newspaper"></i>
              <span>Content Management</span>
            </div>
            
            <Link 
              to="/admin/blogs" 
              className={`nav-link ${isActiveGroup(['/admin/blogs'])}`}
              onClick={closeMobileMenu}
            >
              <i className="fas fa-blog"></i>
              <span>Blogs</span>
            </Link>

            <Link 
              to="/admin/services" 
              className={`nav-link ${isActiveGroup(['/admin/services'])}`}
              onClick={closeMobileMenu}
            >
              <i className="fas fa-cogs"></i>
              <span>Services</span>
            </Link>

            <Link 
              to="/admin/team" 
              className={`nav-link ${isActiveGroup(['/admin/team'])}`}
              onClick={closeMobileMenu}
            >
              <i className="fas fa-user-friends"></i>
              <span>Team Members</span>
            </Link>
          </div>

          {/* Career Section */}
          <div className="nav-section">
            <div className="nav-section-title">
              <i className="fas fa-briefcase"></i>
              <span>Career Management</span>
            </div>
            
            <Link 
              to="/admin/jobs" 
              className={`nav-link ${isActiveGroup(['/admin/jobs'])}`}
              onClick={closeMobileMenu}
            >
              <i className="fas fa-briefcase"></i>
              <span>Jobs</span>
            </Link>
            
            <Link 
              to="/admin/applications" 
              className={`nav-link ${isActiveGroup(['/admin/applications'])}`}
              onClick={closeMobileMenu}
            >
              <i className="fas fa-file-alt"></i>
              <span>Applications</span>
            </Link>
          </div>

          {/* Communication Section */}
          <div className="nav-section">
            <div className="nav-section-title">
              <i className="fas fa-comments"></i>
              <span>Communication</span>
            </div>
            
            <Link 
              to="/admin/contacts" 
              className={`nav-link ${isActiveGroup(['/admin/contacts'])}`}
              onClick={closeMobileMenu}
            >
              <i className="fas fa-envelope"></i>
              <span>Contact Messages</span>
            </Link>
          </div>

          {/* Settings Section */}
          <div className="nav-section">
            <div className="nav-section-title">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </div>
            
            <Link 
              to="/admin/users" 
              className={`nav-link ${isActiveGroup(['/admin/users'])}`}
              onClick={closeMobileMenu}
            >
              <i className="fas fa-users"></i>
              <span>Admin Users</span>
            </Link>

            <Link 
              to="/admin/settings" 
              className={`nav-link ${isActiveGroup(['/admin/settings'])}`}
              onClick={closeMobileMenu}
            >
              <i className="fas fa-sliders-h"></i>
              <span>Site Settings</span>
            </Link>
          </div>

          <hr />

          {/* Back to Site */}
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
            zIndex: 999
          }}
        />
      )}
    </div>
  );
};

export default AdminLayout;