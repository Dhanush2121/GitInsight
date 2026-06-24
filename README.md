# GitHub Profile Analyzer

A full-stack web application that analyzes GitHub user profiles, generates useful insights, and stores data in MySQL.

## 🚀 Features

- **GitHub Profile Analysis**: Analyze any GitHub user's profile using the GitHub Public API
- **Comprehensive Metrics**: Calculate and display detailed insights about developers
- **Database Persistence**: Store analyzed profiles in MySQL for easy retrieval
- **Search History**: View previously analyzed profiles
- **Advanced Statistics**: Filter by most followed or most starred profiles
- **Responsive Design**: Beautiful, modern, and fully responsive UI
- **Real-time Updates**: Auto-update profiles with latest GitHub data
- **REST API**: Complete REST API for programmatic access

## 📊 Calculated Insights

- Total Stars
- Total Forks
- Most Used Programming Language
- Account Age (in days)
- Average Stars per Repository
- Follower/Following Ratio
- Public Gists
- Company, Location, Blog, Twitter info

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL (v5.7 or higher)
- Git

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MySQL2 (Promise-based MySQL client)
- Axios (HTTP client)
- dotenv (Environment variables)

**Frontend:**
- React 18
- Axios (HTTP client)
- CSS3 (Modern styling)

**Database:**
- MySQL

**Architecture:**
- MVC (Model-View-Controller) pattern

## 📁 Project Structure

```
GitHub-Profile-Analyzer/
├── backend/
│   ├── config/
│   │   ├── database.js          # MySQL connection pool
│   │   └── constants.js         # Constants and error messages
│   ├── controllers/
│   │   └── githubController.js  # API request handlers
│   ├── models/
│   │   └── Profile.js           # Database operations
│   ├── routes/
│   │   ├── github.js            # GitHub API routes
│   │   └── health.js            # Health check route
│   ├── middleware/
│   │   └── errorHandler.js      # Error handling middleware
│   ├── utils/
│   │   └── githubService.js     # GitHub API integration logic
│   ├── server.js                # Main server file
│   ├── package.json
│   ├── .env.example
│   └── schema.sql               # Database schema
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── SearchSection.js
│   │   │   ├── ProfileCard.js
│   │   │   ├── InsightsDashboard.js
│   │   │   ├── ProfilesTable.js
│   │   │   ├── Statistics.js
│   │   │   └── Alert.js
│   │   ├── pages/
│   │   │   └── Dashboard.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── SearchSection.css
│   │   │   ├── ProfileCard.css
│   │   │   ├── InsightsDashboard.css
│   │   │   ├── ProfilesTable.css
│   │   │   ├── Statistics.css
│   │   │   ├── Header.css
│   │   │   ├── Alert.css
│   │   │   └── Dashboard.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
├── README.md
└── GitHub-Profile-Analyzer.postman_collection.json
```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
cd Git-Analyse
```

### 2. Setup Database

```bash
# Open MySQL CLI
mysql -u root -p

# Run the schema file
source backend/schema.sql;

# Exit MySQL
exit;
```

### 3. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file from .env.example
cp .env.example .env

# Edit .env with your MySQL credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=github_analyzer

# Start the server
npm run dev
# or
npm start
```

The backend will start on `http://localhost:5000`

### 4. Setup Frontend

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file from .env.example
cp .env.example .env

# Start the development server
npm start
```

The frontend will open at `http://localhost:3000`


