// FILE: src/pages/services/ContentMarketing.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const ContentMarketing = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'Content Marketing' }];

  return (
    <div className="service-page">
      <PageTitle title="Content Marketing" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Content Marketing Services</h2>
              <p>Create valuable content that attracts and engages your target audience.</p>
              
              <h3 className="mt-4">Content Types:</h3>
              <ul>
                <li>Blog posts and articles</li>
                <li>Infographics</li>
                <li>Video content</li>
                <li>E-books and whitepapers</li>
                <li>Case studies</li>
              </ul>

              <div className="mt-5">
                <Link to="/contact-us" className="btn btn-primary">Get a Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentMarketing;