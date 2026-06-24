import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TopNav.css';

const TopNav = ({onOpenPalette}) => {
  return (
    <nav className="topnav">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </div>
      <div className="nav-right">
        <button className="palette-btn" onClick={onOpenPalette}>Search</button>
      </div>
    </nav>
  );
};

export default TopNav;
