# Admin Portal - Complete Workflow Documentation

## Overview
This document explains the complete workflow for managing the Zuree Telecom website content through the admin portal.

## Access Points
- **Main Site**: http://localhost:5173/
- **Admin Portal**: http://localhost:5173/admin-login

## Admin Portal Features

### 1. **Blogs Management** (`/admin/blogs`)
**Purpose**: Create, edit, and delete blog posts that appear on the main website

**Workflow**:
1. Navigate to Admin Portal → Blogs
2. Click "Add Blog" to create a new blog post
3. Fill in the form:
   - Title (required)
   - Author (required)
   - Category
   - Content (required)
   - Excerpt
   - Featured Image URL
   - Tags
   - Status (draft/published)
   - Published Date
4. Click "Create" to save
5. Blog will appear on main site at `/blogs` if status is "published"

**Edit/Delete**:
- Click "Edit" button to modify existing blog
- Click "Delete" button to remove blog (confirmation required)
- Changes reflect immediately on the main website

**API Endpoints**:
- GET `/api/admin/blogs` - List all blogs
- POST `/api/admin/blogs` - Create new blog
- PUT `/api/admin/blogs/:id` - Update blog
- DELETE `/api/admin/blogs/:id` - Delete blog
- PATCH `/api/admin/blogs/:id/status` - Update status

---

### 2. **Services Management** (`/admin/services`)
**Purpose**: Manage service offerings displayed on the main website

**Workflow**:
1. Navigate to Admin Portal → Services
2. Click "Add Service" to create a new service
3. Fill in the form:
   - Title (required)
   - Category (Mobile/Web/Marketing/Telecom/Other)
   - Short Description (required)
   - Full Description
   - Icon (FontAwesome class, e.g., "fas fa-mobile-alt")
   - Image URL
   - Features (JSON or text)
   - Status (active/inactive)
4. Click "Create" to save
5. Service will appear on main site at `/services` if status is "active"

**Edit/Delete**:
- Click "Edit" to modify service details
- Click "Delete" to remove service
- Only "active" services are visible on the main website

**API Endpoints**:
- GET `/api/admin/services` - List all services
- POST `/api/admin/services` - Create new service
- PUT `/api/admin/services/:id` - Update service
- DELETE `/api/admin/services/:id` - Delete service
- PATCH `/api/admin/services/:id/status` - Update status

---

### 3. **Team Members Management** (`/admin/team-members`)
**Purpose**: Manage team member profiles displayed on the About Us page

**Workflow**:
1. Navigate to Admin Portal → Team Members
2. Click "Add Member" to add a new team member
3. Fill in the form:
   - Name (required)
   - Position (required)
   - Department
   - Email
   - Phone
   - Bio
   - Image URL
   - LinkedIn URL
   - Twitter URL
   - Status (active/inactive)
4. Click "Create" to save
5. Team member will appear on main site if status is "active"

**Edit/Delete**:
- Click "Edit" to modify member details
- Click "Delete" to remove member
- Only "active" members are visible on the main website

**API Endpoints**:
- GET `/api/admin/team` - List all team members
- POST `/api/admin/team` - Create new team member
- PUT `/api/admin/team/:id` - Update team member
- DELETE `/api/admin/team/:id` - Delete team member
- PATCH `/api/admin/team/:id/status` - Update status

---

### 4. **Jobs Management** (`/admin/jobs`)
**Purpose**: Post and manage job openings on the career page

**Workflow**:
1. Navigate to Admin Portal → Jobs
2. Click "Add Job" to create a new job posting
3. Fill in the form:
   - Title (required)
   - Department
   - Location (required)
   - Type (Full-time/Part-time/Contract)
   - Experience Level
   - Description
   - Requirements
   - Responsibilities
   - Qualifications
   - Salary Range
   - Posted Date
   - Closing Date
   - Status (active/inactive/closed)
   - Number of Openings
4. Click "Create" to save
5. Job will appear on main site at `/career` if status is "active"

**Edit/Delete**:
- Click "Edit" to modify job details
- Click "Delete" to remove job posting
- View application count for each job
- Only "active" jobs are visible on the main website

**API Endpoints**:
- GET `/api/admin/jobs` - List all jobs
- POST `/api/admin/jobs` - Create new job
- PUT `/api/admin/jobs/:id` - Update job
- DELETE `/api/admin/jobs/:id` - Delete job
- PATCH `/api/admin/jobs/:id/status` - Update status
- GET `/api/admin/jobs/:id/applications` - Get applications for specific job

---

### 5. **Applications Management** (`/admin/applications`)
**Purpose**: View and manage job applications submitted through the main website

**Workflow**:
1. Navigate to Admin Portal → Applications
2. View all applications submitted through the career page
3. Filter by status: All/Pending/Reviewed/Shortlisted/Rejected/Hired
4. Click on any application to view details:
   - Applicant name
   - Email
   - Phone
   - Position applied for
   - Cover letter
   - Resume (downloadable)
   - Application date
5. Update application status using the dropdown
6. Delete applications if needed

**Status Flow**:
- **Pending**: New application (default)
- **Reviewed**: Application has been reviewed
- **Shortlisted**: Candidate selected for interview
- **Rejected**: Application declined
- **Hired**: Candidate hired

**API Endpoints**:
- GET `/api/admin/applications` - List all applications
- GET `/api/admin/applications/:id` - Get single application
- PATCH `/api/admin/applications/:id/status` - Update application status
- DELETE `/api/admin/applications/:id` - Delete application
- GET `/api/admin/applications/stats` - Get statistics

---

### 6. **Contact Messages** (`/admin/contacts`)
**Purpose**: View and manage contact form submissions from the main website

