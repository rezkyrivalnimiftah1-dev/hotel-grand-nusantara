const express = require('express');
const router = express.Router();
const laporanController = require('../controllers/laporancontroller');

router.get('/pembayaran', laporanController.getLaporanPembayaran);

module.exports = router;