import React from 'react';
import './Footer.css'; // Import the CSS file for styling


const Footer = () => {
return (
<footer className="main-footer">
<div className="group-members">
<h4>About</h4>
{/*First names of group members here*/}
<p>
    Miracle, Emmanuel, Olalekan, Olatomiwa, Edikan, Chidera, Temitope
</p>
</div>

<hr className="footer-hr"/>

<div className="footer-container">
    
<div>
    
<p>©2026 Design by Novara Software Development Capstone Project Group -13</p>
{/*Link to the GitHub repository of the project*/}
<a href="https://github.com/onabanjoemmanuel62-a11y/TS-Academy-Group-13-Capstone" target="_blank" rel="noopener noreferrer" className="footer-link"> Built by Novara Software Development Capstone project group - 13. All rights reserved</a>

</div>

<div>
<a href="https://tsacademyonline.com/" target="_blank" rel="noopener noreferrer" className="footer-link">TSAcademy</a>
</div>
</div>
</footer>
);
};

export default Footer;