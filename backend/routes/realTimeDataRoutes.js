const express = require('express');
const router = express.Router();
const realTimeDataController = require('../controllers/realTimeDataController');

router.get('/', realTimeDataController.getAllRealTimeData);
router.post('/', realTimeDataController.addRealTimeData);

module.exports = router;
