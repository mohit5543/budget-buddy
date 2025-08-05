import React, { useState, useEffect, useRef } from 'react';
import './Aboutus.css';
import BudgetLogo from './Images/budget buddy logo.png'; // Adjust path as necessary

const initialTestimonials = [
  { id: 1, text: "Budget Buddy transformed how I handle my monthly expenses. Simple, effective, and secure!", author: "Priya S." },
  { id: 2, text: "I've never felt more in control of my budget. The alerts saved me from overspending on dining out.", author: "Rahul K." },
  { id: 3, text: "A must-have for anyone serious about smart money management. Highly recommended!", author: "Anjali M." },
  { id: 4, text: "I love how easy it is to categorize and visualize my spending. Budget Buddy is a game-changer!", author: "Karan T." },
  { id: 5, text: "Clean design, great functionality, and focused on privacy. Exactly what I needed.", author: "Sneha R." },
];

const STORAGE_KEY = 'budgetBuddyTestimonials';

const AboutUsPage = () => {
  // Load testimonials from localStorage or use initial ones
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const sliderRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
  }, [testimonials]);

  // Auto-slide testimonials horizontally
  useEffect(() => {
    let scrollPos = 0;
    const slider = sliderRef.current;
    if (!slider) return;

    const step = 1;           // Scroll speed (pixels)
    const interval = 20;      // Time between scroll steps (milliseconds)
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    const scrollInterval = setInterval(() => {
      scrollPos += step;
      if (scrollPos > maxScroll) scrollPos = 0;
      slider.scrollLeft = scrollPos;
    }, interval);

    return () => clearInterval(scrollInterval);
  }, [testimonials]);

  const addTestimonial = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) {
      alert('Please enter your name and testimonial.');
      return;
    }
    setTestimonials(prev => [
      ...prev,
      { id: Date.now(), author: newAuthor.trim(), text: newText.trim() },
    ]);
    setNewAuthor('');
    setNewText('');
  };

  return (
    <div className="aboutus-page">
      {/* About Section with Logo */}
      <section className="about-section">
        <img src={BudgetLogo} alt="Budget Buddy Logo" className="about-logo" />
        <div className="about-text">
          <h2>About Budget Buddy</h2>
          <p>
            Budget Buddy is your trusted personal finance companion, empowering you to master your money.
            Effortlessly track income and expenses, set flexible budgets, and gain insight with beautiful, interactive reports – designed for real people!
          </p>
          <p>
            Our mission is to simplify personal finance for everyone with privacy-first, intuitive tools.
            Visualize your progress and build better money habits with zero hassle.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h3>What Our Users Say</h3>
        <div className="testimonial-slider" ref={sliderRef}>
          {testimonials.map(({ id, text, author }) => (
            <div key={id} className="testimonial">
              <p>"{text}"</p>
              <span>- {author}</span>
            </div>
          ))}
        </div>

        {/* Add Testimonial Form */}
        <form className="testimonial-form" onSubmit={addTestimonial}>
          <h4>Got a moment? Tell us what you think about your experience!</h4>
          <input
            type="text"
            placeholder="Your name"
            value={newAuthor}
            onChange={e => setNewAuthor(e.target.value)}
            className="testimonial-input"
            aria-label="Your name"
          />
          <textarea
            placeholder="Your testimonial"
            value={newText}
            onChange={e => setNewText(e.target.value)}
            className="testimonial-textarea"
            aria-label="Your testimonial"
          />
          <button type="submit" className="testimonial-submit">Submit</button>
        </form>
      </section>

      
    </div>
  );
};

export default AboutUsPage;
