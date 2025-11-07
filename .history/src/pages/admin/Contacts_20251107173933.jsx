import React, { useState, useEffect } from 'react';
import '../../styles/components.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/contacts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();
      setContacts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contacts/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      await fetchContacts();
      alert('Status updated successfully');
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      await fetchContacts();
      setSelectedContact(null);
      alert('Contact message deleted successfully!');
    } catch (err) {
      console.error('Error deleting contact:', err);
      alert('Failed to delete contact: ' + err.message);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (filterStatus === 'all') return true;
    return contact.status === filterStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="admin-section">
        <div className="loading-spinner">Loading contacts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-section">
        <div className="error-message">Error: {error}</div>
        <button onClick={fetchContacts} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Contact Messages</h2>
        <div className="filter-controls">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-select"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      <div className="applications-container">
        <div className="applications-list">
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-label">Total</span>
              <span className="stat-value">{contacts.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Unread</span>
              <span className="stat-value">
                {contacts.filter(c => c.status === 'unread').length}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Read</span>
              <span className="stat-value">
                {contacts.filter(c => c.status === 'read').length}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Replied</span>
              <span className="stat-value">
                {contacts.filter(c => c.status === 'replied').length}
              </span>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No contact messages found
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map(contact => (
                    <tr 
                      key={contact.id}
                      className={selectedContact?.id === contact.id ? 'selected' : ''}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone || 'N/A'}</td>
                      <td>{contact.subject || 'No subject'}</td>
                      <td>{formatDate(contact.created_at)}</td>
                      <td>
                        <span className={`status-badge status-${contact.status || 'unread'}`}>
                          {contact.status || 'unread'}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedContact(contact);
                          }}
                          className="btn btn-sm btn-primary"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedContact && (
          <div className="application-detail">
            <div className="detail-header">
              <h3>Message Details</h3>
              <button 
                onClick={() => setSelectedContact(null)}
                className="btn btn-sm"
              >
                Close
              </button>
            </div>

            <div className="detail-content">
              <div className="detail-section">
                <h4>Contact Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Name:</label>
                    <span>{selectedContact.name}</span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{selectedContact.email}</span>
                  </div>
                  <div className="detail-item">
                    <label>Phone:</label>
                    <span>{selectedContact.phone || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Subject:</label>
                    <span>{selectedContact.subject || 'No subject'}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Message</h4>
                <p className="cover-letter">{selectedContact.message}</p>
              </div>

              <div className="detail-section">
                <h4>Status</h4>
                <select
                  value={selectedContact.status || 'unread'}
                  onChange={(e) => updateStatus(selectedContact.id, e.target.value)}
                  className="form-select"
                >
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>

              <div className="detail-actions">
                <a 
                  href={`mailto:${selectedContact.email}`}
                  className="btn btn-primary"
                >
                  <i className="fas fa-reply"></i> Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  className="btn btn-danger"
                >
                  Delete Message
                </button>
              </div>

              <div className="detail-meta">
                <small>Received on: {formatDate(selectedContact.created_at)}</small>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;