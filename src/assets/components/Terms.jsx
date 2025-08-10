import React from "react";
import './Terms.css';

const Terms = () => {
  return (
    <>
    <div className="terms-container">
      <div className="terms-wrap">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toISOString().slice(0,10)}</p>

      <h2>Acceptance of Terms</h2>
      <p>
        By using Budget Buddy, you agree to these Terms. If you do not agree,
        discontinue use.
      </p>

      <h2>Use of the Service</h2>
      <ul>
        <li>Use the app for lawful, personal finance management purposes only.</li>
        <li>Do not attempt to disrupt the app or access data that is not yours.</li>
      </ul>

      <h2>Content and Ownership</h2>
      <ul>
        <li>You retain ownership of data you enter into the app.</li>
        <li>We own the app’s software, design, and trademarks.</li>
      </ul>

      <h2>Disclaimer</h2>
      <p>
        The app is provided “as is” without warranties of any kind. We do not
        provide financial, legal, or tax advice. Use outcomes at your own risk.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for any
        indirect, incidental, or consequential damages arising from use of the app.
      </p>

      <h2>Changes to the Service</h2>
      <p>
        Features may change or be discontinued. We may update these Terms; continued
        use indicates acceptance.
      </p>

      <h2>Termination</h2>
      <p>
        We may suspend or terminate access for violations of these Terms or harmful activity.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms are governed by applicable laws of your jurisdiction. Disputes
        shall be resolved in the courts of the applicable jurisdiction.
      </p>

      <h2>Contact</h2>
      <p>Email: legal@example.com</p>
    </div>

    </div>
    </>
  );
};

export default Terms;
