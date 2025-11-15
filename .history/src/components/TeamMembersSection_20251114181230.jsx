// ============================================
// DEBUG VERSION - TeamMembersSection Component
// This version logs everything to console for debugging
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
      console.log('🔍 Fetching team members from API...');
      
      const response = await fetch('http://localhost:5000/api/team');
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response OK:', response.ok);
      
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }

      const data = await response.json();
      console.log('📦 Raw API data:', data);
      console.log('📦 Data type:', typeof data);
      console.log('📦 Is Array:', Array.isArray(data));
      console.log('📦 Data length:', data.length);
      
      // Filter for active members only
      const activeMembers = data.filter(member => member.status === 'active');
      console.log('✅ Active members:', activeMembers);
      console.log('✅ Active members count:', activeMembers.length);
      
      setTeamMembers(activeMembers);
      setLoading(false);
      
      console.log('✨ State updated, loading complete');
    } catch (err) {
      console.error('❌ Error fetching team members:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  console.log('🎨 Render - Loading:', loading);
  console.log('🎨 Render - Error:', error);
  console.log('🎨 Render - Team members count:', teamMembers.length);
  console.log('🎨 Render - Team members:', teamMembers);

  if (loading) {
    console.log('⏳ Showing loading state');
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
    console.log('⚠️ Showing error state');
    return (
      <section className="team-section">
        <div className="container">
          <div className="error-state">
            <p>Unable to load team members. Please try again later.</p>
            <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    console.log('📭 No team members found, returning null');
    return null;
  }

  console.log('🎉 Rendering team section with', teamMembers.length, 'members');

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

        {/* DEBUG INFO - Remove this after debugging */}
        <div style={{ 
          background: '#fff3cd', 
          padding: '15px', 
          margin: '20px 0',
          borderRadius: '5px',
          border: '1px solid #ffc107'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>🐛 Debug Info (Remove after fixing)</h4>
          <p style={{ margin: '5px 0', color: '#856404' }}>
            <strong>Team Members Count:</strong> {teamMembers.length}
          </p>
          <p style={{ margin: '5px 0', color: '#856404' }}>
            <strong>Check Console (F12)</strong> for detailed logs
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="mt-5 row">
          {teamMembers.map((member, index) => {
            console.log(`🎨 Rendering card for member ${index}:`, member);
            
            return (
              <div 
                key={member.id} 
                className="mb-4 col-lg-3 col-md-6 reveal-on-scroll"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  border: '2px solid red' // DEBUG: Make cards visible
                }}
              >
                <div className="team-card" style={{ minHeight: '400px' }}>
                  {/* DEBUG: Show member data */}
                  <div style={{ 
                    background: '#f0f0f0', 
                    padding: '10px',
                    fontSize: '0.8rem',
                    borderBottom: '2px solid red'
                  }}>
                    <strong>DEBUG:</strong> {member.name}
                  </div>

                  {/* Member Image */}
                  <div className="team-image-wrapper">
                    <img 
                      src={member.image_url || 'https://via.placeholder.com/300x300?text=No+Image'} 
                      alt={member.name}
                      className="team-image"
                      onError={(e) => {
                        console.log(`⚠️ Image load error for ${member.name}`);
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                      }}
                      onLoad={() => {
                        console.log(`✅ Image loaded for ${member.name}`);
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
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                        )}
                        {member.email && (
                          <a 
                            href={`mailto:${member.email}`}
                            className="social-link"
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
            );
          })}
        </div>

        {/* DEBUG: End of section marker */}
        <div style={{ 
          background: '#d4edda', 
          padding: '10px', 
          margin: '20px 0',
          textAlign: 'center',
          color: '#155724'
        }}>
          ✅ End of Team Section - Rendered {teamMembers.length} cards
        </div>
      </div>
    </section>
  );
};

export default TeamMembersSection;