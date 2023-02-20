-- Creates Database
CREATE DATABASE JWT_system;

-- Creates Users Table
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    userName VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL
);


INSERT INTO users (userName, userEmail, userPassword) VALUES ('Ishan', 'limbuisan@gmail.com', 'hello123');