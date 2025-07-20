import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../css/transactionForm.css';

function TransactionForm() {
  const [form, setForm] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/transactions', { ...form, source: 'manual' });
      alert('Transaction added');
    } catch (err) {
      alert('Failed to add');
    }
  };

  return (
    <div className="transaction-form-container">
       <button
      className="dashboard-btn"
      onClick={() => navigate('/')}
    >
      🏠 Dashboard
    </button>
      <form className="transaction-form" onSubmit={handleSubmit}>
        <h2>Add Transaction</h2>

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button type="submit">Add</button>

        <button
          type="button"
          className="see-all-btn"
          onClick={() => navigate('/transactionList')}
        >
          See All Expenses
        </button>
        <button
          type="button"
          className="see-all-btn"
          onClick={() => navigate('/charts')}
        >
          See Charts
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;

