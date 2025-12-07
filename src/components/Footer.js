import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about" className="footer-link">About</a>
          <span className="footer-separator">•</span>
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
          <span className="footer-separator">•</span>
          <a href="mailto:support@goaltracker.app" className="footer-link">Contact</a>
          <span className="footer-separator">•</span>
          <a href="https://support.google.com/adsense/answer/1348695" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="footer-link">
            Ad Choices
          </a>
        </div>
        <div className="footer-info">
          <p className="footer-coppa">
            👶 This site is child-directed and uses non-personalized ads only
          </p>
          <p className="footer-copyright">
            © 2025 Goal Tracker. Made with ❤️ for achieving goals.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
