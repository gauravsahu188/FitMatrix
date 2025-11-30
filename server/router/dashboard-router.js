const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard-controller');

router.route("/stats").get(dashboardController.getDashboardStats);

module.exports = router;
