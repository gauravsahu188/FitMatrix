const Workout = require("../Models/workout-model");
const DailyLog = require("../Models/daily-log-model");
const User = require("../Models/user-model");
const aiService = require("../utils/ai-service");

const getWorkouts = async (req, res) => {
    try {
        const { level } = req.query;
        let query = {};
        if (level && level !== 'All') {
            query.level = level;
        }
        const workouts = await Workout.find(query);
        res.status(200).json(workouts);
    } catch (error) {
        console.error("Error in getWorkouts:", error);
        res.status(500).send("Server error");
    }
};

const logWorkout = async (req, res) => {
    try {
        const { username, workoutId, duration, title, caloriesBurned: explicitCalories } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        let workoutTitle = "Workout";
        let finalCalories = 0;

        if (workoutId && workoutId !== 'ai-generated') {
            const workout = await Workout.findById(workoutId);
            if (!workout) return res.status(404).json({ message: "Workout not found" });
            workoutTitle = workout.title;
            finalCalories = Math.round((workout.caloriesBurned / workout.duration) * duration);
        } else {
            // Ad-hoc logging (e.g. AI generated)
            workoutTitle = title || "Custom Workout";
            finalCalories = explicitCalories || 0;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let dailyLog = await DailyLog.findOne({ userId: user._id, date: today });

        if (!dailyLog) {
            dailyLog = new DailyLog({ userId: user._id, date: today, workouts: [] });
        }

        dailyLog.workouts.push({
            workoutId: (workoutId && workoutId !== 'ai-generated') ? workoutId : null,
            title: workoutTitle,
            duration: duration,
            caloriesBurned: finalCalories
        });

        await dailyLog.save();

        res.status(200).json({ message: "Workout logged successfully", dailyLog });
    } catch (error) {
        console.error("Error in logWorkout:", error);
        res.status(500).send("Server error");
    }
};



const generateWorkoutPlan = async (req, res) => {
    try {
        const { level, split } = req.body;
        if (!level || !split) {
            return res.status(400).json({ message: "Level and split are required" });
        }

        const workoutPlan = await aiService.generateWorkout(level, split);
        res.status(200).json(workoutPlan);
    } catch (error) {
        console.error("Error in generateWorkoutPlan:", error);
        res.status(500).send("Server error");
    }
};

const getExerciseSummary = async (req, res) => {
    try {
        const { exerciseName } = req.body;
        if (!exerciseName) {
            return res.status(400).json({ message: "Exercise name is required" });
        }

        const summary = await aiService.generateExerciseSummary(exerciseName);
        res.status(200).json({ summary });
    } catch (error) {
        console.error("Error in getExerciseSummary:", error);
        res.status(500).send("Server error");
    }
};

module.exports = { getWorkouts, logWorkout, generateWorkoutPlan, getExerciseSummary };
