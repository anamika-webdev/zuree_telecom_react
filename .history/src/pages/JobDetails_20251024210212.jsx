// src/pages/JobDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import '../assets/css/pages/job-details.css';

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
  const [errors, setErrors] = useState({});

  // Mock job data - replace with API call
  const mockJobDetails = {
    1: {
      id: 1,
      title: 'Sr iOS Developer',
      location: 'Bangalore, Delhi, Mumbai, Chennai, Pune, Hyderabad',
      qualification: 'B.Tech/M.Tech in Computer Science or related field',
      salary: 'Rs. 15-25 LPA',
      lastDate: '2025-11-30',
      type: 'Full Time',
      experience: '5-8 years',
      postedDate: '2025-10-15',
      description: `
        <h4>Job Description</h4>
        <p>We are looking for an experienced iOS Developer to join our dynamic team. The ideal candidate will have a strong background in iOS development and a passion for creating exceptional user experiences.</p>
        
        <h4>Key Responsibilities:</h4>
        <ul>
          <li>Design and build advanced applications for the iOS platform</li>
          <li>Collaborate with cross-functional teams to define, design, and ship new features</li>
          <li>Unit-test code for robustness, including edge cases, usability, and general reliability</li>
          <li>Work on bug fixing and improving application performance</li>
          <li>Continuously discover, evaluate, and implement new technologies to maximize development efficiency</li>
        </ul>
      `,
      requirements: `
        <h4>Required Skills & Qualifications:</h4>
        <ul>
          <li>5+ years of iOS development experience</li>
          <li>Proficient in Swift and Objective-C</li>
          <li>Strong understanding of iOS UI design principles, patterns, and best practices</li>
          <li>Experience with iOS frameworks such as Core Data, Core Animation, etc.</li>
          <li>Familiarity with RESTful APIs to connect iOS applications to back-end services</li>
          <li>Understanding of Apple's design principles and interface guidelines</li>
          <li>Experience with performance and memory tuning tools</li>
          <li>Knowledge of code versioning tools such as Git</li>
        </ul>
        
        <h4>Preferred Qualifications:</h4>
        <ul>
          <li>Experience with SwiftUI</li>
          <li>Published apps in the App Store</li>
          <li>Experience with Agile development methodologies</li>
          <li>Strong problem-solving skills</li>
        </ul>
      `,
      benefits: `
        <h4>What We Offer:</h4>
        <ul>
          <li>Competitive salary package</li>
          <li>Health insurance</li>
          <li>Flexible working hours</li>
          <li>Work from home options</li>
          <li>Learning and development opportunities</li>
          <li>Collaborative work environment</li>
        </ul>
      `
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const jobData = mockJobDetails[id] || {
        id: id,
        title: 'Position Details',
        location: 'Multiple Locations',
        qualification: 'As per role requirements',
        salary: 'Competitive',
        description: '<p>Full job details will be shared during the interview process.</p>',
        requirements: '<p>Please submit your application to learn more about this position.</p>',
        type: 'Full Time',
        experience: 'As required',
        postedDate: '2025-10-20'
      };
      setJob(jobData);
      setLoading(false);
    }, 500);
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: 'Only PDF and DOC files are allowed' }));
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
      setErrors(prev => ({ ...prev, resume: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, use FormData for file upload
      // const formDataToSend = new FormData();
      // formDataToSend.append('jobId', id);
      // formDataToSend.append('name', formData.name);
      // formDataToSend.append('email', formData.email);
      // formDataToSend.append('phone', formData.phone);
      // formDataToSend.append('coverLetter', formData.coverLetter);
      // formDataToSend.append('resume', formData.resume);
      
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', coverLetter: '', resume: null });
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h3>Job not found</h3>
        <Link to="/career" className="mt-3 btn btn-primary">Back to Careers</Link>
      </div>
    );
  }

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
            {/* Main Content */}
            <div className="col-lg-8">
              {/* Job Header */}
              <div className="job-header-card">
                <h2 className="job-detail-title">{job.title}</h2>
                <div className="job-meta-info">
                  <span className="badge bg-primary me-2">
                    <i className="bi bi-geo-alt"></i> {job.location}
                  </span>
                  <span className="badge bg-success me-2">
                    <i className="bi bi-briefcase"></i> {job.type}
                  </span>
                  {job.experience && (
                    <span className="badge bg-info">
                      <i className="bi bi-clock-history"></i> {job.experience}
                    </span>
                  )}
                </div>
              </div>

              {/* Job Description */}
              <div className="job-content-section">
                <div dangerouslySetInnerHTML={{ __html: job.description }} />
              </div>

              {/* Job Requirements */}
              {job.requirements && (
                <div className="job-content-section">
                  <div dangerouslySetInnerHTML={{ __html: job.requirements }} />
                </div>
              )}

              {/* Benefits */}
              {job.benefits && (
                <div className="job-content-section">
                  <div dangerouslySetInnerHTML={{ __html: job.benefits }} />
                </div>
              )}

              {/* Application Form */}
              <div className="application-form-section">
                <h3 className="form-title">Apply for this Position</h3>
                
                {success ? (
                  <div className="alert alert-success" role="alert">
                    <i className="bi bi-check-circle me-2"></i>
                    <strong>Application Submitted Successfully!</strong>
                    <p className="mt-2 mb-0">Thank you for applying. We will review your application and get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="application-form">
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="name" className="form-label">Full Name *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                      </div>
                      
                      <div className="mb-3 col-md-6">
                        <label htmlFor="email" className="form-label">Email Address *</label>
                        <input
                          type="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 1234567890"
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="resume" className="form-label">Upload Resume * (PDF, DOC, DOCX - Max 5MB)</label>
                      <input
                        type="file"
                        className={`form-control ${errors.resume ? 'is-invalid' : ''}`}
                        id="resume"
                        name="resume"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                      {formData.resume && (
                        <div className="form-text text-success">
                          <i className="bi bi-check-circle"></i> {formData.resume.name}
                        </div>
                      )}
                      {errors.resume && <div className="invalid-feedback d-block">{errors.resume}</div>}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="coverLetter" className="form-label">Cover Letter (Optional)</label>
                      <textarea
                        className="form-control"
                        id="coverLetter"
                        name="coverLetter"
                        rows="5"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        placeholder="Tell us why you're a great fit for this role..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg w-100"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send me-2"></i>
                          Submit Application
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="sidebar-sticky">
                {/* Job Overview Card */}
                <div className="sidebar-card">
                  <h5 className="sidebar-card-title">Job Overview</h5>
                  <ul className="job-overview-list">
                    <li>
                      <i className="bi bi-geo-alt"></i>
                      <div>
                        <strong>Location</strong>
                        <span>{job.location}</span>
                      </div>
                    </li>
                    <li>
                      <i className="bi bi-briefcase"></i>
                      <div>
                        <strong>Job Type</strong>
                        <span>{job.type}</span>
                      </div>
                    </li>
                    {job.experience && (
                      <li>
                        <i className="bi bi-clock-history"></i>
                        <div>
                          <strong>Experience</strong>
                          <span>{job.experience}</span>
                        </div>
                      </li>
                    )}
                    <li>
                      <i className="bi bi-cash-stack"></i>
                      <div>
                        <strong>Salary</strong>
                        <span>{job.salary}</span>
                      </div>
                    </li>
                    {job.qualification && (
                      <li>
                        <i className="bi bi-mortarboard"></i>
                        <div>
                          <strong>Qualification</strong>
                          <span>{job.qualification}</span>
                        </div>
                      </li>
                    )}
                    <li>
                      <i className="bi bi-calendar-event"></i>
                      <div>
                        <strong>Posted</strong>
                        <span>{new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </li>
                    {job.lastDate && (
                      <li>
                        <i className="bi bi-calendar-x"></i>
                        <div>
                          <strong>Last Date</strong>
                          <span>{new Date(job.lastDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Share Job Card */}
                <div className="sidebar-card">
                  <h5 className="sidebar-card-title">Share this Job</h5>
                  <div className="share-buttons">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-btn facebook">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${job.title}`} target="_blank" rel="noopener noreferrer" className="share-btn twitter">
                      <i className="fab fa-telegram-plane"></i>
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-btn linkedin">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=${job.title} ${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-btn whatsapp">
                      <i className="bi bi-whatsapp"></i>
                    </a>
                  </div>
                </div>

                {/* Back to Jobs */}
                <Link to="/career" className="mt-3 btn btn-outline-primary w-100">
                  <i className="bi bi-arrow-left me-2"></i>
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