const express = require('express');
const router = express.Router();

// PENTING: Pastikan nama file controller-nya sesuai. 
// Jika file Anda bernama 'authcontroller.js', maka tulisannya harus persis seperti itu.
const authController = require('../controllers/authcontroller'); 

// Definisikan endpoint
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;