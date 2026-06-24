import React from 'react';
import '../styles/ProfileCard.css';

const ProfileCard = ({ profile, showShare=false }) => {
  if (!profile) return null;

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={profile.avatar_url} alt={profile.username} className="avatar" />
        <div className="profile-info">
          <h3 className="profile-name">{profile.name}</h3>
          <p className="profile-username">@{profile.username}</p>
          <p className="profile-bio">{profile.bio}</p>
          <a href={profile.profile_url} target="_blank" rel="noopener noreferrer" className="profile-link">
            View on GitHub →
          </a>
          {showShare && (
            <button className="share-btn" onClick={()=>{navigator.clipboard.writeText(window.location.origin + '/profile/' + profile.username); alert('Profile link copied to clipboard');}}>Share</button>
          )}
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat">
          <span className="stat-label">Followers</span>
          <span className="stat-value">{profile.followers.toLocaleString()}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Following</span>
          <span className="stat-value">{profile.following.toLocaleString()}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Repositories</span>
          <span className="stat-value">{profile.public_repos.toLocaleString()}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Location</span>
          <span className="stat-value">{profile.location}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
