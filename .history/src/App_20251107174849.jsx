// src/App.jsx - UPDATED WITH REGISTER ROUTE
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './hooks/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './pages/AdminLogin';

// Public Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Career from './pages/Career';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Register from './pages/Register'; // <-- IMPORTED
import JobDetails from './pages/JobDetails';
import ScrollToTop from './components/ScrollToTop';

// Import User Dashboard
import UserDashboard from './pages/UserDashboard';

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

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminBlogs from './pages/admin/Blogs';
import AdminBlogForm from './pages/admin/BlogForm';
import AdminJobs from './pages/admin/Jobs';
import AdminApplications from './pages/admin/Applications';
import AdminContacts from './pages/admin/Contacts';
import AdminUsers from './pages/admin/Users';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/career" element={<Layout><Career /></Layout>} />
          <Route path="/job-details/:id" element={<Layout><JobDetails /></Layout>} />
          <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
          <Route path="/blog-details/:title" element={<Layout><BlogDetails /></Layout>} />
          <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} />

          {/* Auth Routes */}
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} /> {/* <-- NEW ROUTE */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Services Routes */}
          <Route path="/services/android-application" element={<Layout><AndroidApplication /></Layout>} />
          <Route path="/services/ios-application" element={<Layout><IOSApplication /></Layout>} />
          <Route path="/services/hybrid-application" element={<Layout><HybridApplication /></Layout>} />
          <Route path="/services/web-application" element={<Layout><WebApplication /></Layout>} />
          <Route path="/services/windows-application" element={<Layout><WindowsApplication /></Layout>} />
          <Route path="/services/digital-marketing" element={<Layout><DigitalMarketing /></Layout>} />
          <Route path="/services/seo" element={<Layout><SEO /></Layout>} />
          <Route path="/services/social-media-marketing" element={<Layout><SocialMediaMarketing /></Layout>} />
          <Route path="/services/content-marketing" element={<Layout><ContentMarketing /></Layout>} />
          <Route path="/services/email-marketing" element={<Layout><EmailMarketing /></Layout>} />
          <Route path="/services/recruitment-process-outsourcing" element={<Layout><RecruitmentProcessOutsourcing /></Layout>} />
          <Route path="/services/staff-augmentation" element={<Layout><StaffAugmentation /></Layout>} />
          <Route path="/services/talent-management" element={<Layout><TalentManagement /></Layout>} />
          <Route path="/services/5g" element={<Layout><FiveG /></Layout>} />
          <Route path="/services/networking" element={<Layout><Networking /></Layout>} />
          <Route path="/services/blockchain" element={<Layout><Blockchain /></Layout>} />
          <Route path="/services/bi-analytics" element={<Layout><BIAnalytics /></Layout>} />
          <Route path="/services/vr-ar-solutions" element={<Layout><VRARSolutions /></Layout>} />

          {/* User Dashboard Route (Protected) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute> {/* Checks for any authenticated user */}
                <Layout><UserDashboard /></Layout>
              </PrivateRoute>
            }
          />

          {/* Admin Routes - Protected */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRoles={['admin', 'super_admin', 'editor']}>
                <AdminLayout><AdminDashboard /></AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <PrivateRoute allowedRoles={['admin', 'editor']}>
                <AdminLayout><AdminBlogs /></AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/blogs/create"
            element={
              <PrivateRoute allowedRoles={['admin', 'editor']}>
                <AdminLayout><AdminBlogForm /></AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/blogs/edit/:id"
            element={
              <PrivateRoute allowedRoles={['admin', 'editor']}>
                <AdminLayout><AdminBlogForm /></AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <PrivateRoute allowedRoles={['admin', 'editor']}>
                <AdminLayout><AdminJobs /></AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <PrivateRoute allowedRoles={['admin', 'editor']}>
                <AdminLayout><AdminApplications /></AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/contacts"
            element={
              <PrivateRoute allowedRoles={['admin', 'editor']}>
                <AdminLayout><AdminContacts /></AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminLayout><AdminUsers /></AdminLayout>
              </PrivateRoute>
            }
          />

          <Route path="/admin/dashboard" element={
  <PrivateRoute allowedRoles={['admin', 'super_admin', 'editor']}>
    <AdminLayout><AdminDashboard /></AdminLayout>
  </PrivateRoute>
} />

<Route path="/admin/blogs" element={
  <PrivateRoute allowedRoles={['admin', 'editor']}>
    <AdminLayout><AdminBlogs /></AdminLayout>
  </PrivateRoute>
} />

<Route path="/admin/jobs" element={
  <PrivateRoute allowedRoles={['admin', 'editor']}>
    <AdminLayout><AdminJobs /></AdminLayout>
  </PrivateRoute>
} />

<Route path="/admin/applications" element={
  <PrivateRoute allowedRoles={['admin', 'editor']}>
    <AdminLayout><AdminApplications /></AdminLayout>
  </PrivateRoute>
} />

<Route path="/admin/contacts" element={
  <PrivateRoute allowedRoles={['admin', 'editor']}>
    <AdminLayout><AdminContacts /></AdminLayout>
  </PrivateRoute>
} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;