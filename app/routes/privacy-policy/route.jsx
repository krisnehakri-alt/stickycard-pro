import React from "react";
import { Link } from "react-router";

export const meta = () => {
  return [
    { title: "Privacy Policy | Stickycard Pro" },
    { name: "description", content: "Privacy Policy for Stickycard Pro Shopify App." },
  ];
};

export default function PrivacyPolicy() {
  return (
    <div className="policy-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        body, html {
          margin: 0;
          padding: 0;
          background-color: #08080c;
          font-family: 'Inter', sans-serif;
          color: white;
          overflow-x: hidden;
        }

        .policy-container {
          min-height: 100vh;
          background: radial-gradient(circle at 70% 30%, rgba(100, 30, 200, 0.15) 0%, rgba(0, 0, 0, 0) 50%), #08080c;
          display: flex;
          flex-direction: column;
          padding: 40px 8%;
          box-sizing: border-box;
        }

        /* Navbar */
        .navbar {
          display: flex;
          align-items: center;
          margin-bottom: 60px;
          text-decoration: none;
        }
        
        .logo-icon {
          background: linear-gradient(135deg, #4f2d91 0%, #d51786 100%);
          border-radius: 6px;
          padding: 6px 10px;
          font-weight: 800;
          font-size: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
          transform: skew(-8deg);
          color: white;
        }
        .logo-icon-text {
          transform: skew(8deg);
        }
        .logo-text {
          margin-left: 16px;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1;
          color: white;
        }
        .logo-text span {
          color: #d51786;
        }
        .logo-pro {
          display: block;
          font-size: 10px;
          letter-spacing: 6px;
          color: #d51786;
          text-transform: uppercase;
          margin-top: 4px;
          text-align: center;
        }

        /* Content */
        .content-section {
          max-width: 800px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 40px 60px;
        }

        @media (max-width: 768px) {
          .content-section {
            padding: 30px 20px;
          }
        }

        .content-section h1 {
          font-size: 42px;
          line-height: 1.2;
          font-weight: 800;
          margin-bottom: 12px;
          background: linear-gradient(90deg, #9b4dff 0%, #ff3399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .last-updated {
          color: #a0a0b0;
          font-size: 14px;
          margin-bottom: 40px;
          display: block;
        }

        .content-section h2 {
          font-size: 24px;
          font-weight: 600;
          margin-top: 40px;
          margin-bottom: 16px;
          color: #fff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 8px;
        }

        .content-section p, .content-section li {
          font-size: 16px;
          line-height: 1.6;
          color: #a0a0b0;
          margin-bottom: 16px;
        }

        .content-section ul {
          padding-left: 20px;
          margin-bottom: 24px;
        }

        .content-section li {
          margin-bottom: 8px;
        }

        .content-section a {
          color: #d51786;
          text-decoration: none;
        }
        
        .content-section a:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* Navbar */}
      <Link to="/" className="navbar">
        <div className="logo-icon">
          <div className="logo-icon-text">%<span style={{fontWeight: 400}}>=</span></div>
        </div>
        <div className="logo-text">
          sticky<span>card</span>
          <span className="logo-pro">— PRO —</span>
        </div>
      </Link>

      {/* Content */}
      <div className="content-section">
        <h1>Privacy Policy</h1>
        <span className="last-updated">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>

        <h2>Introduction</h2>
        <p>
          Welcome to Stickycard Pro ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you install and use our Shopify application, Stickycard Pro.
        </p>

        <h2>Information We Collect</h2>
        <p>
          When you install and use Stickycard Pro, we may collect the following types of information:
        </p>
        <ul>
          <li><strong>Store Information:</strong> Your store name, domain, email address, and general store settings.</li>
          <li><strong>App Usage Data:</strong> Interactions with our app, configurations, created templates, and performance metrics.</li>
          <li><strong>Customer Information:</strong> We do not directly collect your end-customers' personally identifiable information (PII). Any interactions with our widgets are processed securely to provide functionality without storing sensitive shopper data on our servers.</li>
        </ul>

        <h2>How We Use Information</h2>
        <p>
          We use the collected information for various purposes, including:
        </p>
        <ul>
          <li>Providing, operating, and maintaining our app functionality.</li>
          <li>Improving, personalizing, and expanding our app features.</li>
          <li>Understanding and analyzing how you use our app.</li>
          <li>Providing customer support and responding to inquiries.</li>
          <li>Processing billing and subscription plans through Shopify.</li>
        </ul>

        <h2>Shopify Store Data</h2>
        <p>
          Our app integrates directly with your Shopify store. We request only the minimum necessary permissions required for the app to function properly, such as reading products or theme files to display the sticky cards. We strictly adhere to Shopify's API Terms of Service and data protection requirements.
        </p>

        <h2>Cookies & Tracking Technologies</h2>
        <p>
          We may use cookies and similar tracking technologies within the app interface to enhance your user experience, remember your preferences, and maintain active sessions. We do not use intrusive tracking mechanisms on your storefront.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our app, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information. We use industry-standard encryption protocols and secure database architectures to protect against unauthorized access, alteration, disclosure, or destruction of your data.
        </p>

        <h2>Data Retention</h2>
        <p>
          We will retain your store and app usage information only for as long as is necessary for the purposes set out in this Privacy Policy, or as long as you have the app installed. When you uninstall the app, we will securely delete or anonymize your data in accordance with Shopify's data deletion requirements.
        </p>

        <h2>Merchant Rights</h2>
        <p>
          As a merchant, you have the right to access, update, or delete the information we have on you. If you wish to exercise these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Our app is intended for use by Shopify merchants and is not directed at children under the age of 13. We do not knowingly collect personal information from children.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2>Contact Information</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
        </p>
        <p>
          <strong>App Name:</strong> Stickycard Pro<br />
          <strong>Website:</strong> <a href="https://stickycard-pro.sabaiinnovations.com" target="_blank" rel="noopener noreferrer">https://stickycard-pro.sabaiinnovations.com</a>
        </p>
      </div>
    </div>
  );
}
