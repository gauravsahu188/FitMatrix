const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile-controller');

router.route("/:username").get(profileController.getProfile);
router.route("/:username").put(profileController.updateProfile);

module.exports = router;
