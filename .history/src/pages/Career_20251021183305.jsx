// FILE: src/pages/Career.jsx
// ============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { careerService } from '../services/careerService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const breadcrumbs = [{ label: 'Career' }];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await careerService.getAllJobs();
      setJobs(data.jobs);
    } catch (err) {
      setError(err.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="career-page">
      <PageTitle title="Career Opportunities" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          {loading ? (
            <LoadingSpinner text="Loading job openings..." />
          ) : error ? (
            <ErrorMessage message={error} onRetry={fetchJobs} />
          ) : jobs.length === 0 ? (
            <div className="text-center">
              <p>No job openings available at the moment.</p>
            </div>
          ) : (
            <div className="row">
              {jobs.map((job) => (
                <div key={job.id} className="mb-4 col-lg-6">
                  <div className="p-4 border rounded job-card">
                    <h3>{job.title}</h3>
                    <div className="mb-3 job-meta">
                      <span className="badge bg-primary me-2">
                        {job.location}
                      </span>
                      <span className="badge bg-secondary">
                        {job.type}
                      </span>
                    </div>
                    <p>{job.description && job.description.substring(0, 150)}...</p>
                    <Link 
                      to={`/job-details/${job.id}`} 
                      className="btn btn-outline-primary"
                    >
                      View Details & Apply
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Career;