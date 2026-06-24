import React from 'react';
import '../styles/Statistics.css';

const Statistics = ({ topFollowed, topStarred, loading }) => {
  return (
    <section className="statistics-section">
      <h2>Top Profiles</h2>
      <div className="statistics-grid">
        <div className="stat-card">
          <h3>👥 Most Followed</h3>
          {loading ? (
            <p className="loading">Loading...</p>
          ) : topFollowed.length > 0 ? (
            <div className="top-profile">
              <img src={topFollowed[0].avatar_url} alt={topFollowed[0].username} />
              <div className="top-profile-info">
                <p className="top-profile-name">{topFollowed[0].name}</p>
                <p className="top-profile-username">@{topFollowed[0].username}</p>
                <p className="top-profile-stat">{topFollowed[0].followers.toLocaleString()} followers</p>
              </div>
            </div>
          ) : (
            <p className="no-data">No data available</p>
          )}
        </div>

        <div className="stat-card">
          <h3>⭐ Most Starred</h3>
          {loading ? (
            <p className="loading">Loading...</p>
          ) : topStarred.length > 0 ? (
            <div className="top-profile">
              <img src={topStarred[0].avatar_url} alt={topStarred[0].username} />
              <div className="top-profile-info">
                <p className="top-profile-name">{topStarred[0].name}</p>
                <p className="top-profile-username">@{topStarred[0].username}</p>
                <p className="top-profile-stat">{topStarred[0].total_stars.toLocaleString()} stars</p>
              </div>
            </div>
          ) : (
            <p className="no-data">No data available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
