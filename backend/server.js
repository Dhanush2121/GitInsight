require('dotenv').config();
const express = require('express');
const cors = require('cors');
const githubRoutes = require('./routes/github');
const healthRoutes = require('./routes/health');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));


app.use('/api/github', githubRoutes);
app.use('/api', healthRoutes);


app.get('/', (req, res) => {
  res.json({
    message: 'GitHub Profile Analyzer API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      analyze: 'POST /api/github/analyze/:username',
      getProfiles: 'GET /api/github/profiles',
      getProfile: 'GET /api/github/profiles/:username',
      topFollowed: 'GET /api/github/top-followed',
      topStarred: 'GET /api/github/top-starred',
      deleteProfile: 'DELETE /api/github/profiles/:username',
    },
  });
});


app.use(errorHandler);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
