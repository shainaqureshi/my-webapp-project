import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: December 6, 2025</p>

        <section>
          <h2>Introduction</h2>
          <p>
            Goal Tracker App ("we," "our," or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, and share information when you 
            use our goal tracking application.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <h3>Account Information</h3>
          <ul>
            <li><strong>Google Account Data:</strong> Name, email address, and profile photo when you sign in with Google</li>
            <li><strong>User-Generated Content:</strong> Goals you create, descriptions, categories, completion status, and privacy settings</li>
            <li><strong>Usage Data:</strong> Streaks, points earned, reactions, and interactions with other users' content</li>
          </ul>
        </section>

        <section>
          <h2>Children's Privacy (COPPA Compliance)</h2>
          <div className="coppa-notice">
            <p>🛡️ <strong>Our service may be used by children under 13 with parental consent.</strong></p>
          </div>
          <p>We:</p>
          <ul>
            <li>Do NOT collect personal information beyond what's necessary for the service</li>
            <li>Use only non-personalized, family-safe ads for all users</li>
            <li>Do NOT share children's data with third parties except as required for service operation</li>
            <li>Allow parents to review and delete their child's information upon request</li>
          </ul>
          <h3>Parental Rights</h3>
          <p>Parents can email us to:</p>
          <ul>
            <li>Review their child's information</li>
            <li>Request deletion of their child's account</li>
            <li>Refuse further collection of their child's data</li>
          </ul>
        </section>

        <section>
          <h2>Advertising</h2>
          <h3>Google AdSense</h3>
          <p>We display advertisements using Google AdSense. Google may collect:</p>
          <ul>
            <li>Cookie data and device identifiers</li>
            <li>IP address and location data</li>
            <li>Browsing behavior for ad personalization</li>
          </ul>
          <div className="ad-notice">
            <p>
              <strong>For ALL users:</strong> We use non-personalized ads only and comply with COPPA regulations.
            </p>
          </div>
          <p>
            You can opt out of personalized advertising at:{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ad Settings
            </a>
          </p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <h3>Google Firebase</h3>
          <p>We use Google Firebase for:</p>
          <ul>
            <li>Authentication (Google Sign-In)</li>
            <li>Database storage (Firestore)</li>
            <li>Hosting services</li>
          </ul>
          <p>
            Firebase's privacy policy:{' '}
            <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">
              firebase.google.com/support/privacy
            </a>
          </p>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>We implement security measures to protect your information:</p>
          <ul>
            <li>Firebase Authentication for secure sign-in</li>
            <li>Firestore security rules to protect user data</li>
            <li>HTTPS encryption for all data transmission</li>
          </ul>
          <p>However, no method of transmission over the internet is 100% secure.</p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>You have rights to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>For privacy concerns or questions:</p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:support@goaltracker.app">support@goaltracker.app</a>
          </p>
        </section>

        <div className="policy-footer">
          <p>
            Your use of Goal Tracker App constitutes acceptance of this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
