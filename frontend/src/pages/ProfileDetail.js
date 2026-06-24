import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import InsightsDashboard from '../components/InsightsDashboard';
import { getProfile } from '../services/api';
import '../styles/ProfileDetail.css';

const BadgeGenerator = ({profile})=>{
  const [open,setOpen]=useState(false);
  const md = (type, value) => `![${type}](${`https://img.shields.io/badge/${encodeURIComponent(type)}-${value}-blue`})`;
  return (
    <div className="badge-gen">
      <button onClick={()=>setOpen(o=>!o)} className="small">GitHub Badge</button>
      {open && (
        <div className="badge-panel">
          <div>
            <label>Stars</label>
            <textarea rows={2} readOnly value={md('stars', profile.total_stars)} />
            <button onClick={()=>navigator.clipboard.writeText(md('stars', profile.total_stars))}>Copy</button>
          </div>
          <div>
            <label>Followers</label>
            <textarea rows={2} readOnly value={md('followers', profile.followers)} />
            <button onClick={()=>navigator.clipboard.writeText(md('followers', profile.followers))}>Copy</button>
          </div>
          <div>
            <label>Top Language</label>
            <textarea rows={2} readOnly value={md('language', profile.most_used_language)} />
            <button onClick={()=>navigator.clipboard.writeText(md('language', profile.most_used_language))}>Copy</button>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileDetail = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const f = async ()=>{
      try{
        const res = await getProfile(username);
        setProfile(res.data.data);
      }catch(e){console.error(e)}
    };
    f();
  },[username]);

  if(!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-detail">
      <div className="detail-top">
        <button className="back-btn" onClick={() => navigate('/')}>← Home</button>
        <h2>{profile.name || profile.username}</h2>
      </div>
      <ProfileCard profile={profile} showShare={true} />
      <InsightsDashboard profile={profile} />

      {profile.repositories && profile.repositories.length > 0 && (
        <div className="repositories-section">
          <h2>Top Repositories</h2>
          <div className="repos-grid">
            {profile.repositories.map((repo, idx) => (
              <a 
                key={idx} 
                href={repo.repo_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="repo-card"
              >
                <div className="repo-header">
                  <h3>{repo.repo_name}</h3>
                  <span className="repo-badge">⭐ {repo.stars.toLocaleString()}</span>
                </div>
                <p className="repo-desc">{repo.description || 'No description'}</p>
                <div className="repo-meta">
                  <span className="repo-lang">📝 {repo.language}</span>
                  <span className="repo-forks">🍴 {repo.forks}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <BadgeGenerator profile={profile} />
    </div>
  );
};

export default ProfileDetail;
