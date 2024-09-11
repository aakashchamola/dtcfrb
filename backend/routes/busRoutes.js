const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');

router.get('/all', busController.getAllBuses);
router.get('/busId', busController.getBusById);
router.post('/add', busController.addBus);
router.put('/update', busController.updateBus);
router.delete('/delete', busController.deleteBus);

module.exports = router;
