# GitHub Profile Analyzer

A full-stack web application that analyzes GitHub user profiles, stores profile data in MySQL, and exposes a backend API for analytics and retrieval.

## 🚀 Project Focus

This repository includes:
- `backend/` — Express API, GitHub integration, MySQL persistence
- `frontend/` — React app that consumes backend API

The backend is the heart of the app: it fetches GitHub data, calculates insights, saves profiles, and serves REST endpoints.

---

## 🧠 Backend Overview

### Main backend files

- `backend/server.js` — Express server entry point
- `backend/config/database.js` — MySQL connection pool
- `backend/config/constants.js` — API constants and error messages
- `backend/controllers/githubController.js` — route handlers and business logic
- `backend/models/Profile.js` — database queries for profiles and repositories
- `backend/routes/github.js` — GitHub-related REST routes
- `backend/routes/health.js` — health check route
- `backend/utils/githubService.js` — GitHub API integration and metrics calculation
- `backend/middleware/errorHandler.js` — centralized error response handling
- `backend/schema.sql` — MySQL table definitions

### Backend stack

- Node.js
- Express.js
- MySQL2
- Axios
- dotenv

---

## 🔌 Backend API Endpoints

All endpoints are mounted under `/api`.

### Health check

- `GET /api/health`
- Response: status `200` with JSON success message

### Analyze GitHub user

- `POST /api/github/analyze/:username`
- Description: fetch GitHub profile + repos, calculate insights, save or update the profile in MySQL
- Response:
  - `success: true`
  - `message: 'Profile analyzed and saved successfully'` or `Profile updated successfully`
  - `data`: profile object

### Get all analyzed profiles

- `GET /api/github/profiles`
- Description: returns all stored profiles sorted by last analysis time
- Response: `data` contains list of profiles

### Get a single profile

- `GET /api/github/profiles/:username`
- Description: returns profile and repository details for one GitHub username

### Get top followed profiles

- `GET /api/github/top-followed?limit=10`
- Description: returns profiles ordered by `followers` descending
- Query param: `limit` (optional, default `10`)

### Get top starred profiles

- `GET /api/github/top-starred?limit=10`
- Description: returns profiles ordered by `total_stars` descending
- Query param: `limit` (optional, default `10`)

### Delete a profile

- `DELETE /api/github/profiles/:username`
- Description: removes profile and associated repositories from MySQL

---

## 🗄️ Database Schema

### `github_profiles`

Stores analyzed GitHub profile metadata and computed insights.

Columns:
- `id` — auto-increment primary key
- `username` — GitHub login, unique
- `name`
- `bio`
- `avatar_url`
- `profile_url`
- `public_repos`
- `followers`
- `following`
- `account_age_days`
- `total_stars`
- `total_forks`
- `most_used_language`
- `avg_stars_per_repo`
- `follower_following_ratio`
- `location`
- `company`
- `blog`
- `twitter_username`
- `public_gists`
- `created_at`
- `analyzed_at`

Indexes:
- `idx_username`
- `idx_followers`
- `idx_total_stars`
- `idx_analyzed_at`

### `github_repositories`

Stores top repositories for each analyzed profile.

Columns:
- `id`
- `profile_username` — foreign key to `github_profiles(username)`
- `repo_name`
- `repo_url`
- `description`
- `stars`
- `forks`
- `language`
- `is_fork`
- `created_at`

Indexes:
- `idx_profile_username`
- `idx_stars`
- Unique key: `(profile_username, repo_name)`

Foreign key:
- `fk_profile` enforces cascade delete when a profile is removed

---

## ⚙️ Backend Operation Details

### Profile analysis flow

1. Client calls `POST /api/github/analyze/:username`
2. `githubController.analyzeProfile()` validates the username
3. `githubService.getGithubUserData()` calls GitHub API:
   - `GET https://api.github.com/users/:username`
   - `GET https://api.github.com/users/:username/repos` (paginated)
4. The backend calculates metrics:
   - total stars
   - total forks
   - most used language
   - account age in days
   - average stars per repo
   - follower/following ratio
5. The profile is inserted or updated in `github_profiles`
6. Top 10 repos by stars are saved into `github_repositories`

### Data returned by the backend

The backend returns a profile object with fields such as:
- `username`
- `name`
- `bio`
- `avatar_url`
- `profile_url`
- `public_repos`
- `followers`
- `following`
- `account_age_days`
- `total_stars`
- `total_forks`
- `most_used_language`
- `avg_stars_per_repo`
- `follower_following_ratio`
- `location`
- `company`
- `blog`
- `twitter_username`
- `public_gists`
- `repositories`

The frontend consumes these fields and renders profile cards, statistics, and a leaderboard.

---

## 🛠️ Environment Variables

Create `backend/.env` and define:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer

FRONTEND_URL=http://localhost:3000
```

### Notes
- `PORT` is used by Render if deployed
- `DB_*` values connect to MySQL
- `FRONTEND_URL` is used by CORS to allow your frontend origin

---

## 🔧 Backend Setup and Run

### Install dependencies

```bash
cd backend
npm install
```

### Run locally

```bash
npm run dev
```

### Production start

```bash
npm start
```

### Backend health check

Once running, verify the backend with:

```bash
curl http://localhost:5000/api/health
```

---

## 📦 Deployment Notes

### Render backend
- Deploy the `backend/` folder as a Node.js web service
- Start command: `npm start`
- Ensure environment variables are configured on Render
- Set `FRONTEND_URL` to your deployed frontend origin

### Vercel frontend
- Deploy the `frontend/` folder
- Set `REACT_APP_API_URL` to `https://<your-backend>.onrender.com/api`
- The frontend uses this variable to call the backend

---

## 🔍 Troubleshooting

### CORS issues
- Ensure `FRONTEND_URL` on backend matches exactly your deployed frontend URL
- Example: `https://your-app.vercel.app`

### Wrong backend path
- `REACT_APP_API_URL` must include `/api`
- Example: `https://gitinsight-hiay.onrender.com/api`

### Database errors
- Confirm `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` are correct
- Make sure `backend/schema.sql` has been executed

---

## 📁 Frontend Summary

Frontend is a Create React App that consumes the backend API via `frontend/src/services/api.js`.

Key files:
- `frontend/src/pages/Dashboard.js` — main app logic and API calls
- `frontend/src/components/SearchSection.js` — GitHub username form
- `frontend/src/services/api.js` — Axios wrapper for backend requests

---

## ✅ Quick Start Summary

1. Run MySQL and import `backend/schema.sql`
2. Configure `backend/.env`
3. `cd backend && npm install && npm run dev`
4. `cd frontend && npm install && npm start`
5. Use the app at `http://localhost:3000`

---

## 📌 License

Dhanush2121


