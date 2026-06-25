import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import AddExpense from './pages/AddExpense';
import './index.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="nav-container flex justify-between items-center">
          <div className="nav-brand">ExpenseTracker</div>
          <div className="nav-links flex gap-4">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>
              Dashboard
            </NavLink>
            <NavLink to="/expenses" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Expenses
            </NavLink>
            <NavLink to="/add" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Add Expense
            </NavLink>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>
      
      <main className="container" style={{ paddingTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/add" element={<AddExpense />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

