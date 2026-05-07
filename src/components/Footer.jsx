import React from 'react';


const Footer = () => {
return (
<footer style={{
backgroundColor: '#0a192f', 
color: 'white',
padding: '40px 20px',
fontFamily: 'sans-serif',
fontWeight: 'bold',
}}>
<div style={{ maxWidth: '100%', margin: '0' }}>

<div style={{ textAlign: 'left', marginBottom: '20px' }}>
<h4 style={{ marginBottom: '10px' }}>About</h4>

    {/*First names of group members here*/}
<p style={{ fontSize: '14px', }}>
    Miracle, Emmanuel, Olalekan, Olatomiwa, Edikan, Chidera, Temitope
</p>
</div>

<hr style={{ border: '0', borderTop: '1px solid #334155', margin: '20px 0'  }} />

<div style={{
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
textAlign: 'left',
fontSize: '12px',
fontWeight: 'bold'

}}>
<div>
    
<p>©2026 Design by Amaka & Ifeoma A.</p>
{/*Link to the GitHub repository of the project*/}
<a href="https://github.com/onabanjoemmanuel62-a11y/TS-Academy-Group-13-Capstone" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}> Built by Novara Software Development Capstone project group - 13. All rights reserved</a>

</div>

<div>
<strong>TSAcademy</strong>
</div>
</div>

</div>
</footer>
);
};

export default Footer;