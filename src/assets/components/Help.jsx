import React, { useState, useMemo } from "react";
import './Help.css';

const articles = [
  {
    id: "getting-started",
    title: "Getting Started",
    body: `
1) Open Dashboard.
2) Add your first transaction (type, amount, category, date).
3) Set budgets per category in the Budgets section.
4) Switch profiles in the user section to manage multiple people.
    `,
    tags: ["start", "basics", "dashboard"]
  },
  {
    id: "budgets",
    title: "Set and Manage Budgets",
    body: `
- Go to Budgets table.
- Enter a monthly cap per category.
- Over-budget categories show an alert banner and row highlight.
- Adjust caps anytime; changes are saved locally.
    `,
    tags: ["budget", "alerts"]
  },
  {
    id: "filters",
    title: "Filtering Transactions",
    body: `
- Use the Filter panel to filter by type, category, and date range.
- Filters apply to the transaction list and summaries.
    `,
    tags: ["filters", "search"]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    body: `
- Chart not loading: ensure at least one expense exists.
- Dates not matching: use YYYY-MM-DD format.
- Back button issues: check routing; avoid replaceState loops.
- Reset app: clear localStorage key 'bb_dashboard' (this deletes data).
    `,
    tags: ["troubleshoot", "chart", "dates", "storage"]
  },
  {
    id: "data",
    title: "Data & Privacy",
    body: `
- Data is stored locally in your browser.
- Export/backup (coming soon) lets you download CSV.
- Delete data by clearing browser storage.
    `,
    tags: ["privacy", "storage", "data"]
  },
];

const Help = () => {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.toLowerCase().trim();
    if (!term) return articles;
    return articles.filter(a =>
      a.title.toLowerCase().includes(term) ||
      a.body.toLowerCase().includes(term) ||
      a.tags.some(t => t.includes(term))
    );
  }, [q]);

  return (
    <>
    <div className="help-container">
      <div className="help-wrap">
      <h1>Help Center</h1>
      <input
        className="help-search"
        placeholder="Search help..."
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      {filtered.length === 0 ? (
        <div className="help-no-results">No results.</div>
      ) : (
        filtered.map(a => (
          <div key={a.id} className="help-article">
            <h3>{a.title}</h3>
            <pre>{a.body.trim()}</pre>
          </div>
        ))
      )}

      <div className="help-contact">
        <h2>Need more help?</h2>
        <p>Contact: support@budgetbuddy.app</p>
      </div>
    </div>
    </div>
    </>
  );
};

export default Help;
