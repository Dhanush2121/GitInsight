import React from 'react';
import '../styles/ProfilesTable.css';

const ProfilesTable = ({ profiles, onDelete, loading }) => {
  const [pinned, setPinned] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('pinnedProfiles')||'[]'); } catch(e){return []}
  });

  if (profiles.length === 0) {
    return (
      <section className="profiles-table-section">
        <h2>Analyzed Profiles</h2>
        <div className="empty-state">
          <p>No profiles analyzed yet. Search for a GitHub profile to get started!</p>
        </div>
      </section>
    );
  }

  const togglePin = (username) => {
    const next = pinned.includes(username) ? pinned.filter(u=>u!==username) : [username, ...pinned];
    setPinned(next);
    localStorage.setItem('pinnedProfiles', JSON.stringify(next));
  };

  const ordered = [...profiles].sort((a,b)=>{
    const pa = pinned.includes(a.username)?1:0;
    const pb = pinned.includes(b.username)?1:0;
    if(pa!==pb) return pb-pa; // pinned first
    return b.followers - a.followers;
  });

  return (
    <section className="profiles-table-section">
      <h2>Analyzed Profiles ({profiles.length})</h2>
      <div className="table-wrapper">
        <table className="profiles-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Followers</th>
              <th>Repositories</th>
              <th>Stars</th>
              <th>Language</th>
              <th>Top Repo</th>
              <th>Analyzed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((profile) => (
              <tr key={profile.id} className={`profile-row ${pinned.includes(profile.username)?'pinned':''}`}>
                <td className="username-cell">
                  <img src={profile.avatar_url} alt={profile.username} className="mini-avatar" />
                  <span>{profile.username}</span>
                </td>
                <td>{profile.followers.toLocaleString()}</td>
                <td>{profile.public_repos}</td>
                <td>{profile.total_stars.toLocaleString()}</td>
                <td>{profile.most_used_language}</td>
                <td className="repo-cell">
                  {profile.topRepositories && profile.topRepositories[0] ? (
                    <a href={profile.topRepositories[0].repo_url} target="_blank" rel="noopener noreferrer" className="repo-link">
                      {profile.topRepositories[0].repo_name} ⭐{profile.topRepositories[0].stars}
                    </a>
                  ) : (
                    <span className="no-repo">—</span>
                  )}
                </td>
                <td>{new Date(profile.analyzed_at).toLocaleDateString()}</td>
                <td className="actions-cell">
                  <button className="pin-btn" onClick={()=>togglePin(profile.username)} title="Pin profile">📌</button>
                  <a href={profile.profile_url} target="_blank" rel="noopener noreferrer" className="view-btn">
                    View
                  </a>
                  <button
                    onClick={() => onDelete(profile.username)}
                    className="delete-btn"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProfilesTable;
