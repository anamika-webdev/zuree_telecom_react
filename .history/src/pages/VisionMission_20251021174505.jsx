// FILE: src/pages/VisionMission.jsx
// ============================================
import PageTitle from '../../components/common/PageTitle';

const VisionMission = () => {
  const breadcrumbs = [{ label: 'Vision & Mission' }];

  return (
    <div className="vision-mission-page">
      <PageTitle title="Vision & Mission" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5">
              <div className="vision-box p-5 bg-light rounded">
                <h2 className="mb-4">Our Vision</h2>
                <p>
                  To be the leading provider of innovative technology solutions that
                  empower businesses to thrive in the digital age.
                </p>
              </div>
            </div>

            <div className="col-lg-6 mb-5">
              <div className="mission-box p-5 bg-light rounded">
                <h2 className="mb-4">Our Mission</h2>
                <p>
                  To deliver exceptional technology solutions that drive business growth
                  and digital transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionMission;