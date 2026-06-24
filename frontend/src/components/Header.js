import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">🔍</span>
            GitHub Profile Analyzer
          </h1>
          <p className="app-subtitle">Analyze GitHub profiles and discover insights</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
