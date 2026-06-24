import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import ProfileCard from '../components/ProfileCard';
import InsightsDashboard from '../components/InsightsDashboard';
import ProfilesTable from '../components/ProfilesTable';
import Statistics from '../components/Statistics';
import Alert from '../components/Alert';
import TopNav from '../components/TopNav';
import CommandPalette from '../components/CommandPalette';
import {
  analyzeProfile,
  getAllProfiles,
  getTopFollowed,
  getTopStarred,
  deleteProfile,
} from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [topFollowed, setTopFollowed] = useState([]);
  const [topStarred, setTopStarred] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Fetch all profiles and stats
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [profilesRes, topFollowedRes, topStarredRes] = await Promise.all([
        getAllProfiles(),
        getTopFollowed(),
        getTopStarred(),
      ]);

      // Debug logs to inspect API responses when profiles are missing
      // Remove in production
      // eslint-disable-next-line no-console
      console.log('API responses:', {
        profiles: profilesRes?.data,
        topFollowed: topFollowedRes?.data,
        topStarred: topStarredRes?.data,
      });

      setProfiles(profilesRes.data.data || []);
      setTopFollowed(topFollowedRes.data.data || []);
      setTopStarred(topStarredRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAnalyze = async (username) => {
    setLoading(true);
    try {
      const response = await analyzeProfile(username);
      const newProfile = response.data.data;

      setCurrentProfile(newProfile);
      showAlert(response.data.message, 'success');

      // Refresh all data
      await fetchAllData();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to analyze profile';
      showAlert(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (username) => {
    if (window.confirm(`Are you sure you want to delete ${username}'s profile?`)) {
      setLoading(true);
      try {
        await deleteProfile(username);
        showAlert('Profile deleted successfully', 'success');

        // Refresh data
        await fetchAllData();

        // Clear current profile if deleted
        if (currentProfile?.username === username) {
          setCurrentProfile(null);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'Failed to delete profile';
        showAlert(errorMessage, 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <div className="dashboard">
      <Header />
      <TopNav onOpenPalette={()=>setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={setPaletteOpen} />
      {alert && <Alert message={alert.message} type={alert.type} />}
      
      <div className="dashboard-container">
        <SearchSection onAnalyze={handleAnalyze} loading={loading} />

        {currentProfile && (
          <>
            <ProfileCard profile={currentProfile} />
            <InsightsDashboard profile={currentProfile} />
          </>
        )}

        <Statistics 
          topFollowed={topFollowed} 
          topStarred={topStarred} 
          loading={loading}
        />

        <ProfilesTable 
          profiles={profiles} 
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
