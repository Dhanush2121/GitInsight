import axios from 'axios';

const rawApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = rawApiUrl.replace(/\/+$/, '').endsWith('/api')
  ? rawApiUrl.replace(/\/+$/, '')
  : `${rawApiUrl.replace(/\/+$/, '')}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GitHub API methods
export const analyzeProfile = (username) => {
  return api.post(`/github/analyze/${username}`);
};

export const getAllProfiles = () => {
  return api.get('/github/profiles');
};

export const getProfile = (username) => {
  return api.get(`/github/profiles/${username}`);
};

export const getTopFollowed = (limit = 10) => {
  return api.get(`/github/top-followed?limit=${limit}`);
};

export const getTopStarred = (limit = 10) => {
  return api.get(`/github/top-starred?limit=${limit}`);
};

export const deleteProfile = (username) => {
  return api.delete(`/github/profiles/${username}`);
};

export const getHealth = () => {
  return api.get('/health');
};

export default api;
