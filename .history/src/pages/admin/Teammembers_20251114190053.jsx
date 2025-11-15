// src/pages/admin/Teammembers.jsx - COMPLETE VERSION
import React, { useState, useEffect } from 'react';
import '../../styles/components.css';

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    bio: '',
    image_url: '',
    linkedin: '',
    twitter: '',
    status: 'active'
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/team', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }

      const data = await response.json();
      setMembers(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError(err.message);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.position) {
      alert('Name and Position are required!');
      return;
    }

    try {
      const url = editingMember 
        ? `http://localhost:5000/api/team/${editingMember.id}`
        : 'http://localhost:5000/api/team';
      
      const method = editingMember ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${editingMember ? 'update' : 'add'} team member`);
      }

      await fetchMembers();
      resetForm();
      alert(`Team member ${editingMember ? 'updated' : 'added'} successfully!`);
    } catch (err) {
      console.error('Error saving team member:', err);
      alert(`Failed to ${editingMember ? 'update' : 'add'} team member: ${err.message}`);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || '',
      position: member.position || '',
      department: member.department || '',
      email: member.email || '',
      phone: member.phone || '',
      bio: member.bio || '',
      image_url: member.image_url || '',
      linkedin: member.linkedin || '',
      twitter: member.twitter || '',
      status: member.status || 'active'
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this team member? This will remove them from the website.')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/team/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete team member');
      }

      await fetchMembers();
      alert('Team member removed successfully!');
    } catch (err) {
      console.error('Error deleting team member:', err);
      alert('Failed to remove team member: ' + err.message);
    }
  };

  const handleStatusToggle = async (member) => {
    const newStatus = member.status === 'active' ? 'inactive' : 'active';
    
    try {
      const response = await fetch(`http://localhost:5000/api/team/${member.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          ...member,
          status: newStatus
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      await fetchMembers();
      alert(`Team member ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status: ' + err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      department: '',
      email: '',
      phone: '',
      bio: '',
      image_url: '',
      linkedin: '',
      twitter: '',
      status: 'active'
    });
    setEditingMember(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="admin-section">
        <div className="loading-spinner">Loading team members...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-section">
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i> Error: {error}
        </div>
        <button onClick={fetchMembers} className="btn btn-primary">
          <i className="fas fa-sync-alt"></i> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <div>
          <h2>Team Members Management</h2>
          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
            Manage your team members displayed on the About Us page
          </p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn btn-primary"
        >
          {showForm ? (
            <>
              <i className="fas fa-times"></i> Cancel
            </>
          ) : (
            <>
              <i className="fas fa-plus"></i> Add Team Member
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>
            <i className={`fas ${editingMember ? 'fa-edit' : 'fa-plus-circle'}`}></i>{' '}
            {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="position">Position/Title *</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Chief Executive Officer"
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Leadership, Technology, Operations, etc."
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="john.doe@zureetelecom.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="+1-234-567-8900"
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="active">Active (Visible on website)</option>
                  <option value="inactive">Inactive (Hidden from website)</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="image_url">Profile Image URL</label>
                <input
                  type="url"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://example.com/profile-image.jpg"
                />
                <small style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
                  Recommended size: 400x400px (square image for best results)
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="linkedin">LinkedIn Profile URL</label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="twitter">Twitter/X Profile URL</label>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://twitter.com/johndoe"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="bio">Biography</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="4"
                  placeholder="Brief professional biography (2-3 sentences)..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <i className={`fas ${editingMember ? 'fa-save' : 'fa-plus-circle'}`}></i>
                {editingMember ? ' Update Team Member' : ' Add Team Member'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                <i className="fas fa-times"></i> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#667eea' }}>
            <i className="fas fa-users"></i>
          </div>
          <div>
            <span className="stat-label">Total Members</span>
            <span className="stat-value">{Array.isArray(members) ? members.length : 0}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#48bb78' }}>
            <i className="fas fa-check-circle"></i>
          </div>
          <div>
            <span className="stat-label">Active (On Website)</span>
            <span className="stat-value">
              {Array.isArray(members) ? members.filter(m => m.status === 'active').length : 0}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f6ad55' }}>
            <i className="fas fa-building"></i>
          </div>
          <div>
            <span className="stat-label">Departments</span>
            <span className="stat-value">
              {Array.isArray(members) ? new Set(members.map(m => m.department).filter(Boolean)).size : 0}
            </span>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(members) || members.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  <i className="fas fa-users" style={{ fontSize: '3rem', color: '#ccc', marginBottom: '1rem' }}></i>
                  <p>No team members found. Click "Add Team Member" to create one.</p>
                </td>
              </tr>
            ) : (
              members.map(member => (
                <tr key={member.id}>
                  <td>
                    <img 
                      src={member.image_url || 'https://via.placeholder.com/50'} 
                      alt={member.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #e5e7eb'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50';
                      }}
                    />
                  </td>
                  <td>
                    <strong>{member.name}</strong>
                  </td>
                  <td>{member.position}</td>
                  <td>
                    {member.department ? (
                      <span className="badge-category">{member.department}</span>
                    ) : (
                      <span style={{ color: '#9ca3af' }}>N/A</span>
                    )}
                  </td>
                  <td>
                    {member.email ? (
                      <a href={`mailto:${member.email}`} style={{ color: '#3b82f6' }}>
                        {member.email}
                      </a>
                    ) : (
                      <span style={{ color: '#9ca3af' }}>N/A</span>
                    )}
                  </td>
                  <td>
                    <span 
                      className={`status-badge status-${member.status}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleStatusToggle(member)}
                      title="Click to toggle status"
                    >
                      {member.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(member)}
                        className="btn btn-sm btn-primary"
                        title="Edit team member"
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="btn btn-sm btn-danger"
                        title="Delete team member"
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Help Text */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#f0f9ff', 
        borderLeft: '4px solid #3b82f6',
        borderRadius: '4px'
      }}>
        <p style={{ margin: 0, color: '#1e40af' }}>
          <i className="fas fa-info-circle"></i> <strong>Note:</strong> Only team members with "Active" status will be displayed on the About Us page of your website. 
          Use "Inactive" status to temporarily hide members without deleting them.
        </p>
      </div>
    </div>
  );
};

export default TeamMembers;