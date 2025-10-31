// src/pages/Services.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import '../assets/css/pages/services.css';

const Services = () => {
  const [activeTab, setActiveTab] = useState('app-development');

  const servicesData = {
    'app-development': {
      title: 'Application Development',
      services: [
        {
          icon: '📱',
          title: 'Web Application',
          description: 'Build robust and scalable web applications tailored to your business needs with modern technologies like React, Angular, and Node.js.',
          link: '/services/web-application',
          features: ['Custom Development', 'Responsive Design', 'Progressive Web Apps']
        },
        {
          icon: '🤖',
          title: 'Android Application',
          description: 'Create powerful Android apps with seamless user experiences and optimal performance using Java, Kotlin, and modern frameworks.',
          link: '/services/android-application',
          features: ['Native Android', 'Material Design', 'Play Store Optimization']
        },
        {
          icon: '🍎',
          title: 'iOS Application',
          description: 'Develop native iOS applications that deliver exceptional quality and user engagement for iPhone and iPad users.',
          link: '/services/ios-application',
          features: ['Swift Development', 'App Store Ready', 'iOS Best Practices']
        },
        {
          icon: '🔄',
          title: 'Hybrid Application',
          description: 'Build cross-platform applications that work seamlessly across multiple devices using React Native, Flutter, or Ionic.',
          link: '/services/hybrid-application',
          features: ['Cross-Platform', 'Single Codebase', 'Fast Development']
        },
        {
          icon: '🪟',
          title: 'Windows Application',
          description: 'Develop desktop applications for Windows with rich features and intuitive interfaces using .NET technologies.',
          link: '/services/windows-application',
          features: ['.NET Framework', 'WPF/WinForms', 'Modern UI']
        }
      ]
    },
    'digital-services': {
      title: 'Digital Services',
      services: [
        {
          icon: '🔍',
          title: 'SEO Services',
          description: "Improve your website's visibility and rankings with our comprehensive SEO strategies and technical optimization.",
          link: '/services/seo',
          features: ['On-Page SEO', 'Technical SEO', 'Link Building']
        },
        {
          icon: '📊',
          title: 'Digital Marketing',
          description: 'Drive growth with data-driven digital marketing campaigns across multiple channels and platforms.',
          link: '/services/digital-marketing',
          features: ['PPC Campaigns', 'Social Ads', 'Analytics']
        },
        {
          icon: '💬',
          title: 'Social Media Marketing',
          description: 'Engage your audience and build brand awareness through strategic social media campaigns on all major platforms.',
          link: '/services/social-media-marketing',
          features: ['Content Strategy', 'Community Management', 'Influencer Marketing']
        },
        {
          icon: '📧',
          title: 'Email Marketing',
          description: 'Create targeted email campaigns that convert prospects into loyal customers with personalized messaging.',
          link: '/services/email-marketing',
          features: ['Campaign Design', 'Automation', 'A/B Testing']
        },
        {
          icon: '✍️',
          title: 'Content Marketing',
          description: 'Develop compelling content strategies that resonate with your target audience and drive engagement.',
          link: '/services/content-marketing',
          features: ['Content Strategy', 'Blog Writing', 'Video Content']
        }
      ]
    },
    'it-consulting': {
      title: 'IT Consulting',
      services: [
        {
          icon: '👥',
          title: 'Staff Augmentation',
          description: 'Scale your team quickly with skilled professionals who integrate seamlessly with your organization and culture.',
          link: '/services/staff-augmentation',
          features: ['Flexible Staffing', 'Skilled Professionals', 'Quick Onboarding']
        },
        {
          icon: '🎯',
          title: 'Talent Management',
          description: 'Optimize your workforce with strategic talent management and development programs tailored to your needs.',
          link: '/services/talent-management',
          features: ['Performance Management', 'Training Programs', 'Career Development']
        },
        {
          icon: '🔎',
          title: 'Recruitment Process Outsourcing',
          description: 'Streamline your hiring process with our end-to-end recruitment solutions and talent acquisition expertise.',
          link: '/services/recruitment-process-outsourcing',
          features: ['End-to-End Recruitment', 'Talent Sourcing', 'Interview Management']
        }
      ]
    },
    'other-services': {
      title: 'Other Services',
      services: [
        {
          icon: '📡',
          title: '5G Transformation',
          description: 'Leverage the power of 5G technology to transform your business operations and connectivity infrastructure.',
          link: '/services/5g',
          features: ['5G Implementation', 'Network Optimization', 'IoT Integration']
        },
        {
          icon: '🌐',
          title: 'Networking and Wi-Fi',
          description: 'Design and implement robust networking solutions for seamless connectivity across your organization.',
          link: '/services/networking',
          features: ['Network Design', 'Wi-Fi Solutions', 'Security']
        },
        {
          icon: '⛓️',
          title: 'Blockchain',
          description: 'Implement secure and transparent blockchain solutions for your business processes and applications.',
          link: '/services/blockchain',
          features: ['Smart Contracts', 'DApp Development', 'Cryptocurrency']
        },
        {
          icon: '📈',
          title: 'BI & Analytics',
          description: 'Transform data into actionable insights with advanced business intelligence and analytics solutions.',
          link: '/services/bi-analytics',
          features: ['Data Visualization', 'Predictive Analytics', 'Reporting']
        },
        {
          icon: '🥽',
          title: 'VR & AR Solutions',
          description: 'Create immersive experiences with cutting-edge virtual and augmented reality solutions for various industries.',
          link: '/services/vr-ar-solutions',
          features: ['VR Development', 'AR Applications', '3D Modeling']
        }
      ]
    }
  };

  const tabs = [
    { id: 'app-development', label: 'Application Development' },
    { id: 'digital-services', label: 'Digital Services' },
    { id: 'it-consulting', label: 'IT Consulting' },
    { id: 'other-services', label: 'Other Services' }
  ];

  const breadcrumbs = [{ label: 'Services' }];

  return (
    <div className="services-page">
      <PageTitle title="Our Services" breadcrumbItems={breadcrumbs} />
      
      <section className="services-section section-padding">
        <div className="container">
          <div className="mb-5 text-center section-intro">
            <h2 className="section-title">Comprehensive IT Solutions</h2>
            <p className="section-subtitle">
              We offer a wide range of services to help your business thrive in the digital age.
              From development to consulting, we've got you covered.
            </p>
          </div>

          {/* Service Tabs */}
          <div className="service-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content-wrapper">
            <div className={`tab-content ${activeTab ? 'active' : ''}`}>
              <div className="service-grid">
                {servicesData[activeTab].services.map((service, index) => (
                  <div key={index} className="service-card">
                    <div className="service-card-icon">{service.icon}</div>
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-description">{service.description}</p>
                    
                    <ul className="service-features">
                      {service.features.map((feature, idx) => (
                        <li key={idx}>✓ {feature}</li>
                      ))}
                    </ul>
                    
                    <Link to={service.link} className="service-card-link">
                      Learn More <span className="arrow-right">→</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-5 text-center services-cta">
            <h3>Ready to Get Started?</h3>
            <p>Let's discuss how we can help transform your business</p>
            <Link to="/contact-us" className="btn btn-primary btn-lg">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;