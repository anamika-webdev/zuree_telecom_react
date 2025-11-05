// src/pages/admin/Contacts.jsx
import { useState, useEffect } from 'react';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      // TODO: Replace with actual API call
      const mockContacts = [
        {
          id: 1,
          name: 'Alice Brown',
          email: 'alice@example.com',
          phone: '1234567890',
          subject: 'Partnership Inquiry',
          message: 'I am interested in partnering with your company for a project...',
          date: '2024-01-15',
          status: 'unread'
        },
        {
          id: 2,
          name: 'Bob Wilson',
          email: 'bob@example.com',
          phone: '0987654321',
          subject: 'Service Question',
          message: 'Can you provide more information about your 5G services?',
          date: '2024-01-14',
          status: 'read'
        }
      ];
      setContacts(mockContacts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // TODO: Implement status update API call
      setContacts(contacts.map(contact =>
        contact.id === id ? { ...contact, status: newStatus } : contact
      ));
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    if (contact.status === 'unread') {
      handleStatusChange(contact.id, 'read');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      try {
        // TODO: Implement delete API call
        setContacts(contacts.filter(contact => contact.id !== id));
        setSelectedContact(null);
        alert('Contact deleted successfully');
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Failed to delete contact');
      }
    }
  };

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-contacts">
      <h1 className="mb-4">Contact Messages</h1>

      <div className="row">
        <div className="col-md-5">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Messages</h5>
            </div>
            <div className="list-group list-group-flush" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {contacts.length === 0 ? (
                <div className="p-3 text-center text-muted">No messages found</div>
              ) : (
                contacts.map(contact => (
                  <div
                    key={contact.id}
                    className={`list-group-item list-group-item-action ${selectedContact?.id === contact.id ? 'active' : ''} ${contact.status === 'unread' ? 'fw-bold' : ''}`}
                    onClick={() => handleView(contact)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{contact.name}</h6>
                        <p className="mb-1 text-truncate" style={{ maxWidth: '250px' }}>
                          {contact.subject}
                        </p>
                        <small>{new Date(contact.date).toLocaleDateString()}</small>
                      </div>
                      {contact.status === 'unread' && (
                        <span className="badge bg-primary">New</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-md-7">
          {selectedContact ? (
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Message Details</h5>
                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <strong>From:</strong> {selectedContact.name}
                </div>
                <div className="mb-3">
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a>
                </div>
                <div className="mb-3">
                  <strong>Phone:</strong> {selectedContact.phone}
                </div>
                <div className="mb-3">
                  <strong>Subject:</strong> {selectedContact.subject}
                </div>
                <div className="mb-3">
                  <strong>Date:</strong> {new Date(selectedContact.date).toLocaleString()}
                </div>
                <hr />
                <div className="mb-3">
                  <strong>Message:</strong>
                  <p className="mt-2">{selectedContact.message}</p>
                </div>
                <div className="gap-2 d-flex">
                  <a
                    href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                    className="btn btn-primary"
                  >
                    <i className="fas fa-reply"></i> Reply via Email
                  </a>
                  <select
                    className="form-select"
                    value={selectedContact.status}
                    onChange={(e) => handleStatusChange(selectedContact.id, e.target.value)}
                    style={{ maxWidth: '200px' }}
                  >
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="py-5 text-center card-body text-muted">
                <i className="mb-3 fas fa-envelope fa-3x"></i>
                <p>Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;