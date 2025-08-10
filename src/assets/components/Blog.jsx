import React, { useState } from "react";
import './Blog.css';

// Simple in-memory posts; later load from a CMS or Markdown files
const initialPosts = [
  {
    slug: "welcome-to-budget-buddy",
    title: "Welcome to Budget Buddy",
    date: "2025-08-01",
    tags: ["announcement"],
    excerpt: "A simple, privacy-first budgeting app that runs in your browser.",
    body: `
We're excited to introduce Budget Buddy—a lightweight tool for tracking income, expenses, and per-category budgets with multi-user support on a single device. No server required.

What's inside:
- Add/edit/delete transactions
- Per-category budgets and alerts
- Multi-profile switching
- Charts and filters
    `.trim()
  },
  {
    slug: "roadmap",
    title: "Roadmap: Recurring Transactions, CSV Export, and AI Tips",
    date: "2025-08-05",
    tags: ["roadmap"],
    excerpt: "See what's planned next.",
    body: `
Upcoming:
- Recurring transactions (rent, salary, subscriptions)
- CSV export/import
- Suggestions panel with rules-based tips and optional AI summaries
    `.trim()
  },
];

const Blog = () => {
  const [active, setActive] = useState(null);
  const posts = initialPosts;

  return (
    <>
    <div className="blog-container">
      <div className="blog-wrap">
      <h1>Blog</h1>

      {posts.map(p => (
        <div key={p.slug} className="blog-post">
          <h3>{p.title}</h3>
          <div className="blog-meta">{p.date} · {p.tags.join(", ")}</div>
          <p className="blog-excerpt">{p.excerpt}</p>
          {active === p.slug ? (
            <>
              <div className="blog-body">{p.body}</div>
              <button className="blog-btn" onClick={() => setActive(null)}>Hide</button>
            </>
          ) : (
            <button className="blog-btn" onClick={() => setActive(p.slug)}>Read more</button>
          )}
        </div>
      ))}
    </div>
    </div>
    </>
  );
};

export default Blog;
