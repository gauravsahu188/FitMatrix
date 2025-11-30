const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    meals: [{
        mealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' },
        name: String, // Store name for quick access
        calories: Number,
        protein: Number,
        carbs: Number,
        fat: Number,
        type: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'] },
        quantity: { type: Number, default: 1 }
    }],
    workouts: [{
        workoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' },
        title: String, // Store title for quick access
        duration: Number, // in minutes
        caloriesBurned: Number
    }],
    waterIntake: {
        type: Number, // in ml
        default: 0
    }
});

// Compound index to ensure one log per user per day
dailyLogSchema.index({ userId: 1, date: 1 }, { unique: true });

const DailyLog = mongoose.model('DailyLog', dailyLogSchema);
module.exports = DailyLog;
