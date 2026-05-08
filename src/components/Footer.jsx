import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="group-members">
        <h4>About</h4>
        <p>
          Miracle, Emmanuel, Olalekan, Olatomiwa, Edikan, Chidera, Temitope
        </p>
      </div>
      <hr className="footer-hr"/>
      <div className="footer-container">
        <div>
          <p>©2026 Novara Software Development Capstone Project Group-13</p>
          <a href="https://github.com/onabanjoemmanuel62-a11y/TS-Academy-Group-13-Capstone" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link">
            Built by Novara Software Development Capstone project group - 13. All rights reserved
          </a>
        </div>
        <div>
          <a href="https://tsacademyonline.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link">
            TS Academy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;