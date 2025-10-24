// FILE: src/pages/JobDetails.jsx
// ============================================
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { careerService } from '../services/careerService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await careerService.getJobById(id);
        setJob(data.job);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await careerService.applyForJob(id, formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', coverLetter: '', resume: null });
    } catch (error) {
  console.error('Error:', error);
  alert('Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!job) return <div className="container" style={{ padding: '100px 0' }}><h3>Job not found</h3></div>;

  const breadcrumbs = [
    { label: 'Career', link: '/career' },
    { label: job.title }
  ];

  return (
    <div className="job-details-page">
      <PageTitle title={job.title} breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="job-info mb-4">
                <span className="badge bg-primary me-2">
                  {job.location}
                </span>
                <span className="badge bg-secondary">
                  {job.type}
                </span>
              </div>

              <h3>Job Description</h3>
              <div dangerouslySetInnerHTML={{ __html: job.description }} />

              {job.requirements && (
                <>
                  <h3 className="mt-4">Requirements</h3>
                  <div dangerouslySetInnerHTML={{ __html: job.requirements }} />
                </>
              )}

              <h3 className="mt-5">Apply for this Position</h3>
              {success ? (
                <div className="alert alert-success">
                  Application submitted successfully! We'll contact you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-3">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      className="form-control" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label>Email *</label>
                    <input 
                      type="email" 
                      name="email" 
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label>Phone *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label>Cover Letter</label>
                    <textarea 
                      name="coverLetter" 
                      className="form-control" 
                      rows="5"
                      value={formData.coverLetter}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label>Upload Resume (PDF/DOC) *</label>
                    <input 
                      type="file" 
                      className="form-control"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>

            <div className="col-lg-4">
              <div className="sidebar">
                <div className="widget bg-light p-4 rounded">
                  <h5>Job Overview</h5>
                  <ul className="list-unstyled">
                    <li><strong>Location:</strong> {job.location}</li>
                    <li><strong>Job Type:</strong> {job.type}</li>
                    <li><strong>Posted:</strong> {new Date(job.postedDate).toLocaleDateString()}</li>
                  </ul>
                </div>
                <Link to="/career" className="btn btn-outline-primary w-100 mt-3">
                  View All Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetails;