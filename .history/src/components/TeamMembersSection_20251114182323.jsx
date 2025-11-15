// ============================================
// CLEAN & AESTHETIC TeamMembersSection Component
// Modern, professional design
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
      const response = await fetch('http://localhost:5000/api/team');
      
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }

      const data = await response.json();
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
          <div className="loading-wrapper">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading our amazing team...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="team-section">
        <div className="container">
          <div className="error-wrapper">
            <i className="fas fa-exclamation-circle error-icon"></i>
            <p className="error-text">Unable to load team members.</p>
            <button onClick={fetchTeamMembers} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="team-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Our Team</span>
          <h2 className="section-title">Meet Our Leadership</h2>
          <p className="section-subtitle">
            Dedicated professionals committed to driving innovation and excellence in everything we do.
          </p>
        </div>

        {/* Team Grid */}
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              className="team-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Inner */}
              <div className="team-card-inner">
                {/* Image Container */}
                <div className="team-image-container">
                  <div className="team-image-wrapper">
                    <img 
                      src={member.image_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&size=400&background=A89E91&color=fff&bold=true'} 
                      alt={member.name}
                      className="team-image"
                      onError={(e) => {
                        e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&size=400&background=A89E91&color=fff&bold=true';
                      }}
                    />
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="team-overlay">
                    <div className="team-social">
                      {member.linkedin && (
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="social-link"
                          aria-label={`Connect with ${member.name} on LinkedIn`}
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
                          aria-label={`Follow ${member.name} on Twitter`}
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
                <div className="team-content">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-position">{member.position}</p>
                  {member.department && (
                    <span className="team-department">
                      <i className="fas fa-building"></i>
                      {member.department}
                    </span>
                  )}
                  {member.bio && (
                    <p className="team-bio">{member.bio}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembersSection;