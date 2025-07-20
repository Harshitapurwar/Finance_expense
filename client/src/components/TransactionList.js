
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../css/transactionList.css';
import ReceiptScanner from './GeminiUpload';
import axios from 'axios';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [edited, setEdited] = useState({});
  const [monthlyTotals, setMonthlyTotals] = useState({});
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);


  const navigate = useNavigate();

  const handleScanComplete = async (data) => {
    try {
      console.log("Scanned transaction:", data);

      const newTransaction = {
        description: data.description || data.merchantName || "Unknown",
        amount: data.amount,
        date: new Date(data.date).toISOString(),
        category: data.category || "other-expense",
      };

      const res = await API.post('/transactions', newTransaction);

      setTransactions(prev => [res.data, ...prev]);
      calculateMonthlyTotals([res.data, ...transactions]);
    } catch (err) {
      console.error("Error saving scanned transaction:", err);
      alert("Failed to save scanned transaction.");
    }
  };

  const handlePdfUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setPreviewUrl(URL.createObjectURL(file)); // 👈 Show preview
  setUploading(true);


    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://localhost:5000/api/upload-gemini", formData);

      if (response.data.amount && response.data.date) {
        await handleScanComplete(response.data);
      } else {
        alert("No valid transaction data extracted from PDF.");
      }
    } catch (err) {
      console.error("PDF Upload Failed:", err);
      alert("Failed to process PDF.");
    } finally {
      setUploading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await API.get('/transactions', {
        params: { startDate, endDate },
      });
      setTransactions(res.data);
      calculateMonthlyTotals(res.data);
    } catch (err) {
      console.error('Error fetching:', err);
    }
  };

  const calculateMonthlyTotals = (data) => {
    const grouped = {};
    data.forEach((tx) => {
      const month = new Date(tx.date).toLocaleString('default', { month: 'long', year: 'numeric' });
      grouped[month] = (grouped[month] || 0) + Number(tx.amount);
    });
    setMonthlyTotals(grouped);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch {
      alert('Delete failed');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/transactions/${id}`, edited);
      setEditingId(null);
      setEdited({});
      fetchTransactions();
    } catch {
      alert('Update failed');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="transaction-wrapper">
      <button className="dashboard-btn" onClick={() => navigate('/')}>🏠 Dashboard</button>

      <div className="transaction-container">

        <div className="transaction-filter">
          <h2>Transactions</h2>

          <label>
            From:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label>
            To:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
          <button onClick={fetchTransactions}>Filter</button>

          <div className="top-actions">
            <label className="top-btn" onClick={() => navigate('/charts')}>
  📊 See Charts
</label>

<label className="top-btn" onClick={() => navigate('/transactions')}>
  ➕ Add Transaction
</label>

            <ReceiptScanner onScanComplete={handleScanComplete} />
  {uploading && <p>Processing PDF...</p>}

  {previewUrl && (
    <div className="file-preview">
      {
        previewUrl.endsWith('.pdf') ? (
          <embed src={previewUrl} type="application/pdf" width="100%" height="300px" />
        ) : (
          <img src={previewUrl} alt="Preview" className="file-preview-image" />
        )
      }
      <button className="top-btn" onClick={() => setPreviewUrl(null)}>❌ Clear Preview</button>
    </div>
  )}
            {uploading && <p>Processing PDF...</p>}
          </div>
        </div>

        <div className="monthly-summary">
          <h3>Total Expenses</h3>
          {Object.entries(monthlyTotals).map(([month, total]) => (
            <div className="month-line" key={month}>
              <span>{month}</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="transaction-scroll-wrapper">
          <div className="transaction-list">
            {transactions.map((tx) => (
              <div className="transaction-item" key={tx._id || tx.id}>
                {editingId === tx._id ? (
                  <>
                    <input
                      type="text"
                      defaultValue={tx.description}
                      onChange={(e) => setEdited({ ...edited, description: e.target.value })}
                    />
                    <input
                      type="number"
                      defaultValue={tx.amount}
                      onChange={(e) => setEdited({ ...edited, amount: e.target.value })}
                    />
                    <input
                      type="date"
                      defaultValue={tx.date.split('T')[0]}
                      onChange={(e) => setEdited({ ...edited, date: e.target.value })}
                    />
                    <button onClick={() => handleUpdate(tx._id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{new Date(tx.date).toLocaleDateString()}</span>
                    <span>{tx.description}</span>
                    <span>₹{tx.amount}</span>
                    <button onClick={() => setEditingId(tx._id)}>Edit</button>
                    <button onClick={() => handleDelete(tx._id)}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionList;


