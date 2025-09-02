-- SchoolCred Database Initialization Script

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS schoolcred;
USE schoolcred;

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact VARCHAR(15) NOT NULL,
    image TEXT,
    email_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO schools (name, address, city, state, contact, email_id) VALUES
('St. Mary\'s High School', '123 Education Street', 'Mumbai', 'Maharashtra', '9876543210', 'stmarys@school.com'),
('Delhi Public School', '456 Learning Avenue', 'Delhi', 'Delhi', '9876543211', 'dps@school.com'),
('Kendriya Vidyalaya', '789 Knowledge Road', 'Bangalore', 'Karnataka', '9876543212', 'kv@school.com');

-- Show table structure
DESCRIBE schools;

-- Show sample data
SELECT * FROM schools;
