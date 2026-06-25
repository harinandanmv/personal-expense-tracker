export default function ExpenseItem({ expense, onEdit, onDelete }) {
  const formattedDate = new Date(expense.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="expense-item">
      <div className="expense-info">
        <div className="flex items-center gap-2">
          <span className="expense-title">{expense.title}</span>
          <span className="badge">{expense.category}</span>
        </div>
        <div className="expense-meta">
          <span>{formattedDate}</span>
          {expense.note && <span>• {expense.note}</span>}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
        <div className="flex gap-2">
          <button onClick={() => onEdit(expense)} className="btn-edit" title="Edit Expense" aria-label="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button onClick={() => onDelete(expense.id)} className="btn-danger" title="Delete Expense" aria-label="Delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
