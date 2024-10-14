CREATE DATABASE sql_injection;

USE sql_injection;

CREATE TABLE users (
    username VARCHAR(50) NOT NULL,
    bio TEXT,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
);

INSERT INTO users (username, bio, password) VALUES
('Someone', 'I am a teacher lol', 'dsaojfdsaf9089sad'),
('Admin', 'An admin', 'shebani'),
('Bob', 'A student', '9876fdsa9876dsfa'),
('Shebani', 'A nobody', 'lvkjfesar98qy3rv'),
('Me', 'Just someone', 'hjlkdfhsa908fuq234r');