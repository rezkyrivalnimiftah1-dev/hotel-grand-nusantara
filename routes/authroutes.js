const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller.js');
// Endpoint Register
router.post('/register', authController.register);

// Endpoint Login
router.post('/login', authController.login);

module.exports = router;