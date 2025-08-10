import React, { useState } from 'react';
import './Contact.css';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    // 👉  Replace with real endpoint, EmailJS, etc.
    alert('Thank you for reaching out! We will reply shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
    <div className="contact-container">
    <section className="contact-wrapper">
      <h2 className="contact-heading">Get in Touch</h2>
      <p className="contact-sub">
        Have questions, feedback, or partnership ideas? We’re happy to hear from you!
      </p>

      {/* Info cards */}
      <div className="contact-info-grid">
        <div className="info-card">
          <FiMail className="info-icon" />
          <h3>E-mail</h3>
          <p>support@budgetbuddy.app</p>
        </div>

        <div className="info-card">
          <FiPhone className="info-icon" />
          <h3>Phone</h3>
          <p>+91 98765 43210</p>
        </div>

        <div className="info-card">
          <FiMapPin className="info-icon" />
          <h3>Location</h3>
          <p>Chandigarh, India</p>
        </div>
      </div>

      {/* Contact form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <h3 className="form-title">Send Us a Message</h3>

        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your e-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="How can we help you?"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send</button>
      </form>
    </section>
    </div>
    </>
  );
};

export default Contact;
