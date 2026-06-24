-- GitHub Profile Analyzer Database Schema


-- Create Database
CREATE DATABASE IF NOT EXISTS github_analyzer;
USE github_analyzer;

-- Drop existing table if exists
DROP TABLE IF EXISTS github_profiles;

-- Create github_profiles table
CREATE TABLE github_profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(500),
  profile_url VARCHAR(500),
  public_repos INT DEFAULT 0,
  followers INT DEFAULT 0,
  following INT DEFAULT 0,
  account_age_days INT DEFAULT 0,
  total_stars INT DEFAULT 0,
  total_forks INT DEFAULT 0,
  most_used_language VARCHAR(100),
  avg_stars_per_repo DECIMAL(10, 2) DEFAULT 0,
  follower_following_ratio DECIMAL(10, 2) DEFAULT 0,
  location VARCHAR(255),
  company VARCHAR(255),
  blog VARCHAR(500),
  twitter_username VARCHAR(100),
  public_gists INT DEFAULT 0,
  analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_followers (followers),
  INDEX idx_total_stars (total_stars),
  INDEX idx_analyzed_at (analyzed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create repositories table to store top repositories for each profile
DROP TABLE IF EXISTS github_repositories;
CREATE TABLE github_repositories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  profile_username VARCHAR(255) NOT NULL,
  repo_name VARCHAR(255) NOT NULL,
  repo_url VARCHAR(500),
  description TEXT,
  stars INT DEFAULT 0,
  forks INT DEFAULT 0,
  language VARCHAR(100),
  is_fork BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (profile_username) REFERENCES github_profiles(username) ON DELETE CASCADE,
  INDEX idx_profile_username (profile_username),
  INDEX idx_stars (stars),
  UNIQUE KEY unique_repo (profile_username, repo_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


