import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExpenses, deleteExpense } from '../utils/storage';
import ExpenseList from '../components/ExpenseList';
import FilterBar from '../components/FilterBar';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [expenseToDelete, setExpenseToDelete] = useState(null); // stores ID of expense to delete
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    title: '',
    category: 'All',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  const handleDeleteRequest = (id) => {
    setExpenseToDelete(id);
  };

  const confirmDelete = () => {
    if (expenseToDelete) {
      deleteExpense(expenseToDelete);
      setExpenses(getExpenses());
      setExpenseToDelete(null);
    }
  };

  const cancelDelete = () => {
    setExpenseToDelete(null);
  };

  const handleEdit = (expense) => {
    navigate('/add', { state: { expense } });
  };

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((expense) => {
        if (filters.title && !expense.title.toLowerCase().includes(filters.title.toLowerCase())) return false;
        if (filters.category !== 'All' && expense.category !== filters.category) return false;
        if (filters.startDate && expense.date < filters.startDate) return false;
        if (filters.endDate && expense.date > filters.endDate) return false;
        return true;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses, filters]);

  return (
    <>
      <div className="page-container">
        <header className="header" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <h1 style={{ fontSize: '2rem' }}>All Expenses</h1>
        </header>

        <FilterBar filters={filters} setFilters={setFilters} />
        
        <ExpenseList 
          expenses={filteredExpenses} 
          onEdit={handleEdit} 
          onDelete={handleDeleteRequest} 
        />
      </div>

      {/* Custom Confirmation Modal */}
      {expenseToDelete && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Delete Expense
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Are you sure you want to permanently delete this expense? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                className="btn" 
                style={{ border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-secondary)' }} 
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button 
                className="btn btn-solid-danger" 
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
