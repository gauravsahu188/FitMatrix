const express = require('express');
const router = express.Router();
const dietController = require('../controllers/diet-controller');

router.post('/log', dietController.logMeal);
router.get('/today', dietController.getDietSummary);
router.post('/generate', dietController.generateMeal);

module.exports = router;
