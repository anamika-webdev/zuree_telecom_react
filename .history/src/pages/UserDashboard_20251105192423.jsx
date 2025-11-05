// src/pages/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import PageTitle from '../components/common/PageTitle';
import { useAuth } from '../hooks/useAuth';
// import { getAppliedJobs } from '../services/careerService'; // Assumed function

const UserDashboard = () => {
  const { user } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const breadcrumbs = [{ label: 'Dashboard' }];

  useEffect(() => {
    // This function would fetch jobs the user has applied for
    const fetchAppliedJobs = async () => {
      if (!user) return;
      
      setLoading(true);
      setError('');
      try {
        // --- Placeholder ---
        // In a real app, you would make an API call like:
        // const jobs = await getAppliedJobs(user.token); 
        // For now, we'll use placeholder data.
        console.log("Fetching applied jobs for user:", user.loginId);
        
        const placeholderJobs = [
          { id: 1, title: 'Senior React Developer', status: 'Pending Review' },
          { id: 2, title: 'Network Engineer', status: 'Interview Scheduled' },
        ];
        setAppliedJobs(placeholderJobs);
        // --- End Placeholder ---

      } catch (err) {
        setError('Failed to load applied jobs.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [user]); // Re-run if user info changes

  return (
    <div className="user-dashboard-page">
      <PageTitle title="My Dashboard" breadcrumbItems={breadcrumbs} />

      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="mb-4">
                {/* Ensure user object exists before trying to access its properties */}
                <h3>Welcome, {user?.loginId || 'User'}!</h3>
                <p className="text-muted">This is your personal dashboard. You can view your applied jobs and navigate the site.</p>
              </div>

              <hr />

              <div className="mt-5 applied-jobs-section">
                <h4>My Applied Jobs</h4>
                {loading && <p>Loading your jobs...</p>}
                {error && <div className="alert alert-danger">{error}</div>}
                
                {!loading && !error && appliedJobs.length > 0 && (
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Job Title</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appliedJobs.map(job => (
                          <tr key={job.id}>
                            <td>{job.title}</td>
                            <td>
                              <span className={`badge ${job.status === 'Pending Review' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                {job.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {!loading && !error && appliedJobs.length === 0 && (
                  <div className="p-4 text-center border rounded">
                    <p className="mb-0 text-muted">You have not applied for any jobs yet.</p>
                    <a href="/career" className="mt-3 btn btn-primary btn-sm">Browse Jobs</a>
                  </div>
                )}
              </div>
              
              <div className="mt-5 complete-site-section">
                <h4>Explore Zuree Telecom</h4>
                <p>From here, you can access all other parts of the user site.</p>
                <a href="/" className="btn btn-outline-primary me-2">Home</a>
                <a href="/about" className="btn btn-outline-primary me-2">About Us</a>
                <a href="/services" className="btn btn-outline-primary me-2">Services</a>
                <a href="/career" className="btn btn-outline-primary me-2">Careers</a>
                <a href="/contact" className="btn btn-outline-primary">Contact Us</a>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;