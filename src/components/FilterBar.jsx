const CATEGORIES = ['All', 'Food', 'Transport', 'Utilities', 'Housing', 'Entertainment', 'Health', 'Shopping', 'Education', 'Personal Care', 'Gifts', 'Investments', 'Travel', 'Other'];

export default function FilterBar({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>Filters</h3>
      <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Search by Title</label>
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={handleChange}
            placeholder="Search expenses..."
            className="form-input"
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Category</label>
          <select
            name="category"
            value={filters.category}
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

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>

      </div>
    </div>
  );
}
