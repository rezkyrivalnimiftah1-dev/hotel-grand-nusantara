v-- Hapus atau beri komentar pada baris CREATE DATABASE jika DB sudah dibuat di phpMyAdmin
-- CREATE DATABASE IF NOT EXISTS db_hotelgrandnusantara;
USE db_hotelgrandnusantara;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);