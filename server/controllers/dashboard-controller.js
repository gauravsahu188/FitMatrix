const DailyLog = require("../Models/daily-log-model");
const User = require("../Models/user-model");

const getDashboardStats = async (req, res) => {
    try {
        const { username } = req.query;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dailyLog = await DailyLog.findOne({ userId: user._id, date: today });

        let stats = {
            caloriesConsumed: 0,
            workoutProgress: 0, // Percentage
            caloriesBurned: 0,
            level: user.activityLevel || 'Beginner', // Placeholder logic
            streak: 1 // Placeholder logic
        };

        if (dailyLog) {
            // Calculate calories
            if (dailyLog.meals) {
                dailyLog.meals.forEach(meal => {
                    stats.caloriesConsumed += meal.calories;
                });
            }

            // Calculate workout progress (simple logic: 1 workout = 100% for now, or based on goal)
            if (dailyLog.workouts && dailyLog.workouts.length > 0) {
                stats.workoutProgress = Math.min(100, (dailyLog.workouts.length / user.goals.weeklyWorkouts) * 100); // Simplified daily progress
                // Or if daily goal is 1 workout:
                stats.workoutProgress = 100;

                // Calculate burned calories
                dailyLog.workouts.forEach(workout => {
                    stats.caloriesBurned += (workout.caloriesBurned || 0);
                });
            }
        }

        res.status(200).json(stats);
    } catch (error) {
        console.error("Error in getDashboardStats:", error);
        res.status(500).send("Server error");
    }
};

module.exports = { getDashboardStats };
