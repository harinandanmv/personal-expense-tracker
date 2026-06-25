import { useState, useEffect } from 'react';
import { getExpenses } from '../utils/storage';
import MonthlySummary from '../components/MonthlySummary';

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  return (
    <div className="page-container">
      <header className="header">
        <h1>Dashboard</h1>
        <p>Overview of your spending</p>
      </header>
      <MonthlySummary expenses={expenses} />
    </div>
  );
}
