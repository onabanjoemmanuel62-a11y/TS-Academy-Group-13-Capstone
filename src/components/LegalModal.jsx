import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './LegalModal.css';

const PRIVACY_POLICY = {
  title: 'Privacy Policy',
  lastUpdated: 'May 2026',
  sections: [
    { heading: 'Overview', body: 'This Privacy Policy explains how the Novara Group 13 Planetary Data Explorer handles information when you visit or interact with it. This application was built as a capstone project by graduating students of Novara Software Development at TS Academy, Lagos, Nigeria.' },
    { heading: '1. Information We Collect', body: 'The Application primarily displays publicly available planetary data from our solar system. When you use the contact form, you voluntarily provide personal information including your full name, email address, phone number, and city of residence. This information is collected solely for the purpose of responding to your enquiry.' },
    { heading: '2. How We Use Your Information', body: 'Any information submitted through the contact form is used only to respond to your message. We do not use your personal information for marketing purposes, we do not sell it to third parties, and we do not share it with any organisation outside of the Novara Group 13 project team.' },
    { heading: '3. Data Storage', body: 'This is an educational capstone project. Submitted form data is processed through a designated endpoint and is not stored in any permanent database accessible to the public. As this project is not a commercial product, formal data retention policies do not apply.' },
    { heading: '4. Cookies', body: 'This Application does not use cookies or any tracking technologies. We do not track your behaviour across other websites or platforms.' },
    { heading: '5. Third Party Services', body: 'Planetary data displayed in this application is fetched from a publicly available JSON source. We do not control this third party source and are not responsible for its content or availability.' },
    { heading: '6. Your Rights', body: 'Under the Nigeria Data Protection Act (NDPA) 2023, you have the right to access, correct, or request deletion of any personal information you have submitted through this Application. To exercise these rights, please use the contact form on this page.' },
    { heading: '7. Contact', body: 'If you have any questions about this Privacy Policy, please reach out to the Novara Group 13 team through the contact form on this page.' },
  ]
};

const TERMS_AND_CONDITIONS = {
  title: 'Terms & Conditions',
  lastUpdated: 'May 2026',
  sections: [
    { heading: 'Overview', body: 'These Terms and Conditions govern your use of the Novara Group 13 Planetary Data Explorer. By accessing or using this Application, you agree to be bound by these terms. This Application was developed as a capstone project by graduating students of Novara Software Development at TS Academy, Lagos, Nigeria.' },
    { heading: '1. Nature of the Application', body: 'The Planetary Data Explorer is an educational project built to demonstrate software development skills acquired during the Novara programme at TS Academy. It is not a commercial product or service.' },
    { heading: '2. Accuracy of Information', body: 'While we have made every effort to ensure the planetary data displayed is accurate, this Application is built for educational and demonstration purposes. We make no warranties regarding the completeness or accuracy of any data displayed.' },
    { heading: '3. Intellectual Property', body: 'The code, design, and content of this Application were created by the members of Novara Group 13 as part of their studies at TS Academy. All rights to the original work belong to Ts-Academy and the respective student contributors.' },
    { heading: '4. Acceptable Use', body: 'You agree to use this Application only for lawful purposes. You must not attempt to reverse engineer, modify, copy, distribute, or commercially exploit any part of this Application without express written permission.' },
    { heading: '5. Limitation of Liability', body: 'As an educational capstone project, this Application is provided as is without any warranty of any kind. The Novara Group 13 team and TS Academy shall not be liable for any damages arising from your use of this Application.' },
    { heading: '6. Governing Law', body: 'These Terms and Conditions are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from the use of this Application shall be subject to the jurisdiction of Nigerian courts.' },
    { heading: '7. Contact', body: 'For any questions regarding these Terms and Conditions, please contact the Novara Group 13 team through the contact form on this page.' },
  ]
};

const LegalModal = ({ type, onClose }) => {
  const doc = type === 'privacy' ? PRIVACY_POLICY : TERMS_AND_CONDITIONS;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
   window.addEventListener('keydown', handleKey);
return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="legal-backdrop"
      onClick={onClose}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClose(); }}
    >
      <div
        className="legal-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="legal-modal__header">
          <div>
            <h2 className="legal-modal__title">{doc.title}</h2>
            <p className="legal-modal__updated">Last updated: {doc.lastUpdated}</p>
          </div>
          <button className="legal-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="legal-modal__body">
          {doc.sections.map((section) => (
            <div key={section.heading} className="legal-modal__section">
              <h3 className="legal-modal__section-title">{section.heading}</h3>
              <p className="legal-modal__section-body">{section.body}</p>
            </div>
          ))}
        </div>
        <div className="legal-modal__footer">
          <button className="legal-modal__accept-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

LegalModal.propTypes = {
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LegalModal;