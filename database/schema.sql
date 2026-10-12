-- CreatorX MySQL 8 schema. The API also creates these tables on startup,
-- so running this file is optional (useful for manual setup or reviews).
CREATE DATABASE IF NOT EXISTS creatorx CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE creatorx;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(120) NOT NULL,
  role ENUM('creator','brand') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS creator_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  handle VARCHAR(80) NOT NULL DEFAULT '',
  bio TEXT NOT NULL,
  niche VARCHAR(255) NOT NULL DEFAULT '',
  followers INT NOT NULL DEFAULT 0,
  engagement_rate FLOAT NOT NULL DEFAULT 0,
  genuine_engagement_ratio FLOAT NOT NULL DEFAULT 0.5,
  avg_reel_views INT NOT NULL DEFAULT 0,
  country VARCHAR(80) NOT NULL DEFAULT '',
  city VARCHAR(80) NOT NULL DEFAULT '',
  audience_age JSON NOT NULL,
  audience_gender JSON NOT NULL,
  audience_countries JSON NOT NULL,
  content_quality FLOAT NOT NULL DEFAULT 50,
  past_roi FLOAT NOT NULL DEFAULT 50,
  price_per_post INT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  brand_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  niche VARCHAR(255) NOT NULL DEFAULT '',
  goal ENUM('balanced','awareness','conversion','local_launch') NOT NULL DEFAULT 'balanced',
  target_age_buckets JSON NOT NULL,
  target_gender VARCHAR(20) NOT NULL DEFAULT 'any',
  target_country VARCHAR(80) NOT NULL DEFAULT '',
  target_city VARCHAR(80) NOT NULL DEFAULT '',
  budget INT NOT NULL DEFAULT 0,
  min_followers INT NOT NULL DEFAULT 0,
  max_followers INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX ix_campaigns_brand (brand_id),
  FOREIGN KEY (brand_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  campaign_id INT NOT NULL,
  creator_id INT NOT NULL,
  score FLOAT NOT NULL,
  breakdown JSON NOT NULL,
  status ENUM('pending','invited','accepted','declined') NOT NULL DEFAULT 'pending',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_campaign_creator (campaign_id, creator_id),
  INDEX ix_matches_creator (creator_id),
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
  FOREIGN KEY (creator_id) REFERENCES creator_profiles(id) ON DELETE CASCADE
);

-- Optional: dedicated app user
-- CREATE USER 'creatorx'@'%' IDENTIFIED BY 'creatorx';
-- GRANT ALL ON creatorx.* TO 'creatorx'@'%';
