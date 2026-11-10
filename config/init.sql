-- v-- Hapus atau beri komentar pada baris CREATE DATABASE jika DB sudah dibuat di phpMyAdmin
-- -- CREATE DATABASE IF NOT EXISTS db_hotelgrandnusantara;
-- USE db_hotelgrandnusantara;

-- CREATE TABLE IF NOT EXISTS users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     name VARCHAR(255),
--     password VARCHAR(255) NOT NULL,
--     createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );
//utf8mb4_0900_ai_ci

//======================= NEW DATABASE =======================

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 05, 2026 at 03:10 AM
-- Server version: 8.0.30
-- PHP Version: 8.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- CREATE DATABASE IF NOT EXISTS db_hotelgrandnusantara;
-- USE db_hotelgrandnusantara;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_hotelgrandnusantara`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_user` int NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `role` varchar(30) NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_user`, `username`, `password`, `email`, `role`) VALUES
(1, 'alvin', 'secret123', 'alvin@gmail.com', 'admin'),
(2, 'rezkyr', 'rezk12', 'rezkyr@gmail.com', 'admin'),
(3, 'raka_super', 'super123', 'raka_super@gmail.com', 'super_admin');

-- --------------------------------------------------------

--
-- Table structure for table `kamar`
--

CREATE TABLE `kamar` (
  `id_kamar` int NOT NULL,
  `id_hotel` int NOT NULL,
  `id_tipe_kamar` int NOT NULL,
  `nomor_kamar` varchar(15) NOT NULL,
  `status` enum('tersedia','terisi','maintenance') NOT NULL DEFAULT 'tersedia'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kamar`
--

INSERT INTO `kamar` (`id_kamar`, `id_hotel`, `id_tipe_kamar`, `nomor_kamar`, `status`) VALUES
(1, 1, 1, '101', 'tersedia');

-- --------------------------------------------------------

--
-- Table structure for table `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id_pembayaran` int NOT NULL,
  `id_reservasi` int DEFAULT NULL,
  `metode` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `jumlah_bayar` decimal(10,0) NOT NULL,
  `tanggal_bayar` datetime DEFAULT NULL,
  `status_verifikasi` enum('pending','verified') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pembayaran`
--

INSERT INTO `pembayaran` (`id_pembayaran`, `id_reservasi`, `metode`, `jumlah_bayar`, `tanggal_bayar`, `status_verifikasi`) VALUES
(15, 1, 'transfer', '500000', '2026-11-02 00:00:00', 'verified');

-- --------------------------------------------------------

--
-- Table structure for table `reservasi`
--

CREATE TABLE `reservasi` (
  `id_reservasi` int NOT NULL,
  `id_tamu` int DEFAULT NULL,
  `id_kamar` int DEFAULT NULL,
  `tanggal_check_in` date DEFAULT NULL,
  `tanggal_check_out` date DEFAULT NULL,
  `status_reservasi` enum('pending','confirmed','check_in','check_out','cancelled') NOT NULL DEFAULT 'pending',
  `total_biaya` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reservasi`
--

INSERT INTO `reservasi` (`id_reservasi`, `id_tamu`, `id_kamar`, `tanggal_check_in`, `tanggal_check_out`, `status_reservasi`, `total_biaya`) VALUES
(1, 1, 1, '2026-10-30', '2026-10-31', 'check_out', '5000000'),
(2, 1, 1, '2026-10-30', '2026-10-30', 'check_out', '5000000'),
(3, 2, 2, '2026-11-01', '2026-11-02', 'check_in', '5000000'),
(4, 4, 101, '2026-11-01', '2026-11-05', 'pending', '1500000'),
(5, 5, 1100, '2026-11-02', '2026-11-05', 'pending', '200000'),
(6, 6, 1100, '2026-11-03', '2026-11-05', 'check_in', '2000000');

-- --------------------------------------------------------

--
-- Table structure for table `tamu`
--

