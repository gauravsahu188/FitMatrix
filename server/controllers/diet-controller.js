const Meal = require("../Models/meal-model");
const DailyLog = require("../Models/daily-log-model");
const User = require("../Models/user-model");
const aiService = require('../utils/ai-service');

const logMeal = async (req, res) => {
    try {
        const { username, name, calories, protein, carbs, fat, type } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let dailyLog = await DailyLog.findOne({ userId: user._id, date: today });

        if (!dailyLog) {
            dailyLog = new DailyLog({ userId: user._id, date: today, meals: [] });
        }

        dailyLog.meals.push({
            name,
            calories: Number(calories),
            protein: Number(protein),
            carbs: Number(carbs),
            fat: Number(fat),
            type
        });

        await dailyLog.save();

        res.status(200).json({ message: "Meal logged successfully", dailyLog });
    } catch (error) {
        console.error("Error in logMeal:", error);
        res.status(500).send("Server error");
    }
};

const getDietSummary = async (req, res) => {
    try {
        const { username } = req.query;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dailyLog = await DailyLog.findOne({ userId: user._id, date: today });

        let summary = {
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFat: 0,
            meals: []
        };

        if (dailyLog && dailyLog.meals) {
            summary.meals = dailyLog.meals;
            dailyLog.meals.forEach(meal => {
                summary.totalCalories += meal.calories;
                summary.totalProtein += meal.protein;
                summary.totalCarbs += meal.carbs;
                summary.totalFat += meal.fat;
            });
        }

        res.status(200).json(summary);
    } catch (error) {
        console.error("Error in getDietSummary:", error);
        res.status(500).send("Server error");
    }
};

const generateMeal = async (req, res) => {
    try {
        const { mealName } = req.body;
        if (!mealName) {
            return res.status(400).json({ message: "Meal name is required" });
        }
        const mealInfo = await aiService.generateMealInfo(mealName);
        res.status(200).json(mealInfo);
    } catch (error) {
        console.error("Error generating meal:", error);
        res.status(500).json({ message: "Failed to generate meal info" });
    }
};

module.exports = { logMeal, getDietSummary, generateMeal };
