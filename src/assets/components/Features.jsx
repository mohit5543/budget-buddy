import React from "react";
import { FaCoins, FaChartPie, FaBell, FaLock, FaMoon, FaCloudUploadAlt, FaRobot, FaSyncAlt } from "react-icons/fa";
import "./Features.css";     // ← keep CSS separate for clarity

const core = [
  { icon: <FaCoins />, title: "Effortless Tracking", desc: "Log income & expenses in seconds with smart categories." },
  { icon: <FaChartPie />, title: "Insightful Dashboards", desc: "Beautiful charts instantly reveal spending patterns." },
  { icon: <FaBell />, title: "Smart Budget Alerts", desc: "Get nudges the moment a category nears its limit." },
  { icon: <FaLock />, title: "Privacy-First", desc: "All data stays on your device—zero cloud, total control." },
  { icon: <FaMoon />, title: "Dark-Light Themes", desc: "Switch styles with a tap for day- or night-time comfort." },
];

const soon = [
  { icon: <FaCloudUploadAlt />, title: "Cloud Sync", desc: "Secure backup & multi-device access (coming soon)." },
  { icon: <FaRobot />, title: "AI Spending Tips", desc: "Personal insights to save more every month." },
  { icon: <FaSyncAlt />, title: "Auto Bank Import", desc: "Pull transactions straight from your account." },
];

export default function Features() {
  return (
    <>
    <div className='features-container'>
      <section className="features-wrapper">
        <h2 className="features-heading">Everything You Need<br />to Master Your Money</h2>

        {/* Core feature grid */}
        <div className="feature-grid">
          {core.map(({ icon, title, desc }) => (
            <article key={title} className="feature-card">
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>

        {/* Divider */}
        <div className="feature-divider">
          <span>Upcoming Features</span>
        </div>

        {/* Future feature grid */}
        <div className="feature-grid">
          {soon.map(({ icon, title, desc }) => (
            <article key={title} className="feature-card future">
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
