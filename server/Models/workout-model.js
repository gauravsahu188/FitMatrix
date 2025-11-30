const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Pro'],
        required: true
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    caloriesBurned: {
        type: Number,
        required: true
    },
    image: {
        type: String, // URL to image/SVG
        default: ''
    },
    exercises: [{
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: String, required: true }, // String to allow ranges like "10-12"
        videoUrl: { type: String }
    }]
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
