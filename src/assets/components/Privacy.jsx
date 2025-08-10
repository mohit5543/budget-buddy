import React from "react";
import './Privacy.css';
const Privacy = () => {
  return (
    <>
    <div className="privacy-container">
      <div className="page-wrap" >
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toISOString().slice(0,10)}</p>

      <h2>Overview</h2>
      <p>
        Budget Buddy is a personal finance tool that stores data in the browser
        using localStorage. No server-side storage is used by default. Users can
        add transactions, budgets, and profiles on their device.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>App data entered by the user (transactions, budgets, profiles).</li>
        <li>Device-stored preferences (theme, filters) in localStorage.</li>
        <li>No account signup is required; no PII is collected unless provided in user profiles.</li>
      </ul>

      <h2>How We Use Information</h2>
      <ul>
        <li>To provide budgeting features and analytics locally on the device.</li>
        <li>To remember preferences such as selected user and filters.</li>
      </ul>

      <h2>Third Parties</h2>
      <p>
        By default, the app does not send data to third parties. If optional
        services (e.g., analytics, AI suggestions APIs) are enabled in the
        future, details will be disclosed here and within in‑app settings.
      </p>

      <h2>Data Storage and Security</h2>
      <ul>
        <li>Data is stored locally in the browser’s localStorage.</li>
        <li>Clearing browser data or using a different device will affect availability.</li>
        <li>For sensitive use, consider device security (screen lock, user accounts).</li>
      </ul>

      <h2>Your Choices</h2>
      <ul>
        <li>Export data (CSV) and keep personal backups.</li>
        <li>Delete data by clearing app storage in the browser.</li>
      </ul>

      <h2>Children’s Privacy</h2>
      <p>
        The app is not directed to children under 13. Do not add children’s
        personal information to the app.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy as features evolve. Continued use indicates acceptance
        of the updated policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email: contact@example.com
      </p>
    </div>
    </div>
    </>
  );
};

export default Privacy;
