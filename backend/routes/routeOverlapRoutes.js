const express = require('express');
const router = express.Router();
const routeOverlapController = require('../controllers/routeOverlapController');

router.get('/', routeOverlapController.getAllRouteOverlaps);
router.post('/', routeOverlapController.addRouteOverlap);

module.exports = router;
