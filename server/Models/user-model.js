const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    height: {
        type: Number, // in cm
        default: 0
    },
    weight: {
        type: Number, // in kg
        default: 0
    },
    age: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', ''],
        default: ''
    },
    activityLevel: {
        type: String,
        enum: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extra Active', ''],
        default: ''
    },
    goals: {
        targetCalories: { type: Number, default: 2000 },
        targetWeight: { type: Number, default: 0 },
        weeklyWorkouts: { type: Number, default: 3 }
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;