import React, { useState } from 'react';
import '../css/header.css';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const DashboardHeader = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="header-container">
      {/* Logo at top-left */}
      <img src="/logoff.jpeg" alt="Logo" className="header-logo" />

      <button className="toggle-button" onClick={toggleSidebar}>
        Menu
      </button>

      <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
        <Link to="/auth">Authentication</Link>
        <Link to="/transactions">Add Transaction</Link>
        <Link to="/transactionlist">All Expenses</Link>
        <Link to="/charts">Charts</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
