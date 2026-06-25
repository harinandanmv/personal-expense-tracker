const STORAGE_KEY = 'expenses_data';

export const getExpenses = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveExpenses = (expenses) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const addExpense = (expense) => {
  const expenses = getExpenses();
  const newExpense = { ...expense, id: Date.now().toString() };
  expenses.push(newExpense);
  saveExpenses(expenses);
  return newExpense;
};

export const updateExpense = (updatedExpense) => {
  const expenses = getExpenses();
  const index = expenses.findIndex((e) => e.id === updatedExpense.id);
  if (index !== -1) {
    expenses[index] = updatedExpense;
    saveExpenses(expenses);
  }
};

export const deleteExpense = (id) => {
  const expenses = getExpenses();
  const filtered = expenses.filter((e) => e.id !== id);
  saveExpenses(filtered);
};
