// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Career from './pages/Career';
import JobDetails from './pages/JobDetails';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import ScrollToTop from './components/ScrollToTop';

// Import Admin components
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminBlogs from './pages/admin/Blogs';
import AdminBlogForm from './pages/admin/BlogForm';
import AdminJobs from './pages/admin/Jobs';
import AdminApplications from './pages/admin/Applications';
import AdminContacts from './pages/admin/Contacts';
import AdminUsers from './pages/admin/Users';
import PrivateRoute from './components/PrivateRoute';

// Import the new UserDashboard
import UserDashboard from './pages/UserDashboard';

// Import service pages
import WebApplication from './pages/services/WebApplication';
import AndroidApplication from './pagesG/services/AndroidApplication';
import IOSApplication from './pages/services/IOSApplication';
import HybridApplication from './pages/services/HybridApplication';
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
import StaffAugmentation from './pages/services/StaffAugmentation';
import RecruitmentProcessOutsourcing from './pages/services/RecruitmentProcessOutsourcing';
import TalentManagement from './pages/services/TalentManagement';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Main User Site Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="services" element={<Services />} />
          <Route path="career" element={<Career />} />
          <Route path="job/:jobId" element={<JobDetails />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog/:blogId" element={<BlogDetails />} />
          <Route path="contact" element={<ContactUs />} />
          
          {/* Service Pages */}
          <Route path="services/web-application" element={<WebApplication />} />
          <Route path="services/android-application" element={<AndroidApplication />} />
          <Route path="services/ios-application" element={<IOSApplication />} />
          <Route path="services/hybrid-application" element={<HybridApplication />} />
          <Route path="services/windows-application" element={<WindowsApplication />} />
          <Route path="services/digital-marketing" element={<DigitalMarketing />} />
          <Route path="services/seo" element={<SEO />} />
          <Route path="services/social-media-marketing" element={<SocialMediaMarketing />} />
          <Route path="services/content-marketing" element={<ContentMarketing />} />
          <Route path="services/email-marketing" element={<EmailMarketing />} />
          <Route path="services/5g" element={<FiveG />} />
          <Route path="services/networking" element={<Networking />} />
          <Route path="services/blockchain" element={<Blockchain />} />
          <Route path="services/bi-analytics" element={<BIAnalytics />} />
          <Route path="services/vrar-solutions" element={<VRARSolutions />} />
          <Route path="services/staff-augmentation" element={<StaffAugmentation />} />
          <Route path="services/rpo" element={<RecruitmentProcessOutsourcing />} />
          <Route path="services/talent-management" element={<TalentManagement />} />
        </Route>

        {/* User Auth (No main layout) */}
        <Route path="/login" element={<Login />} />
        
        {/* NEW: User Dashboard Route (Protected) */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Layout><UserDashboard /></Layout>} />
        </Route>

        {/* Admin Auth (No main layout) */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin Panel Routes (Protected) */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="blogs/new" element={<AdminBlogForm />} />
          <Route path="blogs/edit/:id" element={<AdminBlogForm />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;