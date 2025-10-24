// src/pages/Career.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import '../assets/css/pages/career.css';

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    location: '',
    department: '',
    search: ''
  });

  const jobsPerPage = 10;
  const breadcrumbs = [{ label: 'Career' }];

  // Mock job data - replace with API call
  const mockJobs = [
    {
      id: 1,
      title: 'Sr iOS Developer',
      location: 'Bangalore, Delhi, mumbai,chennai,pune, hyderabad',
      qualification: '',
      salary: 'Rs. -',
      lastDate: ''
    },
    {
      id: 2,
      title: 'SRE Application Lead',
      location: 'Bangalore, noida, mumbai,chennai,pune, hyderabad',
      qualification: '',
      salary: 'Rs. -',
      lastDate: ''
    },
    {
      id: 3,
      title: 'SAP BODS',
      location: 'Hyderabad',
      qualification: '',
      salary: 'Rs. -',
      lastDate: ''
    },
    {
      id: 4,
      title: 'SAP PO Consultant',
      location: 'Hyderabad',
      qualification: '',
      salary: 'Rs. -',
      lastDate: ''
    },
    {
      id: 5,
      title: 'Sr Python Developer',
      location: 'Bangalore, noida, mumbai,chennai,pune, hyderabad',
      qualification: '',
      salary: 'Rs. -',
      lastDate: ''
    },
    {
      id: 6,
      title: 'Senior Frontend Tester',
      location: 'Chennai,Bangalore,mumbai,delhi,pune, hyderabad',
      qualification: '',
      salary: 'Rs. -',
      lastDate: ''
    },
    {
      id: 7,
      title: 'Senior Backend/API Automation Engineer',
      location: '',
      qualification: '',
      salary: 'Rs. -',
      lastDate: ''
    },
    {
      id: 8,
      title: 'Load Tester',
      location: 'Delhi,Mumbai,Chennai,Bangalore,pune, hyderabad',
      qualification: '',
      salary: 'Rs. -',
      lastDate: ''
    },
    {
      id: 9,
      title: 'Full Stack Developer In Oracle R12',
      location: 'Hyderabad , Banglore , Kolkata , Chennai',
      qualification: '',
      salary: 'Rs. -',
      lastDate: ''
    },
    {
      id: 10,
      title: '5G Core Developer',
      location: 'Noida',
      qualification: 'B.E. or B Tech Telecommunication or equivalent',
      salary: 'Rs. 400000 - MTM',
      lastDate: ''
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 500);
  }, []);

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(filter.search.toLowerCase()) ||
                         job.location.toLowerCase().includes(filter.search.toLowerCase());
    const matchesLocation = !filter.location || job.location.toLowerCase().includes(filter.location.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="career-page">
      <PageTitle title="Career" breadcrumbItems={breadcrumbs} />
      
      <section className="career-section section-padding">
        <div className="container">
          {/* Introduction */}
          <div className="mb-5 text-center career-intro">
            <h2 className="section-title">Join Our Team</h2>
            <p className="section-subtitle">
              Explore exciting career opportunities and be part of our innovative team. 
              We're always looking for talented individuals to join us.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-4 career-filters">
            <div className="row g-3">
              <div className="col-lg-6 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by job title or location..."
                  name="search"
                  value={filter.search}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-lg-3 col-md-6">
                <select 
                  className="form-select"
                  name="location"
                  value={filter.location}
                  onChange={handleFilterChange}
                >
                  <option value="">All Locations</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="chennai">Chennai</option>
                  <option value="pune">Pune</option>
                  <option value="noida">Noida</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-6">
                <button 
                  className="btn btn-outline-secondary w-100"
                  onClick={() => {
                    setFilter({ location: '', department: '', search: '' });
                    setCurrentPage(1);
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          {loading ? (
            <div className="py-5 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading job openings...</p>
            </div>
          ) : currentJobs.length === 0 ? (
            <div className="py-5 text-center">
              <h4>No jobs found</h4>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            <>
              <div className="row">
                {currentJobs.map((job) => (
                  <div key={job.id} className="mb-4 col-lg-6 col-md-6">
                    <div className="job-card">
                      <div className="job-card-header">
                        <h3 className="job-title">
                          Post: <span className="job-title-text">{job.title}</span>
                        </h3>
                      </div>
                      <div className="job-card-body">
                        <div className="job-info-item">
                          <span className="job-label">Location:</span>
                          <span className="job-value">{job.location || 'Not specified'}</span>
                        </div>
                        {job.qualification && (
                          <div className="job-info-item">
                            <span className="job-label">Qualification:</span>
                            <span className="job-value">{job.qualification}</span>
                          </div>
                        )}
                        <div className="job-info-item">
                          <span className="job-label">Salary:</span>
                          <span className="job-value">{job.salary}</span>
                        </div>
                        {job.lastDate && (
                          <div className="job-info-item">
                            <span className="job-label">Last Date:</span>
                            <span className="job-value">{job.lastDate}</span>
                          </div>
                        )}
                      </div>
                      <div className="job-card-footer">
                        <Link 
                          to={`/job-details/${job.id}`} 
                          className="btn-view-apply"
                        >
                          View & Apply
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination-wrapper">
                  <nav aria-label="Job listings pagination">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          «
                        </button>
                      </li>
                      
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        // Show first page, last page, current page, and pages around current
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <li 
                              key={pageNumber} 
                              className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                            >
                              <button 
                                className="page-link"
                                onClick={() => paginate(pageNumber)}
                              >
                                {pageNumber}
                              </button>
                            </li>
                          );
                        } else if (
                          pageNumber === currentPage - 2 ||
                          pageNumber === currentPage + 2
                        ) {
                          return (
                            <li key={pageNumber} className="page-item disabled">
                              <span className="page-link">...</span>
                            </li>
                          );
                        }
                        return null;
                      })}
                      
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          »
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}

          {/* Stats Section */}
          <div className="pt-5 mt-5 career-stats">
            <div className="text-center row">
              <div className="mb-4 col-md-3 col-6">
                <div className="stat-card">
                  <h3 className="stat-number">{filteredJobs.length}+</h3>
                  <p className="stat-label">Open Positions</p>
                </div>
              </div>
              <div className="mb-4 col-md-3 col-6">
                <div className="stat-card">
                  <h3 className="stat-number">500+</h3>
                  <p className="stat-label">Team Members</p>
                </div>
              </div>
              <div className="mb-4 col-md-3 col-6">
                <div className="stat-card">
                  <h3 className="stat-number">15+</h3>
                  <p className="stat-label">Locations</p>
                </div>
              </div>
              <div className="mb-4 col-md-3 col-6">
                <div className="stat-card">
                  <h3 className="stat-number">10+</h3>
                  <p className="stat-label">Years Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Join Us Section */}
          <div className="pt-5 mt-5 why-join-section">
            <h2 className="mb-5 text-center">Why Join Zuree Telecom?</h2>
            <div className="row">
              <div className="mb-4 col-md-4">
                <div className="benefit-card">
                  <div className="benefit-icon">🚀</div>
                  <h4>Career Growth</h4>
                  <p>Continuous learning opportunities and clear career progression paths.</p>
                </div>
              </div>
              <div className="mb-4 col-md-4">
                <div className="benefit-card">
                  <div className="benefit-icon">💼</div>
                  <h4>Work-Life Balance</h4>
                  <p>Flexible working hours and remote work options for better balance.</p>
                </div>
              </div>
              <div className="mb-4 col-md-4">
                <div className="benefit-card">
                  <div className="benefit-icon">🎯</div>
                  <h4>Innovative Projects</h4>
                  <p>Work on cutting-edge technologies with global clients.</p>
                </div>
              </div>
              <div className="mb-4 col-md-4">
                <div className="benefit-card">
                  <div className="benefit-icon">🏥</div>
                  <h4>Health Benefits</h4>
                  <p>Comprehensive health insurance and wellness programs.</p>
                </div>
              </div>
              <div className="mb-4 col-md-4">
                <div className="benefit-card">
                  <div className="benefit-icon">🎓</div>
                  <h4>Learning & Development</h4>
                  <p>Training programs, certifications, and skill development initiatives.</p>
                </div>
              </div>
              <div className="mb-4 col-md-4">
                <div className="benefit-card">
                  <div className="benefit-icon">🌍</div>
                  <h4>Global Exposure</h4>
                  <p>Opportunity to work with international teams and clients.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;