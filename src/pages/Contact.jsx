import { useState } from 'react';
import { Link } from 'react-router-dom';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

export default function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.name && formData.email && formData.subject && formData.message) {
      setFeedback({
        type: 'success',
        text: `Thank you, ${formData.name}! Your message has been received. We'll get back to you within 24 hours.`
      });
      setFormData(initialForm);
    } else {
      setFeedback({ type: 'error', text: 'Please fill in all fields.' });
    }
  };

  return (
    <main>
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Get in Touch</h1>
          <p>Have questions? We're here to help you on your learning journey</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Address</h4>
                <p>
                  123 Education Street
                  <br />
                  Learning City, LC 12345
                </p>
              </div>
            </div>

            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h4>Phone</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>support@ssieducational.com</p>
              </div>
            </div>

            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <div>
                <h4>Support Hours</h4>
                <p>
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Weekend: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>

            <div className="faq-section">
              <h3>Quick Help</h3>
              <div className="faq-links">
                <Link to="/faq">
                  <i className="fas fa-question-circle"></i> Frequently Asked Questions
                </Link>
                <Link to="/help">
                  <i className="fas fa-book"></i> Help Center
                </Link>
                <Link to="/chat">
                  <i className="fas fa-comments"></i> Live Chat Support
                </Link>
                <Link to="/tutorials">
                  <i className="fas fa-video"></i> Video Tutorials
                </Link>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            {feedback.text ? (
              <div
                className={`alert ${
                  feedback.type === 'success' ? 'alert-success' : 'alert-error'
                }`}
              >
                {feedback.text}
              </div>
            ) : null}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="">Select a topic</option>
                  <option value="course_inquiry">Course Inquiry</option>
                  <option value="technical_support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  required
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">
                <i className="fas fa-paper-plane"></i>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
