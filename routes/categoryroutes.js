// const express = require('express');
// const router = express.Router();
// const categoryController = require('../controllers/categorycontroller');
// // const auth = require('../midlewares/auth');
// // const { validateCategoryCreate, validateCategoryUpdate } = require('../midlewares/validation');


// // --- TAMBAHKAN KODE TES DI SINI ---
// router.get('/', (req, res) => {
//     console.log("Route /api/category BERHASIL DIAKSES!"); 
//     res.json({ message: "Tes route berhasil" });          
// });

// router.get('/', categoryController.getAll);            // public
// router.get('/:id', categoryController.getById);        // public
// router.post('/',  categoryController.create); // protected
// router.put('/:id',  categoryController.update); // protected
// router.delete('/:id',  categoryController.remove); // protected

// module.exports = router;
//     //Di dalam categoryroutes.js

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categorycontroller'); // sesuaikan path jika perlu

// --- RUTE PUBLIC (TIDAK PAKAI AUTH) ---
// 1. Ambil semua data
router.get('/', categoryController.getAll); 

// 2. Ambil data by ID (opsional)
router.get('/:id', categoryController.getById); 

// 3. TAMBAH DATA BARU (HAPUS MIDDLEWARE AUTH DISINI)
router.post('/', categoryController.create); // <--- Pastikan 'auth' dan 'validate' dihapus dulu

// 4. Update & Delete (Untuk sementara biarkan pakai auth jika mau)
router.put('/:id', categoryController.update); 
router.delete('/:id', categoryController.remove); 

module.exports = router;