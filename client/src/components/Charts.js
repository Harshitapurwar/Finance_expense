
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts';
import '../css/charts.css';
import { useNavigate } from 'react-router-dom';

function Charts() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const res = await API.get('/transactions', {
        params: { startDate, endDate }
      });
      setData(res.data);
    } catch (err) {
      console.error('Error loading transactions:', err);
    }
  };

  useEffect(() => {
    fetchTransactions(); // Initial load
  }, []);

  const categoryData = {};
  const dateData = {};

  data.forEach(tx => {
    if (tx.type === 'expense') {
      categoryData[tx.category] = (categoryData[tx.category] || 0) + Number(tx.amount);
      const dateStr = new Date(tx.date).toLocaleDateString();
      dateData[dateStr] = (dateData[dateStr] || 0) + Number(tx.amount);
    }
  });

  const categoryChart = Object.entries(categoryData).map(([category, total]) => ({
    name: category,
    value: total,
  }));

  const dateChart = Object.entries(dateData).map(([date, total]) => ({
    date,
    amount: total,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#b267f1', '#f1626d'];

  return (
    <div className="charts-container">
       <button
      className="dashboard-btn"
      onClick={() => navigate('/')}
    >
      🏠 Dashboard
    </button>
      <div className="chart-filter">
        <div className="top-actions">
         <button onClick={() => navigate('/transactionList')} className="top-btn">
          🧾 Transaction List
        </button>

          <button onClick={() => navigate('/transactions')} className="top-btn">
            ➕ Add Transaction
          </button>
        </div>
        <label>From: <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></label>
        <label>To: <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></label>
        <button onClick={fetchTransactions}>Generate Charts</button>
      </div>

      <div className="chart-box">
        <h3>Expense by Category</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={categoryChart} dataKey="value" nameKey="name" outerRadius={100} label>
              {categoryChart.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
  <h3>Expense by Date</h3>
  {/* <div className="chart-scroll-wrapper"> */}
  {Array.isArray(dateChart) && dateChart.length > 0 ? (
  <ResponsiveContainer width="100%" height={200}>
    <BarChart data={dateChart}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="amount" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
) : (
  <p style={{ color: 'white' }}>No data available to display charts.</p>
)}

  </div>
</div>

    // </div>
  );
}

export default Charts;
