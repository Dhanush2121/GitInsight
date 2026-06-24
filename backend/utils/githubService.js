const axios = require('axios');
const { GITHUB_API_BASE_URL, GITHUB_API_HEADERS, RATE_LIMIT_EXCEEDED, USER_NOT_FOUND } = require('../config/constants');

const getGithubUserData = async (username) => {
  try {
    // Validate username
    if (!username || username.trim() === '') {
      throw new Error('Username is required');
    }

    // Fetch user data
    const userResponse = await axios.get(
      `${GITHUB_API_BASE_URL}/users/${username}`,
      { headers: GITHUB_API_HEADERS }
    );

    const userData = userResponse.data;

    // Fetch repositories
    let repos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const reposResponse = await axios.get(
        `${GITHUB_API_BASE_URL}/users/${username}/repos?page=${page}&per_page=100`,
        { headers: GITHUB_API_HEADERS }
      );

      if (reposResponse.data.length === 0) {
        hasMore = false;
      } else {
        repos = [...repos, ...reposResponse.data];
        page++;
      }
    }

    // Calculate metrics
    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
    
    // Get most used language
    const languages = {};
    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });
    
    const mostUsedLanguage = Object.keys(languages).length > 0
      ? Object.keys(languages).reduce((a, b) => languages[a] > languages[b] ? a : b)
      : 'Not specified';

    // Calculate account age
    const createdAt = new Date(userData.created_at);
    const accountAgeDays = Math.floor((Date.now() - createdAt) / (1000 * 60 * 60 * 24));

    // Calculate average stars
    const avgStarsPerRepo = repos.length > 0 ? (totalStars / repos.length).toFixed(2) : 0;

    // Calculate follower ratio
    const followerFollowingRatio = userData.following > 0
      ? (userData.followers / userData.following).toFixed(2)
      : userData.followers;

    return {
      username: userData.login,
      name: userData.name || 'Not specified',
      bio: userData.bio || 'No bio',
      avatar_url: userData.avatar_url,
      profile_url: userData.html_url,
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      account_age_days: accountAgeDays,
      total_stars: totalStars,
      total_forks: totalForks,
      most_used_language: mostUsedLanguage,
      avg_stars_per_repo: avgStarsPerRepo,
      follower_following_ratio: followerFollowingRatio,
      location: userData.location || 'Not specified',
      company: userData.company || 'Not specified',
      blog: userData.blog || 'Not specified',
      twitter_username: userData.twitter_username || 'Not specified',
      public_gists: userData.public_gists,
      repositories: repos, // Include repos array
      updated_at: new Date().toISOString(),
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(USER_NOT_FOUND);
    } else if (error.response?.status === 403) {
      throw new Error(RATE_LIMIT_EXCEEDED);
    }
    throw error;
  }
};

module.exports = {
  getGithubUserData,
};
