CREATE DATABASE IF NOT EXISTS portfolioDemo;
USE portfolioDemo;

-- 2. Personal Info / About Me Table (Single Record Design)
CREATE TABLE IF NOT EXISTS personal_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,              -- e.g. "Full Stack Developer"
    bio TEXT NOT NULL,                        -- Long description / About Me section
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NULL,
    location VARCHAR(100) NULL,        -- e.g. "New York, USA" or "Remote"
    avatar_url VARCHAR(255) NULL,      -- Profile picture
    resume_url VARCHAR(255) NULL,      -- PDF download link
    github_url VARCHAR(255) NULL,
    linkedin_url VARCHAR(255) NULL,
    twitter_url VARCHAR(255) NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

select * from personal_info limit 1;

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS users ( 
     id INT AUTO_INCREMENT PRIMARY KEY, 
     email VARCHAR(100) NOT NULL UNIQUE,
     full_name VARCHAR(100) NOT NULL,
     phone VARCHAR(20) NULL,
     password VARCHAR(255) NOT NULL,
     token varchar(255) NULL,
     is_verified TINYINT(1) DEFAULT 0,
     verification_token VARCHAR(255) DEFAULT NULL,
     verification_expires DATETIME DEFAULT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===================== 04/Sep-2026 ==================
CREATE TABLE IF NOT EXISTS education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_name VARCHAR(150) NOT NULL,        -- University / School name
    degree VARCHAR(150) NOT NULL,             -- e.g. "B.S. in Computer Science"
    field_of_study VARCHAR(100) NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,                       -- NULL means "Present"
    grade VARCHAR(20) NULL,                   -- e.g. "GPA: 3.8/4.0" or "First Class"
    description TEXT NULL,                    -- Relevant coursework, achievements
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
