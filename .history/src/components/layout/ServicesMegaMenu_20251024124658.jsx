// FILE: src/components/layout/ServicesMegaMenu.jsx


import { Link } from 'react-router-dom';

const ServicesMegaMenu = () => {
  return (
    <div className="mega-menu-content">
      {/* Column 1 - Application Development */}
      <div className="mega-menu-col">
        <h5>Application Development</h5>
        <ul>
          <li><Link to="/services/web-application">Web Application</Link></li>
          <li><Link to="/services/android-application">Android Application</Link></li>
          <li><Link to="/services/ios-application">iOS Application</Link></li>
          <li><Link to="/services/hybrid-application">Hybrid Application</Link></li>
          <li><Link to="/services/windows-application">Windows Application</Link></li>
        </ul>
      </div>

      {/* Column 2 - Digital Services */}
      <div className="mega-menu-col">
        <h5>Digital Services</h5>
        <ul>
          <li><Link to="/services/seo">SEO Services</Link></li>
          <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
          <li><Link to="/services/social-media-marketing">Social Media Marketing</Link></li>
          <li><Link to="/services/email-marketing">Email Marketing</Link></li>
          <li><Link to="/services/content-marketing">Content Marketing</Link></li>
        </ul>
      </div>

      {/* Column 3 - IT Consulting */}
      <div className="mega-menu-col">
        <h5>IT Consulting</h5>
        <ul>
          <li><Link to="/services/staff-augmentation">Staff Augmentation/Flexi Staffing</Link></li>
          <li><Link to="/services/talent-management">Talent Management</Link></li>
          <li><Link to="/services/recruitment-process-outsourcing">Recruitment Process Outsourcing</Link></li>
        </ul>
      </div>

      {/* Column 4 - Other Services */}
      <div className="mega-menu-col">
        <h5>Other Services</h5>
        <ul>
          <li><Link to="/services/5g-transformation">5G Transformation</Link></li>
          <li><Link to="/services/networking-wifi">Networking and Wi-Fi</Link></li>
          <li><Link to="/services/blockchain">Blockchain</Link></li>
          <li><Link to="/services/bi-analytics">BI & Analytics</Link></li>
          <li><Link to="/services/vr-ar-solutions">VR & AR Solutions</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default ServicesMegaMenu;