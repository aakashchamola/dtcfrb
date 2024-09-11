const express = require('express');
const router = express.Router();
const busStopController = require('../controllers/busStopController');

router.get('/', busStopController.getAllBusStops);
router.get('/:id', busStopController.getBusStopById);
router.post('/', busStopController.addBusStop);
router.put('/:id', busStopController.updateBusStop);
router.delete('/:id', busStopController.deleteBusStop);

module.exports = router;
