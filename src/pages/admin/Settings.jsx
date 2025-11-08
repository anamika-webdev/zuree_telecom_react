import React, { useState, useEffect } from 'react';
import '../../styles/components.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    enableRegistration: true,
    maintenanceMode: false,
    emailNotifications: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/settings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }

      const data = await response.json();
      setSettings(prev => ({ ...prev, ...data }));
      setError(null);
    } catch (err) {
      console.error('Error fetching settings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(settings)
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
      setError(err.message);
      alert('Failed to save settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-section">
        <div className="loading-spinner">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Site Settings</h2>
      </div>

      {error && (
        <div className="error-message" style={{ marginBottom: '1.5rem' }}>
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
      )}

      {success && (
        <div style={{ 
          padding: '1rem', 
          marginBottom: '1.5rem', 
          background: '#d1fae5', 
          color: '#065f46', 
          borderRadius: '8px',
          borderLeft: '4px solid #10b981'
        }}>
          <i className="fas fa-check-circle"></i> Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        {/* General Settings */}
        <div className="form-container" style={{ marginBottom: '2rem' }}>
          <h3>General Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="siteName">Site Name</label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={settings.siteName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Zuree Telecom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactEmail">Contact Email</label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleInputChange}
                className="form-input"
                placeholder="info@zureetelecom.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactPhone">Contact Phone</label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="siteDescription">Site Description</label>
            <textarea
              id="siteDescription"
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleInputChange}
              className="form-textarea"
              rows="3"
              placeholder="Brief description of your company..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Business Address</label>
            <textarea
              id="address"
              name="address"
              value={settings.address}
              onChange={handleInputChange}
              className="form-textarea"
              rows="2"
              placeholder="123 Main St, City, State ZIP"
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="form-container" style={{ marginBottom: '2rem' }}>
          <h3>Social Media Links</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="facebook">Facebook URL</label>
              <input
                type="url"
                id="facebook"
                name="facebook"
                value={settings.facebook}
                onChange={handleInputChange}
                className="form-input"
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div className="form-group">
              <label htmlFor="twitter">Twitter URL</label>
              <input
                type="url"
                id="twitter"
                name="twitter"
                value={settings.twitter}
                onChange={handleInputChange}
                className="form-input"
                placeholder="https://twitter.com/yourhandle"
              />
            </div>

            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn URL</label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={settings.linkedin}
                onChange={handleInputChange}
                className="form-input"
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>

            <div className="form-group">
              <label htmlFor="instagram">Instagram URL</label>
              <input
                type="url"
                id="instagram"
                name="instagram"
                value={settings.instagram}
                onChange={handleInputChange}
                className="form-input"
                placeholder="https://instagram.com/yourhandle"
              />
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="form-container" style={{ marginBottom: '2rem' }}>
          <h3>System Settings</h3>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="enableRegistration"
                checked={settings.enableRegistration}
                onChange={handleInputChange}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span>Enable User Registration</span>
            </label>
            <small style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
              Allow new users to register on the website
            </small>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleInputChange}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span>Maintenance Mode</span>
            </label>
            <small style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
              Show maintenance page to visitors (admins can still access)
            </small>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleInputChange}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span>Email Notifications</span>
            </label>
            <small style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
              Send email notifications for new contacts, applications, etc.
            </small>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm" style={{ marginRight: '0.5rem' }}></span>
                Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save" style={{ marginRight: '0.5rem' }}></i>
                Save Settings
              </>
            )}
          </button>
          <button type="button" onClick={fetchSettings} className="btn btn-secondary">
            <i className="fas fa-undo" style={{ marginRight: '0.5rem' }}></i>
            Reset
          </button>
        </div>
      </form>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#dbeafe', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
        <strong style={{ color: '#1e40af' }}>ℹ️ Note:</strong>
        <p style={{ margin: '0.5rem 0 0 0', color: '#1e40af' }}>
          Changes to settings will take effect immediately. Some settings may require users to refresh their browser to see updates.
        </p>
      </div>
    </div>
  );
};

export default Settings;