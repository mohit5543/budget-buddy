import React from "react";
import BudgetLogo from './Images/budget buddy logo.png';
import './Body.css'; 
import { Link } from 'react-router-dom';

const Body = () => {
    return (
        <>
            <section className="hero">
                <div className="hero-content">
                <h1>Your Personal <br />Finance Companion</h1>
                <p>
                    Take control of your money with Budget Buddy. Track your income & expenses,
                    set budgets, and visualize your spending—all in a secure, intuitive web app.
                </p>
                <div className="hero-btns">
                    <Link to="/dashboard" className="hero-btn">Get Started</Link>
                    <Link to="/about" className="hero-btn secondary">Learn More</Link>
                </div>
                </div>
                <div className="hero-illustration">
                <img
                    src={BudgetLogo}
                    alt="Finance Illustration"
                />
                </div>
            </section>

            <section className="features">
                <h2>Why Choose Budget Buddy?</h2>
                <div className="features-grid">
                <div className="feature-card">
                    <h3>Easy Tracking</h3>
                    <p>Add and categorize your transactions quickly.</p>
                </div>
                <div className="feature-card">
                    <h3>Visual Insights</h3>
                    <p>See your spending habits with beautiful charts.</p>
                </div>
                <div className="feature-card">
                    <h3>Secure & Private</h3>
                    <p>Your data is stored securely on your device.</p>
                </div>
                <div className="feature-card">
                    <h3>Budget Alerts</h3>
                    <p>Get notified if you overspend your budget.</p>
                </div>
                </div>
            </section>

            
        </>
    )
};

export default Body;