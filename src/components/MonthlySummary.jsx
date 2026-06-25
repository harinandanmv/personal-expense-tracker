import { useState } from 'react';

export default function MonthlySummary({ expenses }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const displayMonth = currentDate.getMonth();
  const displayYear = currentDate.getFullYear();

  const realNow = new Date();
  const isCurrentRealMonth = displayMonth === realNow.getMonth() && displayYear === realNow.getFullYear();

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    if (isCurrentRealMonth) return;
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const targetExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === displayMonth && d.getFullYear() === displayYear;
  });

  const total = targetExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

  const categoryTotals = targetExpenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + parseFloat(e.amount);
    return acc;
  }, {});

  // Sort categories by amount descending
  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const displayMonthName = monthNames[displayMonth];

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2>Monthly Summary</h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrevMonth}
            className="btn"
            style={{ padding: '0.5rem', borderRadius: '50%', background: 'var(--hover-bg)', color: 'var(--text-secondary)' }}
            title="Previous Month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <span style={{ fontWeight: '600', fontSize: '1.125rem', minWidth: '130px', textAlign: 'center' }}>
            {displayMonthName} {displayYear}
          </span>
          
          <button 
            onClick={handleNextMonth}
            className="btn"
            style={{ 
              padding: '0.5rem', 
              borderRadius: '50%', 
              background: isCurrentRealMonth ? 'transparent' : 'var(--hover-bg)', 
              color: isCurrentRealMonth ? 'var(--border-color)' : 'var(--text-secondary)',
              cursor: isCurrentRealMonth ? 'not-allowed' : 'pointer'
            }}
            title="Next Month"
            disabled={isCurrentRealMonth}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="summary-grid">
        <div className="card summary-card" style={{ marginBottom: 0 }}>
          <h3>Total Spent</h3>
          <div className="amount">₹{total.toFixed(2)}</div>
        </div>
      </div>

      {sortedCategories.length > 0 ? (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
            Breakdown by Category
          </h3>
          <div className="flex-col gap-4" style={{ gap: '1.25rem' }}>
            {sortedCategories.map(([cat, amt]) => {
              const percentage = ((amt / total) * 100).toFixed(1);
              return (
                <div key={cat}>
                  <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                    <div className="flex items-center gap-2">
                      <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{cat}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{percentage}%</span>
                    </div>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>₹{amt.toFixed(2)}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${percentage}%`, 
                      height: '100%', 
                      backgroundColor: 'var(--primary-color)',
                      borderRadius: '4px',
                      transition: 'width 1s ease-out'
                    }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>
          No expenses recorded for {displayMonthName} {displayYear}.
        </div>
      )}
    </div>
  );
}
