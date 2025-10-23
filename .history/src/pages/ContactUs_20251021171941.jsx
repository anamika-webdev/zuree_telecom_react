// FILE: src/pages/ContactUs.jsx
// ============================================
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { contactService } from '../services/contactService';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const breadcrumbs = [{ label: 'Contact Us' }];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await contactService.submitContactForm(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <PageTitle title="Contact Us" breadcrumbItems={breadcrumbs} />
      
      <section className="contact-content section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact-form-box">
                <h3 className="mb-4">Send us a Message</h3>

                {success && (
                  <div className="alert alert-success" role="alert">
                    Thank you for contacting us! We will get back to you soon.
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label htmlFor="name">Your Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label htmlFor="email">Your Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="form-control"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label htmlFor="subject">Subject *</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="form-control"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 mb-4">
                      <div className="form-group">
                        <label htmlFor="message">Your Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          className="form-control"
                          rows="6"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;