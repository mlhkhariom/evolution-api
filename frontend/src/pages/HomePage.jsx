import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="header">
        <nav className="nav">
          <div className="logo">WhatUBox</div>
          <ul className="nav-links">
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/login" className="btn btn-login">Login</a></li>
            <li><a href="/register" className="btn btn-register">Sign Up</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <section className="hero">
          <h1>Welcome to WhatUBox - By MLHK</h1>
          <p>The ultimate WhatsApp SaaS platform with AI-powered chatbots, marketing tools, and more.</p>
          <a href="/register" className="btn btn-cta">Get Started Now</a>
        </section>
      </main>
      <footer style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa' }}>
        <p>Developed By MLHK infotech (Hariom Vishwkama)</p>
      </footer>
    </div>
  );
};

export default HomePage;
