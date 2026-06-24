const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_API_HEADERS = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'GitHub-Profile-Analyzer',
};

const RATE_LIMIT_EXCEEDED = 'GitHub API rate limit exceeded. Please try again later.';
const USER_NOT_FOUND = 'GitHub user not found.';
const DATABASE_ERROR = 'Database operation failed.';
const INVALID_USERNAME = 'Invalid GitHub username format.';

module.exports = {
  GITHUB_API_BASE_URL,
  GITHUB_API_HEADERS,
  RATE_LIMIT_EXCEEDED,
  USER_NOT_FOUND,
  DATABASE_ERROR,
  INVALID_USERNAME,
};
