import React from 'react';
import '../styles/InsightsDashboard.css';

const InsightsDashboard = ({ profile }) => {
  if (!profile) return null;

  return (
    <section className="insights-dashboard">
      <h2>Profile Insights</h2>
      <div className="insights-grid">
        <div className="insight-card">
          <div className="insight-icon">⭐</div>
          <div className="insight-content">
            <h4>Total Stars</h4>
            <p className="insight-value">{profile.total_stars.toLocaleString()}</p>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon">🍴</div>
          <div className="insight-content">
            <h4>Total Forks</h4>
            <p className="insight-value">{profile.total_forks.toLocaleString()}</p>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon">💻</div>
          <div className="insight-content">
            <h4>Most Used Language</h4>
            <p className="insight-value">{profile.most_used_language}</p>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon">📅</div>
          <div className="insight-content">
            <h4>Account Age</h4>
            <p className="insight-value">{profile.account_age_days.toLocaleString()} days</p>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon">📊</div>
          <div className="insight-content">
            <h4>Avg Stars per Repo</h4>
            <p className="insight-value">{profile.avg_stars_per_repo}</p>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon">👥</div>
          <div className="insight-content">
            <h4>Follower Ratio</h4>
            <p className="insight-value">{profile.follower_following_ratio}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsDashboard;
