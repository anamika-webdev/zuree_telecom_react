// FILE: src/pages/AboutUs.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const AboutUs = () => {
  const breadcrumbs = [{ label: 'About Us' }];

  return (
    <div className="about-page">
      <PageTitle title="About Us" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center">
            
            {/* --- Updated Text Content --- */}
            <div className="col-lg-6">
              <h2 className="mb-4">Welcome to Zuree Telecom</h2>
              <p className="lead">
                Founded in 2014 by experienced telecom professionals, Zuree Telecom
                has been at the forefront of digital transformation.
              </p>
              <p>
                We specialize in providing comprehensive infrastructure analysis and
                communications solutions tailored to meet the unique needs of our clients.
              </p>
              {/* --- New Paragraph from Screenshot --- */}
              <p>
                Our team of experts is dedicated to delivering innovative and reliable
                services, ensuring seamless connectivity and optimal performance.
                We pride ourselves on our customer-centric approach, working closely
                with businesses to understand their goals and challenges. At Zuree
                Telecom, we are not just a service provider; we are your trusted
                partner in navigating the complexities of the digital landscape.
              </p>
              <Link to="/vision-mission" className="mt-3 btn btn-primary">
                Our Vision & Mission
              </Link>
            </div>

            {/* --- Updated Image Section (from Screenshot) --- */}
            <div className="mt-4 col-lg-6 mt-lg-0">
              <img 
                src="/images/image_7ff521.png" 
                alt="About Zuree Telecom" 
                className="rounded shadow img-fluid" 
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;