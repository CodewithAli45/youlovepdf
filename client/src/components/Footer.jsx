import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="modern-footer">

      <div className="footer-content">
        <div className="footer-brand">
          <h4>PDF Orbit</h4>
          <p style={{ fontSize: '0.9rem' }}>Revolutionizing how you interact with PDF documents. Secure, fast, and intuitive.</p>
        </div>
        
        <div className="footer-links">
          <h5>Tools</h5>
          <ul>
            <li><a href="#">Merge PDF</a></li>
            <li><a href="#">Split PDF</a></li>
            <li><a href="#">Compress PDF</a></li>
            <li><a href="#">Convert to PDF</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h5>Company</h5>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Contact Support</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PDF Orbit. Built with precision for the modern web.</p>
      </div>
    </footer>
  );
};

export default Footer;
