// routes/kamarroutes.js
const express = require('express');
const router = express.Router();
const kamarController = require('../controllers/kamarcontroller');

// Endpoint POST
router.post('/', kamarController.createKamar);

module.exports = router;