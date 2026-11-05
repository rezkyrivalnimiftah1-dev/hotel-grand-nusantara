// 

//=============== INI ADALAH CODE BARU . YANG ATAS ADALAH CODE LAMA. SAMA SAMA BENAR TIDAK ADA ERR.
//  HANYA MENAMBHAKAN 2 ENDPOINT YANG BARU. 1. POST /api/reservasi 2. GET /api/reservasi/user/:userId

// routes/reservasiroutes.js
const express = require('express');
const router = express.Router();
const reservasiController = require('../controllers/reservasicontroller');

// Endpoint POST untuk membuat reservasi baru
router.post('/', reservasiController.createReservasi);

// Endpoint GET untuk mengambil reservasi berdasarkan ID User/Tamu
router.get('/user/:userId', reservasiController.getReservasiByUser);

module.exports = router;