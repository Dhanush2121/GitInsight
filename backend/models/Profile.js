const pool = require('../config/database');

class Profile {
  static async create(profileData) {
    const connection = await pool.getConnection();
    try {
      const query = `
        INSERT INTO github_profiles 
        (username, name, bio, avatar_url, profile_url, public_repos, 
         followers, following, account_age_days, total_stars, total_forks, 
         most_used_language, avg_stars_per_repo, follower_following_ratio,
         location, company, blog, twitter_username, public_gists, analyzed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;

      const values = [
        profileData.username,
        profileData.name,
        profileData.bio,
        profileData.avatar_url,
        profileData.profile_url,
        profileData.public_repos,
        profileData.followers,
        profileData.following,
        profileData.account_age_days,
        profileData.total_stars,
        profileData.total_forks,
        profileData.most_used_language,
        profileData.avg_stars_per_repo,
        profileData.follower_following_ratio,
        profileData.location,
        profileData.company,
        profileData.blog,
        profileData.twitter_username,
        profileData.public_gists,
      ];

      await connection.execute(query, values);
      return profileData;
    } finally {
      connection.release();
    }
  }

  static async update(username, profileData) {
    const connection = await pool.getConnection();
    try {
      const query = `
        UPDATE github_profiles SET 
          name = ?, bio = ?, avatar_url = ?, profile_url = ?,
          public_repos = ?, followers = ?, following = ?, account_age_days = ?,
          total_stars = ?, total_forks = ?, most_used_language = ?,
          avg_stars_per_repo = ?, follower_following_ratio = ?,
          location = ?, company = ?, blog = ?, twitter_username = ?,
          public_gists = ?, analyzed_at = NOW()
        WHERE username = ?
      `;

      const values = [
        profileData.name,
        profileData.bio,
        profileData.avatar_url,
        profileData.profile_url,
        profileData.public_repos,
        profileData.followers,
        profileData.following,
        profileData.account_age_days,
        profileData.total_stars,
        profileData.total_forks,
        profileData.most_used_language,
        profileData.avg_stars_per_repo,
        profileData.follower_following_ratio,
        profileData.location,
        profileData.company,
        profileData.blog,
        profileData.twitter_username,
        profileData.public_gists,
        username,
      ];

      await connection.execute(query, values);
      return profileData;
    } finally {
      connection.release();
    }
  }

  static async findByUsername(username) {
    const connection = await pool.getConnection();
    try {
      const query = 'SELECT * FROM github_profiles WHERE username = ?';
      const [rows] = await connection.execute(query, [username]);
      return rows.length > 0 ? rows[0] : null;
    } finally {
      connection.release();
    }
  }

  static async findAll() {
    const connection = await pool.getConnection();
    try {
      const query = 'SELECT * FROM github_profiles ORDER BY analyzed_at DESC';
      const [rows] = await connection.execute(query);
      return rows;
    } finally {
      connection.release();
    }
  }

  static async findTopFollowed(limit = 10) {
    const connection = await pool.getConnection();
    try {
      const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : 10;
      const query = `SELECT * FROM github_profiles ORDER BY followers DESC LIMIT ${safeLimit}`;
      const [rows] = await connection.execute(query);
      return rows;
    } finally {
      connection.release();
    }
  }

  static async findTopStarred(limit = 10) {
    const connection = await pool.getConnection();
    try {
      const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : 10;
      const query = `SELECT * FROM github_profiles ORDER BY total_stars DESC LIMIT ${safeLimit}`;
      const [rows] = await connection.execute(query);
      return rows;
    } finally {
      connection.release();
    }
  }

  static async delete(username) {
    const connection = await pool.getConnection();
    try {
      const query = 'DELETE FROM github_profiles WHERE username = ?';
      const result = await connection.execute(query, [username]);
      return result[0].affectedRows > 0;
    } finally {
      connection.release();
    }
  }

  static async deleteAll() {
    const connection = await pool.getConnection();
    try {
      const query = 'DELETE FROM github_profiles';
      await connection.execute(query);
    } finally {
      connection.release();
    }
  }

  static async saveRepositories(username, repositories) {
    const connection = await pool.getConnection();
    try {
      // Delete 
      await connection.execute('DELETE FROM github_repositories WHERE profile_username = ?', [username]);

      // Insert (top 10 by stars)
      const topRepos = repositories
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10);

      for (const repo of topRepos) {
        const query = `
          INSERT INTO github_repositories 
          (profile_username, repo_name, repo_url, description, stars, forks, language, is_fork)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          username,
          repo.name,
          repo.html_url,
          repo.description || '',
          repo.stargazers_count || 0,
          repo.forks_count || 0,
          repo.language || 'Unknown',
          repo.fork ? 1 : 0,
        ];
        await connection.execute(query, values);
      }
    } finally {
      connection.release();
    }
  }

  static async getRepositories(username) {
    const connection = await pool.getConnection();
    try {
      const query = `
        SELECT repo_name, repo_url, description, stars, forks, language, is_fork
        FROM github_repositories 
        WHERE profile_username = ? 
        ORDER BY stars DESC
      `;
      const [repos] = await connection.execute(query, [username]);
      return repos;
    } finally {
      connection.release();
    }
  }
}

module.exports = Profile;
