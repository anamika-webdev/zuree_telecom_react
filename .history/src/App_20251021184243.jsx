import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import VisionMission from './pages/VisionMission';
import Career from './pages/Career';
import JobDetails from '../../pages/JobDetails';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';

// Services Pages
import AndroidApplication from './pages/services/AndroidApplication';
import IOSApplication from './pages/services/IOSApplication';
import HybridApplication from './pages/services/HybridApplication';
import WebApplication from './pages/services/WebApplication';
import WindowsApplication from './pages/services/WindowsApplication';
import DigitalMarketing from './pages/services/DigitalMarketing';
import SEO from './pages/services/SEO';
import SocialMediaMarketing from './pages/services/SocialMediaMarketing';
import ContentMarketing from './pages/services/ContentMarketing';
import EmailMarketing from './pages/services/EmailMarketing';
import FiveG from './pages/services/FiveG';
import Networking from './pages/services/Networking';
import Blockchain from './pages/services/Blockchain';
import BIAnalytics from './pages/services/BIAnalytics';
import VRARSolutions from './pages/services/VRARSolutions';
import RecruitmentProcessOutsourcing from './pages/services/RecruitmentProcessOutsourcing';
import StaffAugmentation from './pages/services/StaffAugmentation';
import TalentManagement from './pages/services/TalentManagement';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/career" element={<Career />} />
          <Route path="/job-details/:id" element={<JobDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog-details/:title" element={<BlogDetails />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />

          {/* Services - Development */}
          <Route path="/services/android-application" element={<AndroidApplication />} />
          <Route path="/services/ios-application" element={<IOSApplication />} />
          <Route path="/services/hybrid-application" element={<HybridApplication />} />
          <Route path="/services/web-application" element={<WebApplication />} />
          <Route path="/services/windows-application" element={<WindowsApplication />} />

          {/* Services - Digital Marketing */}
          <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/services/seo" element={<SEO />} />
          <Route path="/services/social-media-marketing" element={<SocialMediaMarketing />} />
          <Route path="/services/content-marketing" element={<ContentMarketing />} />
          <Route path="/services/email-marketing" element={<EmailMarketing />} />

          {/* Services - IT Consulting */}
          <Route path="/services/recruitment-process-outsourcing" element={<RecruitmentProcessOutsourcing />} />
          <Route path="/services/staff-augmentation" element={<StaffAugmentation />} />
          <Route path="/services/talent-management" element={<TalentManagement />} />

          {/* Services - Other */}
          <Route path="/services/5g" element={<FiveG />} />
          <Route path="/services/networking" element={<Networking />} />
          <Route path="/services/blockchain" element={<Blockchain />} />
          <Route path="/services/bi-analytics" element={<BIAnalytics />} />
          <Route path="/services/vr-ar-solutions" element={<VRARSolutions />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;