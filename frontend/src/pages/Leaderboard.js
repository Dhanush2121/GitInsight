import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Leaderboard.css';
import { getAllProfiles } from '../services/api';

const Badge = ({ rank }) => {
  if (rank === 1) return <span className="medal gold">🥇</span>;
  if (rank === 2) return <span className="medal silver">🥈</span>;
  if (rank === 3) return <span className="medal bronze">🥉</span>;
  return <span className="rank">#{rank}</span>;
};

const Leaderboard = () => {
  const [tab, setTab] = useState('stars');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const res = await getAllProfiles();
        let profiles = res.data.data || [];
        
        // Sort based on selected tab
        switch(tab) {
          case 'stars':
            profiles = [...profiles].sort((a, b) => b.total_stars - a.total_stars);
            break;
          case 'followers':
            profiles = [...profiles].sort((a, b) => b.followers - a.followers);
            break;
          case 'repos':
            profiles = [...profiles].sort((a, b) => b.public_repos - a.public_repos);
            break;
          case 'forks':
            profiles = [...profiles].sort((a, b) => b.total_forks - a.total_forks);
            break;
          default:
            break;
        }
        
        setItems(profiles);
      } catch (err) {
        console.error('Leaderboard fetch error', err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, [tab]);

  const getMetricLabel = () => {
    switch(tab) {
      case 'stars': return 'Stars';
      case 'followers': return 'Followers';
      case 'repos': return 'Repositories';
      case 'forks': return 'Forks';
      default: return '';
    }
  };

  const getMetricValue = (profile) => {
    switch(tab) {
      case 'stars': return profile.total_stars;
      case 'followers': return profile.followers;
      case 'repos': return profile.public_repos;
      case 'forks': return profile.total_forks;
      default: return 0;
    }
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard-top">
        <button className="back-btn" onClick={() => navigate('/')}>← Home</button>
        <div>
          <h2>🏆 Leaderboard</h2>
          <p className="subtitle">Top developers ranked by contributions</p>
        </div>
      </div>
      
      <div className="tabs">
        <button className={tab==='stars'?'active':''} onClick={()=>setTab('stars')}>⭐ Top Stars</button>
        <button className={tab==='followers'?'active':''} onClick={()=>setTab('followers')}>👥 Top Followers</button>
        <button className={tab==='repos'?'active':''} onClick={()=>setTab('repos')}>📦 Top Repositories</button>
        <button className={tab==='forks'?'active':''} onClick={()=>setTab('forks')}>🍴 Top Forks</button>
      </div>

      <div className="list">
        {loading ? (
          <div className="loading">Loading profiles...</div>
        ) : items.length === 0 ? (
          <div className="loading">No profiles yet</div>
        ) : (
          items.map((p, i) => (
            <div key={p.username} className="item">
              <div className="left">
                <Badge rank={i+1} />
                <img src={p.avatar_url} alt={p.username} />
                <div>
                  <div className="name">{p.name || p.username}</div>
                  <div className="username">@{p.username}</div>
                </div>
              </div>
              <div className="stat-highlight">
                <span className="stat-value">{getMetricValue(p).toLocaleString()}</span>
                <span className="stat-label">{getMetricLabel()}</span>
              </div>
              <div className="meta">
                <span>👥 {p.followers.toLocaleString()}</span>
                <span>⭐ {p.total_stars.toLocaleString()}</span>
                <span>📦 {p.public_repos}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
