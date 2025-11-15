// ============================================
// IMPROVED TeamMembersSection Component
// Shows a message when no team members exist
// File: src/components/TeamMembersSection.jsx
// ============================================

import { useState, useEffect } from 'react';
import '../assets/css/team-section.css';

const TeamMembersSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/team', {
        headers: {
          // Add auth token if your endpoint requires it
          // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }

      const data = await response.json();
      
      // Filter for active members only on the frontend
      const activeMembers = data.filter(member => member.status === 'active');
      
      setTeamMembers(activeMembers);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="team-section">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading team members...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="team-section">
        <div className="container">
          <div className="error-state">
            <p>Unable to load team members. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // ✅ CHANGED: Show section header even if no members
  return (
    <section className="team-section">
      <div className="container">
        {/* Section Header */}
        <div className="row">
          <div className="mx-auto text-center col-lg-8 reveal-on-scroll">
            <span className="section-badge">Our Team</span>
            <h2 className="section-heading">Meet Our Leadership</h2>
            <p className="section-description">
              Dedicated professionals committed to driving innovation and excellence 
              in everything we do.
            </p>
          </div>
        </div>

        {/* ✅ CHANGED: Show message when no team members */}
        {teamMembers.length === 0 ? (
          <div className="mt-5 row">
            <div className="col-12">
              <div className="text-center no-team-message">
                <i className="fas fa-users" style={{ fontSize: '3rem', color: '#A89E91', marginBottom: '1rem' }}></i>
                <h4 style={{ color: '#2d1b4e', marginBottom: '0.5rem' }}>Our Team Section</h4>
                <p style={{ color: '#666' }}>Team member profiles will be displayed here soon.</p>
              </div>
            </div>
          </div>
        ) : (
          // Team Members Grid
          <div className="mt-5 row">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id} 
                className="mb-4 col-lg-3 col-md-6 reveal-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="team-card">
                  {/* Member Image */}
                  <div className="team-image-wrapper">
                    <img 
                      src={member.image_url || '/images/default-avatar.png'} 
                      alt={member.name}
                      className="team-image"
                      onError={(e) => {
                        e.target.src = '/images/default-avatar.png';
                      }}
                    />
                    <div className="team-overlay">
                      <div className="team-social">
                        {member.linkedin && (
                          <a 
                            href={member.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label={`${member.name}'s LinkedIn`}
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        )}
                        {member.twitter && (
                          <a 
                            href={member.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label={`${member.name}'s Twitter`}
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                        )}
                        {member.email && (
                          <a 
                            href={`mailto:${member.email}`}
                            className="social-link"
                            aria-label={`Email ${member.name}`}
                          >
                            <i className="fas fa-envelope"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="team-info">
                    <h4 className="team-name">{member.name}</h4>
                    <p className="team-position">{member.position}</p>
                    {member.department && (
                      <span className="team-department">{member.department}</span>
                    )}
                    {member.bio && (
                      <p className="team-bio">{member.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamMembersSection;