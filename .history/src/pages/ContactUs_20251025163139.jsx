// src/pages/ContactUs.jsx
import { useState } from 'react';
import PageTitle from '../components/common/PageTitle';
import '../assets/css/pages/contact.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const breadcrumbs = [{ label: 'Contact Us' }];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In real implementation:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <PageTitle title="Contact Us" breadcrumbItems={breadcrumbs} />

      <section className="contact-section section-padding">
        <div className="container">
          {/* Introduction */}
          <div className="mb-5 text-center contact-intro">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Have a question or want to work together? We'd love to hear from you.
              Fill out the form below or reach out through our contact information.
            </p>
          </div>

          <div className="row">
            {/* Contact Information */}
            <div className="mb-4 col-lg-4">
              <div className="contact-info-wrapper">
                {/* Address Card */}
                <div className="contact-info-card">
                  <div className="info-icon">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div className="info-content">
                    <h4>Visit Us</h4>
                    <p>123 Business Street<br />
                    Tech Park, Floor 5<br />
                    Bangalore, Karnataka 560001<br />
                    India</p>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="contact-info-card">
                  <div className="info-icon">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <div className="info-content">
                    <h4>Call Us</h4>
                    <p>
                      <a href="tel:+911234567890">+91 123 456 7890</a><br />
                      <a href="tel:+911234567891">+91 123 456 7891</a>
                    </p>
                    <span className="small-text">Mon - Fri: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>

                {/* Email Card */}
                <div className="contact-info-card">
                  <div className="info-icon">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div className="info-content">
                    <h4>Email Us</h4>
                    <p>
                      <a href="mailto:info@zureetelecom.com">info@zureetelecom.com</a><br />
                      <a href="mailto:support@zureetelecom.com">support@zureetelecom.com</a>
                    </p>
                  </div>
                </div>

                {/* Social Media Card */}
                <div className="contact-info-card">
                  <div className="info-icon">
                    <i className="bi bi-share"></i>
                  </div>
                  <div className="info-content">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="contact-form-wrapper">
                <h3 className="form-title">Send Us a Message</h3>
                <p className="form-subtitle">Fill out the form below and we'll get back to you as soon as possible.</p>

                {success && (
                  <div className="alert alert-success" role="alert">
                    <i className="bi bi-check-circle me-2"></i>
                    <strong>Success!</strong> Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="mb-4 col-md-6">
                      <label htmlFor="name" className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="mb-4 col-md-6">
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="mb-4 col-md-6">
                      <label htmlFor="phone" className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 1234567890"
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>

                    <div className="mb-4 col-md-6">
                      <label htmlFor="subject" className="form-label">Subject *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                      />
                      {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </div>

                    <div className="mb-4 col-12">
                      <label htmlFor="message" className="form-label">Message *</label>
                      <textarea
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your project or inquiry..."
                      ></textarea>
                      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-2"></i>
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-5 map-section">
            <h3 className="mb-4 text-center">Find Us on Map</h3>
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8534470618!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>

          {/* Office Hours */}
          <div className="mt-5 office-hours-section">
            <div className="row">
              <div className="col-lg-12">
                <div className="office-hours-card">
                  <h3 className="mb-4 text-center">Office Hours</h3>
                  <div className="row">
                    <div className="mb-3 col-md-4">
                      <div className="hours-item">
                        <strong>Monday - Friday:</strong>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                    <div className="mb-3 col-md-4">
                      <div className="hours-item">
                        <strong>Saturday:</strong>
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                    </div>
                    <div className="mb-3 col-md-4">
                      <div className="hours-item">
                        <strong>Sunday:</strong>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-5 contact-faq-section">
            <h3 className="mb-4 text-center">Frequently Asked Questions</h3>
            <div className="row">
              <div className="mb-4 col-lg-6">
                <div className="faq-item">
                  <h5>How quickly can I expect a response?</h5>
                  <p>We typically respond to all inquiries within 24 hours during business days.</p>
                </div>
              </div>
              <div className="mb-4 col-lg-6">
                <div className="faq-item">
                  <h5>Do you offer free consultations?</h5>
                  <p>Yes! We offer a free initial consultation to discuss your project requirements and how we can help.</p>
                </div>
              </div>
              <div className="mb-4 col-lg-6">
                <div className="faq-item">
                  <h5>What services do you provide?</h5>
                  <p>We offer a wide range of IT services including application development, digital marketing, IT consulting, and more.</p>
                </div>
              </div>
              <div className="mb-4 col-lg-6">
                <div className="faq-item">
                  <h5>Can I schedule a meeting at your office?</h5>
                  <p>Absolutely! Please contact us in advance to schedule an appointment at our office.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;