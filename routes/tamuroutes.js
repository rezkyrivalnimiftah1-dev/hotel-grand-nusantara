const express = require('express');
const router =express.Router();
const tamuController= require('../controllers/tamucontroller');


// --- RUTE PUBLIC (TIDAK PAKAI AUTH) ---
// 1. Ambil semua data
router.get('/', tamuController.getAll); 

// 2. Ambil data by ID (opsional)
router.get('/:id', tamuController.getById); 

// 3. TAMBAH DATA BARU (HAPUS MIDDLEWARE AUTH DISINI)
router.post('/', tamuController.create); // <--- Pastikan 'auth' dan 'validate' dihapus dulu

// 4. Update & Delete (Untuk sementara biarkan pakai auth jika mau)
router.put('/:id', tamuController.update); 
router.delete('/:id', tamuController.remove); 

module.exports = router;