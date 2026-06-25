import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="card empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h3>No expenses found</h3>
        <p>Looks like you haven't added any expenses matching these criteria. Add some to get started!</p>
      </div>
    );
  }

  // Group expenses by Month Year
  const grouped = [];
  expenses.forEach(expense => {
    const d = new Date(expense.date);
    const monthYear = d.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
    
    let group = grouped.find(g => g.monthYear === monthYear);
    if (!group) {
      group = { monthYear, items: [] };
      grouped.push(group);
    }
    group.items.push(expense);
  });

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {grouped.map((group) => (
        <div key={group.monthYear}>
          <div style={{ 
            padding: '1rem 1.25rem 0.5rem', 
            backgroundColor: 'var(--hover-bg)', 
            color: 'var(--text-secondary)', 
            fontSize: '0.75rem', 
            fontWeight: '600', 
            letterSpacing: '0.05em', 
            textTransform: 'uppercase',
            borderBottom: '1px solid var(--border-color)'
          }}>
            {group.monthYear}
          </div>
          {group.items.map(expense => (
            <ExpenseItem 
              key={expense.id} 
              expense={expense} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      ))}
    </div>
  );
}
