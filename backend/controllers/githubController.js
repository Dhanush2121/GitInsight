const Profile = require('../models/Profile');
const { getGithubUserData } = require('../utils/githubService');
const { DATABASE_ERROR, INVALID_USERNAME } = require('../config/constants');

exports.analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username || username.trim() === '') {
      return res.status(400).json({
        success: false,
        message: INVALID_USERNAME,
      });
    }

    // Fetch 
    const githubData = await getGithubUserData(username);

    // Check if profile exists
    const existingProfile = await Profile.findByUsername(githubData.username);

    let result;
    if (existingProfile) {
      // Update
      result = await Profile.update(githubData.username, githubData);
    } else {
      // Create new profile
      result = await Profile.create(githubData);
    }

    // Save repositories
    if (githubData.repositories) {
      await Profile.saveRepositories(githubData.username, githubData.repositories);
    }

    res.status(200).json({
      success: true,
      message: existingProfile ? 'Profile updated successfully' : 'Profile analyzed and saved successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error analyzing profile:', error);
    res.status(error.message.includes('not found') ? 404 : 500).json({
      success: false,
      message: error.message || DATABASE_ERROR,
    });
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll();

    // Debug: log number of profiles fetched from DB
    // Remove these logs after debugging
    // eslint-disable-next-line no-console
    console.log(`[DEBUG] GET /api/github/profiles - rows fetched: ${profiles.length}`);
    if (profiles.length > 0) {
      // eslint-disable-next-line no-console
      console.log('[DEBUG] sample profile:', profiles[0]);
    }

    // Add top 3 
    const profilesWithRepos = await Promise.all(
      profiles.map(async (profile) => {
        const repos = await Profile.getRepositories(profile.username);
        return {
          ...profile,
          topRepositories: repos.slice(0, 3),
        };
      })
    );

    res.status(200).json({
      success: true,
      data: profilesWithRepos,
      count: profilesWithRepos.length,
    });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({
      success: false,
      message: DATABASE_ERROR,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await Profile.findByUsername(username);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found in database',
      });
    }

    // Fetch
    const repositories = await Profile.getRepositories(username);

    res.status(200).json({
      success: true,
      data: {
        ...profile,
        repositories: repositories,
      },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: DATABASE_ERROR,
    });
  }
};

exports.getTopFollowed = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const profiles = await Profile.findTopFollowed(limit);

    res.status(200).json({
      success: true,
      data: profiles,
      count: profiles.length,
    });
  } catch (error) {
    console.error('Error fetching top followed:', error);
    res.status(500).json({
      success: false,
      message: DATABASE_ERROR,
    });
  }
};

exports.getTopStarred = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const profiles = await Profile.findTopStarred(limit);

    res.status(200).json({
      success: true,
      data: profiles,
      count: profiles.length,
    });
  } catch (error) {
    console.error('Error fetching top starred:', error);
    res.status(500).json({
      success: false,
      message: DATABASE_ERROR,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await Profile.findByUsername(username);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    await Profile.delete(username);

    res.status(200).json({
      success: true,
      message: 'Profile deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({
      success: false,
      message: DATABASE_ERROR,
    });
  }
};
