import React from 'react';
import { Link } from 'react-router-dom';
import BudgetLogo from './Images/budget buddy logo.png';
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Logo and Description */}
        <div className="footer-section footer-brand">
          <img src={BudgetLogo} alt="Budget Buddy Logo" className="footer-logo" />
          <h3>Budget Buddy</h3>
          <p>Your trusted companion to master personal finance with ease and confidence.</p>
          
          {/* Social Links */}
          <div className="social-links">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FiLinkedin />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FiGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h4>Resources</h4>
          <ul className="footer-links">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <p>
              <FiMail className="contact-icon" />
              <span>support@budgetbuddy.app</span>
            </p>
            <p>
              <FiPhone className="contact-icon" />
              <span>+91 98765 43210</span>
            </p>
            <p>
              <FiMapPin className="contact-icon" />
              <span>Chandigarh, India</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 Budget Buddy. All Rights Reserved.</p>
          <p>Made with ❤️ for better financial futures</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
