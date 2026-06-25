-- Drop tables
DROP TABLE IF EXISTS github_repositories;
DROP TABLE IF EXISTS github_profiles;

-- Create github_profiles table
CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(191) NOT NULL UNIQUE,
    name VARCHAR(191),
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
    avg_stars_per_repo DECIMAL(10,2) DEFAULT 0,
    follower_following_ratio DECIMAL(10,2) DEFAULT 0,
    location VARCHAR(191),
    company VARCHAR(191),
    blog VARCHAR(500),
    twitter_username VARCHAR(100),
    public_gists INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    analyzed_at DATETIME DEFAULT NULL,

    INDEX idx_username(username),
    INDEX idx_followers(followers),
    INDEX idx_total_stars(total_stars),
    INDEX idx_analyzed_at(analyzed_at)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create repositories table
CREATE TABLE github_repositories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profile_username VARCHAR(191) NOT NULL,
    repo_name VARCHAR(191) NOT NULL,
    repo_url VARCHAR(500),
    description TEXT,
    stars INT DEFAULT 0,
    forks INT DEFAULT 0,
    language VARCHAR(100),
    is_fork TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_profile_username(profile_username),
    INDEX idx_stars(stars),

    UNIQUE KEY unique_repo(profile_username, repo_name),

    CONSTRAINT fk_profile
        FOREIGN KEY (profile_username)
        REFERENCES github_profiles(username)
        ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;