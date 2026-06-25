import { useState, useEffect } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Utilities', 'Housing', 'Entertainment', 'Health', 'Shopping', 'Education', 'Personal Care', 'Gifts', 'Investments', 'Travel', 'Other'];

export default function ExpenseForm({ onSave, initialData = null, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: CATEGORIES[0],
    date: new Date().toISOString().split('T')[0],
    note: ''
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setErrors({});
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 50) {
      newErrors.title = 'Title must be less than 50 characters';
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else if (parseFloat(formData.amount) > 10000000) {
      newErrors.amount = 'Amount cannot exceed ₹10,000,000';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({ ...formData, amount: parseFloat(formData.amount) });
    
    if (!initialData) {
      setFormData({
        title: '',
        amount: '',
        category: CATEGORIES[0],
        date: new Date().toISOString().split('T')[0],
        note: ''
      });
      setErrors({});
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '1rem' }}>{initialData ? 'Edit Expense' : 'Add New Expense'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? 'error-border' : ''}`}
              style={errors.title ? { borderColor: 'var(--danger-color)' } : {}}
            />
            {errors.title && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.title}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Amount (₹) *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`form-input ${errors.amount ? 'error-border' : ''}`}
              min="0"
              step="0.01"
              style={errors.amount ? { borderColor: 'var(--danger-color)' } : {}}
            />
            {errors.amount && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.amount}</span>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`form-input ${errors.date ? 'error-border' : ''}`}
              style={errors.date ? { borderColor: 'var(--danger-color)' } : {}}
            />
            {errors.date && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.date}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Note</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="form-input"
            rows="2"
          />
        </div>

        <div className="flex items-center gap-2" style={{ marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Update Expense' : 'Add Expense'}
          </button>
          {initialData && (
            <button type="button" onClick={onCancel} className="btn" style={{ border: '1px solid var(--border-color)' }}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
