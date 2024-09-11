const express = require('express');
const router = express.Router();
const crewController = require('../controllers/crewContoller');

// Define the routes
router.get('/', crewController.getAllCrew);
router.post('/', crewController.addCrew);
router.get('/:id', crewController.getCrewById);
router.put('/:id', crewController.updateCrew);
router.delete('/:id', crewController.deleteCrew);

module.exports = router;