**Workflow**:
1. Navigate to Admin Portal → Contact Messages
2. View all messages submitted through the contact form
3. Filter by status: All/New/Read/Replied/Archived
4. Click on any message to view details:
   - Sender name
   - Email
   - Phone
   - Subject
   - Message content
   - Submission date
5. Update message status
6. Click "Reply via Email" to respond directly
7. Delete messages if needed

**Status Flow**:
- **New**: Unread message (default)
- **Read**: Message has been viewed
- **Replied**: Response sent to sender
- **Archived**: Message archived for record keeping

**API Endpoints**:
- GET `/api/admin/contacts` - List all contact messages
- GET `/api/admin/contacts/:id` - Get single message
- PATCH `/api/admin/contacts/:id/status` - Update message status
- DELETE `/api/admin/contacts/:id` - Delete message
- GET `/api/admin/contacts/stats` - Get statistics

---

## Main Website Integration

### How Content Appears on Main Site

1. **Blogs** (`/blogs`)
   - Only blogs with status "published" are visible
   - Displayed in reverse chronological order
   - Individual blog pages at `/blog-details/:title`

2. **Services** (`/services`)
   - Only services with status "active" are visible
   - Grouped by category
   - Individual service pages available

3. **Team Members** (`/about-us`)
   - Only team members with status "active" are visible
   - Displayed on the About Us page
   - Organized by department

4. **Jobs** (`/career`)
   - Only jobs with status "active" are visible
   - Job details page at `/job-details/:id`
   - Application form available for each job

5. **Contact Form** (`/contact-us`)
   - Users submit contact messages
   - Messages appear in admin portal immediately
   - Status defaults to "new"

---

## Application Submission Flow

### From User Perspective:
1. User visits `/career` on main website
2. Browses available job openings
3. Clicks on a job to view details
4. Fills out application form:
   - Name
   - Email
   - Phone
   - Cover Letter
   - Resume Upload
5. Submits application

### From Admin Perspective:
1. Application appears in `/admin/applications`
2. Status is "pending" by default
3. Admin reviews application details
4. Admin updates status as needed:
   - Mark as "reviewed" after initial review
   - Mark as "shortlisted" for interview
   - Mark as "rejected" if not suitable
   - Mark as "hired" when candidate is selected
5. Admin can download resume
6. Admin can delete application if needed

---

## Contact Message Flow

### From User Perspective:
1. User visits `/contact-us` on main website
2. Fills out contact form:
   - Name
   - Email
   - Phone (optional)
   - Subject (optional)
   - Message
3. Submits form

### From Admin Perspective:
1. Message appears in `/admin/contacts`
2. Status is "new" by default
3. Admin clicks to view message details
4. Status automatically changes to "read"
5. Admin can:
   - Reply via email (opens default email client)
   - Mark as "replied" after responding
   - Archive message for record keeping
   - Delete message if spam or irrelevant

---

## Authentication & Security

### Admin Login
- Access admin portal at `/admin-login`
- Enter admin credentials
- JWT token stored in localStorage
- Token sent with all API requests
- Automatic logout on token expiration

### Protected Routes
All admin routes require authentication:
- Blogs, Services, Team Members, Jobs: Accessible by admin, super_admin, editor
- Users: Accessible only by admin role
- All routes verify JWT token on backend

---

## Database Tables

### Content Tables:
- `blogs` - Blog posts
- `services` - Service offerings
- `team_members` - Team member profiles
- `jobs` - Job postings

### Submission Tables:
- `job_applications` - Job applications from users
- `contact_messages` - Contact form submissions

### Admin Tables:
- `admin_users` - Admin user accounts
- `admin_activity_log` - Activity tracking

---

## Best Practices

### Content Management:
1. **Always preview before publishing**
   - Use "draft" status for blogs while editing
   - Use "inactive" status for services/team members while preparing

2. **Keep content updated**
   - Remove outdated job postings
   - Archive old contact messages
   - Update team member information regularly

3. **Maintain consistency**
   - Use consistent formatting for blog posts
   - Follow naming conventions for services
   - Keep team member bios similar in length

### Application Management:
1. **Respond promptly**
   - Review applications within 48 hours
   - Update status to keep candidates informed
   - Download resumes for offline review

2. **Keep records**
   - Don't delete applications immediately
   - Use "rejected" status instead of deleting
   - Archive old applications periodically

### Contact Message Management:
1. **Prioritize responses**
   - Check "new" messages daily
   - Respond to urgent inquiries first
   - Mark as "replied" after responding

2. **Organize messages**
   - Use "archived" for completed conversations
   - Delete only spam or test messages
   - Keep important messages for reference

---

## Troubleshooting

### Common Issues:

1. **Content not appearing on main site**
   - Check status (must be "published" or "active")
   - Verify all required fields are filled
   - Refresh the main website page

2. **Applications not showing**
   - Ensure backend server is running
   - Check browser console for errors
   - Verify authentication token is valid

3. **Cannot update status**
   - Ensure you're logged in as admin
   - Check network connection
   - Verify backend API is accessible

---

## API Server Information

### Backend Server:
- **URL**: http://localhost:5000
- **Technology**: Node.js + Express
- **Database**: MySQL

### Frontend Server:
- **URL**: http://localhost:5173
- **Technology**: React + Vite

### Starting Servers:
```bash
# Start backend (in zuree_telecom_api folder)
npm run dev

# Start frontend (in zuree-react folder)
npm run dev
```

---

## Summary

The admin portal provides complete control over the main website content:
- **Create** new content (blogs, services, team members, jobs)
- **Edit** existing content
- **Delete** outdated content
- **View** user submissions (applications, contact messages)
- **Manage** submission status and workflow

All changes made in the admin portal reflect immediately on the main website, providing a seamless content management experience.
