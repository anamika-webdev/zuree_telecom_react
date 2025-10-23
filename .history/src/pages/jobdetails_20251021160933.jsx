// src/pages/JobDetails.jsx
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
    } catch (err) {
      alert('Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return ;
  if (!job) return Job not found;

  const breadcrumbs = [
    { label: 'Career', link: '/career' },
    { label: job.title }
  ];

  return (
    
      
      
      
        
          
            
              
                
                   {job.location}
                
                
                   {job.type}
                
              

              Job Description
              

              Requirements
              

              Apply for this Position
              {success ? (
                
                  Application submitted successfully! We'll contact you soon.
                
              ) : (
                
                  
                    Full Name *
                    
                  
                  
                    Email *
                    
                  
                  
                    Phone *
                    
                  
                  
                    Cover Letter
                    
                  
                  
                    Upload Resume (PDF/DOC) *
                    
                  
                  
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  
                
              )}
            

            
              
                
                  Job Overview
                  
                    Location: {job.location}
                    Job Type: {job.type}
                    Posted: {new Date(job.postedDate).toLocaleDateString()}
                  
                
                
                  View All Jobs
                
              
            
          
        
      
    
  );
};

export default JobDetails;