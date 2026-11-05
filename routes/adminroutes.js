const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');

router.post('/', adminController.createAdmin);
router.get('/', adminController.getAllAdmin);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;