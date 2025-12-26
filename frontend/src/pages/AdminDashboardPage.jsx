import React from 'react';
import './AdminDashboardPage.css';

function AdminDashboardPage() {
  return (
    <div className="admin-dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>
      <main className="dashboard-main">
        <p>Welcome to the WhatUBox Admin Dashboard.</p>
        <p>System management features will be available here.</p>
      </main>
    </div>
  );
}

export default AdminDashboardPage;
