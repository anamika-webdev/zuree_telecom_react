// src/pages/admin/Users.jsx
import { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    loginId: '',
    name: '',
    email: '',
    role: 'admin',
    password: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // TODO: Replace with actual API call
      const mockUsers = [
        { id: 1, loginId: 'admin1', name: 'Admin User', email: 'admin@zuree.com', role: 'admin' },
        { id: 2, loginId: 'editor1', name: 'Editor User', email: 'editor@zuree.com', role: 'editor' }
      ];
      setUsers(mockUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      loginId: user.loginId,
      name: user.name,
      email: user.email,
      role: user.role,
      password: ''
    });
    setShowModal(true);
  };

  const handleCreate = () => {
    setFormData({
      id: null,
      loginId: '',
      name: '',
      email: '',
      role: 'admin',
      password: ''
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.loginId.trim()) {
      newErrors.loginId = 'Login ID is required';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.id && !formData.password) {
      newErrors.password = 'Password is required for new users';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // TODO: Replace with actual API call
      if (formData.id) {
        // Update user
        setUsers(users.map(u => u.id === formData.id ? { ...formData } : u));
        alert('User updated successfully');
      } else {
        // Create user
        const newUser = { ...formData, id: Date.now() };
        setUsers([...users, newUser]);
        alert('User created successfully');
      }

      setShowModal(false);
      setFormData({ id: null, loginId: '', name: '', email: '', role: 'admin', password: '' });
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // TODO: Implement delete API call
        setUsers(users.filter(user => user.id !== id));
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
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
    <div className="admin-users">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h1>Manage Users</h1>
        <button onClick={handleCreate} className="btn btn-primary">
          <i className="fas fa-plus"></i> Create New User
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Login ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">No users found</td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.loginId}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge bg-${user.role === 'admin' ? 'danger' : 'primary'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            onClick={() => handleEdit(user)}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            <i className="fas fa-trash"></i>
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
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{formData.id ? 'Edit User' : 'Create New User'}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Login ID *</label>
                      <input
                        type="text"
                        name="loginId"
                        className={`form-control ${errors.loginId ? 'is-invalid' : ''}`}
                        value={formData.loginId}
                        onChange={handleChange}
                      />
                      {errors.loginId && <div className="invalid-feedback">{errors.loginId}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Name *</label>
                      <input
                        type="text"
                        name="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Role *</label>
                      <select
                        name="role"
                        className="form-select"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Password {formData.id ? '(leave blank to keep current)' : '*'}
                      </label>
                      <input
                        type="password"
                        name="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={formData.id ? 'Enter new password' : 'Enter password'}
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {formData.id ? 'Update User' : 'Create User'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;