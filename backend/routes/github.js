const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');

// POST /api/github/analyze/:username
router.post('/analyze/:username', githubController.analyzeProfile);

// GET /api/github/profiles
router.get('/profiles', githubController.getProfiles);

// GET /api/github/profiles/:username
router.get('/profiles/:username', githubController.getProfile);

// GET /api/github/top-followed
router.get('/top-followed', githubController.getTopFollowed);

// GET /api/github/top-starred
router.get('/top-starred', githubController.getTopStarred);

// DELETE /api/github/profiles/:username
router.delete('/profiles/:username', githubController.deleteProfile);

module.exports = router;
