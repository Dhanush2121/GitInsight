import React, { useState } from 'react';
import '../styles/SearchSection.css';

const SearchSection = ({ onAnalyze, loading }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onAnalyze(username);
      setUsername('');
    }
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <h2>Search GitHub Profile</h2>
        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="search-input"
            />
            <button
              type="submit"
              disabled={loading || !username.trim()}
              className="analyze-btn"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                'Analyze Profile'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchSection;
