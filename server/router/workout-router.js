const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workout-controller');

router.route("/").get(workoutController.getWorkouts);
router.route("/log").post(workoutController.logWorkout);
router.route("/generate").post(workoutController.generateWorkoutPlan);
router.route("/summary").post(workoutController.getExerciseSummary);

module.exports = router;