CREATE TABLE `tamu` (
  `id_tamu` int NOT NULL,
  `nama_lengkap` varchar(30) DEFAULT NULL,
  `no_identitas` varchar(30) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `no_hp` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tamu`
--

INSERT INTO `tamu` (`id_tamu`, `nama_lengkap`, `no_identitas`, `email`, `no_hp`) VALUES
(2, 'raka dwi', '0001', 'raka@gmail.com', '09895454');

-- --------------------------------------------------------

--
-- Table structure for table `tipe_kamar`
--

CREATE TABLE `tipe_kamar` (
  `id_tipe_kamar` int NOT NULL,
  `nama_tipe` varchar(15) NOT NULL,
  `harga` decimal(10,0) NOT NULL,
  `kapasitas` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tipe_kamar`
--

INSERT INTO `tipe_kamar` (`id_tipe_kamar`, `nama_tipe`, `harga`, `kapasitas`) VALUES
(1, 'standar_room', '500000', 2),
(2, 'standar_room', '500000', 2),
(3, 'standar_room', '500000', 2),
(4, 'standar_room', '500000', 2),
(7, 'standar_room', '500000', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int NOT NULL,
  `nama` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` enum('customer','admin') NOT NULL DEFAULT 'customer',
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama`, `email`, `password`, `role`, `create_at`) VALUES
(1, 'rezky', 'rezky@gmail.com', '$2b$10$dTiaTHwvAh2Yh3q16HOJbum1x5WdIMVU0yINdixY6vpDspd5FtjGS', 'admin', '2026-11-01 00:00:00'),
(3, 'alvin', 'alvin@gmail.com', '$2b$10$LrsMVGZD7YUs/TwHewxwbO3XEShA1YvjVYflZMMk.8j20QE5D1qNO', 'admin', '2026-11-01 00:00:00'),
(7, 'diaz', 'diaz@gmail.com', '$2b$10$BkYjTrZKsAktzquyJ/fxE.lc4xCK4eT7CCnQAwRSTfyPnxIc.j4K.', 'admin', '2026-11-01 14:39:49'),
(9, 'Manusia hebat', 'clever@gmail.com', '$2b$10$AkTpUSBSIM4LeksqkWXlh.fyUVFNgNnbXBTUYifP5sB6ukIieK.jq', 'customer', '2026-11-03 14:08:29'),
(11, 'agus salim', 'agus@gmail.com', '$2b$10$C/uxS/NluKeWfMwgKSV7Yejp4Chvi36IMJpAsx4pIbo0ThEySrzMy', 'customer', '2026-11-03 14:52:57'),
(12, 'Galang Erlangga', 'galang@gmail.com', '$2b$10$GmDQ65tTdBqiD0TxZ4oUWeqmBYbqr5FaKFslFvG3MEoYQ8teLh5L6', 'customer', '2026-11-03 15:05:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `kamar`
--
ALTER TABLE `kamar`
  ADD PRIMARY KEY (`id_kamar`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id_pembayaran`);

--
-- Indexes for table `reservasi`
--
ALTER TABLE `reservasi`
  ADD PRIMARY KEY (`id_reservasi`);

--
-- Indexes for table `tamu`
--
ALTER TABLE `tamu`
  ADD PRIMARY KEY (`id_tamu`);

--
-- Indexes for table `tipe_kamar`
--
ALTER TABLE `tipe_kamar`
  ADD PRIMARY KEY (`id_tipe_kamar`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kamar`
--
ALTER TABLE `kamar`
  MODIFY `id_kamar` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id_pembayaran` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `reservasi`
--
ALTER TABLE `reservasi`
  MODIFY `id_reservasi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tamu`
--
ALTER TABLE `tamu`
  MODIFY `id_tamu` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tipe_kamar`
--
ALTER TABLE `tipe_kamar`
  MODIFY `id_tipe_kamar` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
