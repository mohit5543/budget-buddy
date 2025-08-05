import React, { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUsers,
  FaUser,
  FaFilter,
} from "react-icons/fa";
// Add Chart.js required imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import "./Dashboard.css";

const STORAGE_KEY = "bb_dashboard";
const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Salary",
  "Entertainment",
  "Others",
];

// ---- Initial Data Structure ----
const initialData = {
  users: [{ id: 1, name: "You", email: "" }],
  currentUser: 1,
  transactions: [],
  budgets: {}, // key: `${userId}-${cat}`, value: limit
};

const Dashboard = () => {
  // -------- STATE
  const [data, setData] = useState(() => {
    try {
      const d = localStorage.getItem(STORAGE_KEY);
      return d ? JSON.parse(d) : initialData;
    } catch {
      return initialData;
    }
  });

  const [txnForm, setTxnForm] = useState({
    id: null,
    type: "expense",
    amount: "",
    category: DEFAULT_CATEGORIES[0],
    date: new Date().toISOString().slice(0, 10),
    description: "",
    userId: data.currentUser,
  });

  const [userForm, setUserForm] = useState({ name: "", email: "" });
  const [showUserForm, setShowUserForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [alertCategories, setAlertCategories] = useState([]);
  const [filter, setFilter] = useState({
    type: "all",
    category: "all",
    dateFrom: "",
    dateTo: "",
  });

  // -------- EFFECTS: LocalStorage + Current User Change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    setTxnForm((f) => ({ ...f, userId: data.currentUser }));
  }, [data.currentUser]);

  // --------- Derived Data
  const users = data.users;
  const userTxns = data.transactions.filter(
    (t) => t.userId === data.currentUser
  );

  const filteredTxns = useMemo(() => {
    return userTxns.filter((txn) => {
      if (filter.type !== "all" && txn.type !== filter.type) return false;
      if (filter.category !== "all" && txn.category !== filter.category)
        return false;
      if (filter.dateFrom && txn.date < filter.dateFrom) return false;
      if (filter.dateTo && txn.date > filter.dateTo) return false;
      return true;
    });
  }, [userTxns, filter]);

  const totalIncome = userTxns
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = userTxns
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  // --------- BUDGET ALERT
  useEffect(() => {
    // Alert categories where spending > budget
    const spentByCat = {};
    userTxns.forEach((t) => {
      if (t.type === "expense")
        spentByCat[t.category] = (spentByCat[t.category] || 0) + t.amount;
    });
    const over = [];
    Object.entries(data.budgets).forEach(([key, limit]) => {
      const [uid, cat] = key.split("-");
      if (Number(uid) === data.currentUser && limit && spentByCat[cat] > limit)
        over.push(cat);
    });
    setAlertCategories(over);
  }, [data.budgets, data.currentUser, userTxns]);

  // --------- CHART DATA
  const chartData = useMemo(() => {
    const catSum = {};
    userTxns.forEach((t) => {
      if (t.type === "expense")
        catSum[t.category] = (catSum[t.category] || 0) + t.amount;
    });
    return {
      labels: Object.keys(catSum),
      datasets: [
        {
          label: "Expenses",
          data: Object.values(catSum),
          backgroundColor: "rgba(192,157,62,0.7)",
        },
      ],
    };
  }, [userTxns]);

  // -------- HANDLERS
  const handleTxnForm = (e) =>
    setTxnForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submitTxn = (e) => {
    e.preventDefault();
    if (!txnForm.amount || isNaN(txnForm.amount) || Number(txnForm.amount) <= 0)
      return alert("Enter a valid amount.");
    if (!txnForm.type || !txnForm.category) return alert("Pick valid details!");
    if (!txnForm.date) return alert("Select a date.");
    // Edit or create
    if (editMode) {
      setData((d) => ({
        ...d,
        transactions: d.transactions.map((txn) =>
          txn.id === txnForm.id
            ? {
                ...txnForm,
                amount: Number(txnForm.amount),
                userId: data.currentUser,
              }
            : txn
        ),
      }));
      setEditMode(false);
    } else {
      setData((d) => ({
        ...d,
        transactions: [
          ...d.transactions,
          {
            ...txnForm,
            amount: Number(txnForm.amount),
            userId: data.currentUser,
            id: Date.now(),
          },
        ],
      }));
    }
    setTxnForm({
      id: null,
      type: "expense",
      amount: "",
      category: DEFAULT_CATEGORIES[0],
      date: new Date().toISOString().slice(0, 10),
      description: "",
      userId: data.currentUser,
    });
  };

  const editTxn = (txn) => {
    setTxnForm({ ...txn, amount: txn.amount.toString() });
    setEditMode(true);
  };

  const delTxn = (id) => {
    if (window.confirm("Delete this transaction?"))
      setData((d) => ({
        ...d,
        transactions: d.transactions.filter((txn) => txn.id !== id),
      }));
  };

  // Add user
  const submitUser = (e) => {
    e.preventDefault();
    if (!userForm.name.trim()) return alert("Enter a name!");
    setData((d) => ({
      ...d,
      users: [
        ...d.users,
        {
          id: Date.now(),
          name: userForm.name.trim(),
          email: userForm.email.trim(),
        },
      ],
    }));
    setUserForm({ name: "", email: "" });
    setShowUserForm(false);
  };

  const switchUser = (id) => setData((d) => ({ ...d, currentUser: id }));

  const delUser = (id) => {
    if (users.length < 2) return alert("At least one user must remain.");
    if (window.confirm("Delete this user and ALL their transactions?")) {
      setData((d) => ({
        ...d,
        users: d.users.filter((u) => u.id !== id),
        transactions: d.transactions.filter((t) => t.userId !== id),
        currentUser: d.users.find((u) => u.id !== id)?.id || 1,
      }));
    }
  };

  // Budget per user/category
  const handleBudgetChange = (cat, val) => {
    setData((d) => ({
      ...d,
      budgets: {
        ...d.budgets,
        [`${data.currentUser}-${cat}`]: val ? Number(val) : undefined,
      },
    }));
  };

  // ---- Get per-person/cat budget
  const getBudget = (cat) => data.budgets[`${data.currentUser}-${cat}`] || "";

  // ---- RENDER
  return (
    <div className="dashboard">
      {/* User Management */}
      <div className="dash-users">
        <h3>
          <FaUsers /> Switch / Manage Profiles
        </h3>
        <select
          value={data.currentUser}
          onChange={(e) => switchUser(Number(e.target.value))}
        >
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} {u.email && `(${u.email})`}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowUserForm((f) => !f)}
          className="add-user-btn"
        >
          <FaPlus /> Add Person
        </button>
        <div className="user-cards">
          {users.map((u) => (
            <div
              key={u.id}
              className={`ucard${data.currentUser === u.id ? " current" : ""}`}
            >
              <span>
                <FaUser /> {u.name}
              </span>
              <small>{u.email}</small>
              {users.length > 1 && (
                <button onClick={() => delUser(u.id)} title="Delete user">
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>
        {showUserForm && (
          <form onSubmit={submitUser} className="user-form">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userForm.name}
              onChange={(e) =>
                setUserForm((f) => ({ ...f, name: e.target.value }))
              }
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email (optional)"
              value={userForm.email}
              onChange={(e) =>
                setUserForm((f) => ({ ...f, email: e.target.value }))
              }
            />
            <button type="submit">Add User</button>
            <button type="button" onClick={() => setShowUserForm(false)}>
              Cancel
            </button>
          </form>
        )}
      </div>

      {/* Summary */}
      <div className="dash-sumgrid">
        <div className="sum-card income">
          <h4>Income</h4>
          <div>₹{totalIncome.toFixed(2)}</div>
        </div>
        <div className="sum-card expense">
          <h4>Expenses</h4>
          <div>₹{totalExpense.toFixed(2)}</div>
        </div>
        <div className={`sum-card balance ${balance >= 0 ? "good" : "bad"}`}>
          <h4>Balance</h4>
          <div>₹{balance.toFixed(2)}</div>
        </div>
      </div>

      {/* Budget/Alerts */}
      <div className="dash-budget">
        <h3>Budgets</h3>
        {alertCategories.length > 0 && (
          <div className="alert-banner">
            ⚠ Exceeded limit in: <strong>{alertCategories.join(", ")}</strong>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Spent</th>
              <th>Budget</th>
            </tr>
          </thead>
          <tbody>
            {DEFAULT_CATEGORIES.map((cat) => {
              const spent = userTxns
                .filter((t) => t.category === cat && t.type === "expense")
                .reduce((s, t) => s + t.amount, 0);
              return (
                <tr
                  key={cat}
                  className={alertCategories.includes(cat) ? "alert" : ""}
                >
                  <td>{cat}</td>
                  <td>₹{spent.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={getBudget(cat)}
                      onChange={(e) => handleBudgetChange(cat, e.target.value)}
                      placeholder="No limit"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="dash-charts">
        <h3>Spending by Category</h3>
        {chartData.datasets[0].data.length > 0 ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        ) : (
          <p>No expense data to display</p>
        )}
      </div>

      {/* Trans Form and Filter */}
      <form className="dash-form" onSubmit={submitTxn}>
        <h3>{editMode ? "Edit" : "Add"} Transaction</h3>
        <select name="type" value={txnForm.type} onChange={handleTxnForm}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          name="amount"
          type="number"
          min="0"
          placeholder="Amount (₹)"
          value={txnForm.amount}
          onChange={handleTxnForm}
          required
        />
        <select
          name="category"
          value={txnForm.category}
          onChange={handleTxnForm}
        >
          {DEFAULT_CATEGORIES.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <input
          name="date"
          type="date"
          value={txnForm.date}
          onChange={handleTxnForm}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={txnForm.description}
          onChange={handleTxnForm}
        />
        <button type="submit">{editMode ? "Update" : "Add"}</button>
        {editMode && (
          <button
            type="button"
            onClick={() => {
              setEditMode(false);
              setTxnForm({
                id: null,
                type: "expense",
                amount: "",
                category: DEFAULT_CATEGORIES[0],
                date: new Date().toISOString().slice(0, 10),
                description: "",
                userId: data.currentUser,
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Filter Controls */}
      <div className="dash-filters">
        <h4>
          <FaFilter /> Filter
        </h4>
        <select
          value={filter.type}
          onChange={(e) => setFilter((f) => ({ ...f, type: e.target.value }))}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={filter.category}
          onChange={(e) =>
            setFilter((f) => ({ ...f, category: e.target.value }))
          }
        >
          <option value="all">All</option>
          {DEFAULT_CATEGORIES.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          value={filter.dateFrom}
          onChange={(e) =>
            setFilter((f) => ({ ...f, dateFrom: e.target.value }))
          }
        />
        <input
          type="date"
          value={filter.dateTo}
          onChange={(e) => setFilter((f) => ({ ...f, dateTo: e.target.value }))}
        />
      </div>

      {/* Transaction List */}
      <div className="dash-txns">
        <h3>Transactions</h3>
        {filteredTxns.length === 0 ? (
          <div className="note">No transactions found.</div>
        ) : (
          <table className="txn-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTxns.map((txn) => (
                <tr key={txn.id} className={txn.type}>
                  <td>{txn.date}</td>
                  <td>{txn.type}</td>
                  <td>{txn.category}</td>
                  <td>{txn.description || "-"}</td>
                  <td>₹{txn.amount.toFixed(2)}</td>
                  <td>
                    <button onClick={() => editTxn(txn)} title="Edit">
                      <FaEdit />
                    </button>
                    <button onClick={() => delTxn(txn.id)} title="Delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
