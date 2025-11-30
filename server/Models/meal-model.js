const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number, // in grams
        required: true
    },
    carbs: {
        type: Number, // in grams
        required: true
    },
    fat: {
        type: Number, // in grams
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
        default: 'Snack'
    }
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;
