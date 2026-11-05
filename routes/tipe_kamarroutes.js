
const express = require('express');
const router = express.Router();
const tipe_kamarController = require('../controllers/tipe_kamarcontroller'); // sesuaikan path jika perlu

// --- RUTE PUBLIC (TIDAK PAKAI AUTH) ---
// 1. Ambil semua data
router.get('/', tipe_kamarController.getAll); 

// 2. Ambil data by ID (opsional)
router.get('/:id', tipe_kamarController.getById); 

// 3. TAMBAH DATA BARU (HAPUS MIDDLEWARE AUTH DISINI)
router.post('/', tipe_kamarController.create); // <--- Pastikan 'auth' dan 'validate' dihapus dulu

// 4. Update & Delete (Untuk sementara biarkan pakai auth jika mau)
router.put('/:id', tipe_kamarController.update); 
router.delete('/:id', tipe_kamarController.remove); 

module.exports = router;