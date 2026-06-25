import { useNavigate, useLocation } from 'react-router-dom';
import { addExpense, updateExpense } from '../utils/storage';
import ExpenseForm from '../components/ExpenseForm';

export default function AddExpense() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingExpense = location.state?.expense || null;

  const handleSave = (expense) => {
    if (editingExpense) {
      updateExpense(expense);
    } else {
      addExpense(expense);
    }
    // Redirect back to expenses list after save
    navigate('/expenses');
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="page-container">
      <header className="header" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
        <h1 style={{ fontSize: '2rem' }}>{editingExpense ? 'Edit Expense' : 'New Expense'}</h1>
      </header>
      
      <ExpenseForm 
        onSave={handleSave} 
        initialData={editingExpense} 
        onCancel={handleCancel} 
      />
    </div>
  );
}
