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
        throw new Error(`Failed to ${editingMember ? 'update' : 'add'} team member`);
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
    if (!window.confirm('Are you sure you want to remove this team member?')) {
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
        <div className="error-message">Error: {error}</div>
        <button onClick={fetchMembers} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Team Members</h2>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : '+ Add Team Member'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
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
                  placeholder="e.g., John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="position">Position *</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., Senior Developer"
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
                  placeholder="e.g., Engineering"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image_url">Photo URL</label>
                <input
                  type="url"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div className="form-group">
                <label htmlFor="linkedin">LinkedIn URL</label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="twitter">Twitter URL</label>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://twitter.com/username"
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="form-textarea"
                rows="4"
                placeholder="Brief bio about the team member..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingMember ? 'Update Member' : 'Add Member'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-label">Total Members</span>
          <span className="stat-value">{Array.isArray(members) ? members.length : 0}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active</span>
          <span className="stat-value">
            {Array.isArray(members) ? members.filter(m => m.status === 'active').length : 0}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Departments</span>
          <span className="stat-value">
            {Array.isArray(members) ? new Set(members.map(m => m.department).filter(Boolean)).size : 0}
          </span>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
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
                <td colSpan="6" className="no-data">
                  No team members found. Click "Add Team Member" to add one.
                </td>
              </tr>
            ) : (
              members.map(member => (
                <tr key={member.id}>
                  <td>
                    <strong>{member.name}</strong>
                  </td>
                  <td>{member.position}</td>
                  <td>{member.department || 'N/A'}</td>
                  <td>{member.email}</td>
                  <td>
                    <span className={`status-badge status-${member.status}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(member)}
                        className="btn btn-sm btn-primary"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="btn btn-sm btn-danger"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamMembers;