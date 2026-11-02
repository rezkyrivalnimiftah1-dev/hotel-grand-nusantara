// routes/reservasiroutes.js
const express = require('express');
const router = express.Router();
const reservasiController = require('../controllers/reservasicontroller');

// Route untuk POST (Create)
router.post('/', reservasiController.createReservasi);

// Route lainnya (GET, PUT, DELETE) bisa ditambahkan di sini
// router.get('/', reservasiController.getAllReservasi);

module.exports = router;