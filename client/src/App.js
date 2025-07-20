import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardHeader from './pages/SideHeader';
import TransactionForm from './components/TransactionForm';
import Auth from './pages/Auth';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';
import ReceiptScanPage from './pages/ReceiptScanPage';
import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardHeader />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/transactions" element={<TransactionForm />} />
        <Route path="/transactionlist" element={<TransactionList />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/upload-gemini" element={<ReceiptScanPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
