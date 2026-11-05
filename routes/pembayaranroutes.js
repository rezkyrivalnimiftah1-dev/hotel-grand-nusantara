const express = require('express');
const router = express.Router();
const pembayaranController = require('../controllers/pembayarancontroller');

// Import middleware jika Anda ingin memproteksi route (opsional)
// const { verifyToken } = require('../middlewares/auth');

// --- Definisi Route Pembayaran ---

// Create (Tambah Data)
router.post('/', pembayaranController.createPembayaran);

// Read (Ambil Semua Data)
router.get('/', pembayaranController.getAllPembayaran);

// Read (Ambil Data berdasarkan ID)
router.get('/:id', pembayaranController.getPembayaranById);

// Update (Ubah Data)
router.put('/:id', pembayaranController.updatePembayaran);

// Delete (Hapus Data)
router.delete('/:id', pembayaranController.deletePembayaran);

module.exports = router;