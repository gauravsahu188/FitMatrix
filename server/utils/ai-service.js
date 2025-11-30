const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateMealInfo = async (mealName) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.warn("GEMINI_API_KEY is missing. Using fallback data.");
            throw new Error("API Key missing");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Generate a JSON object for a meal named "${mealName}". 
    The JSON should have the following fields:
    - name: The name of the meal (string)
    - calories: Estimated calories (number)
    - protein: Estimated protein in grams (number)
    - carbs: Estimated carbohydrates in grams (number)
    - fat: Estimated fat in grams (number)
    - type: One of "Breakfast", "Lunch", "Dinner", "Snack" (string) based on when it's usually eaten.
    - image: A placeholder image URL for this food (string, use a generic food placeholder like "https://placehold.co/600x400?text=${encodeURIComponent(mealName)}")

    Return ONLY the JSON object, no markdown formatting or extra text.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown formatting if the model adds it
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error generating meal info:", error.message);
        // Fallback to basic data if AI fails
        return {
            name: mealName,
            calories: 200,
            protein: 10,
            carbs: 20,
            fat: 5,
            type: 'Snack',
            image: `https://placehold.co/600x400?text=${encodeURIComponent(mealName)}`
        };
    }
};

module.exports = { generateMealInfo };

const fs = require('fs');
const path = require('path');

const generateWorkout = async (level, split) => {
    try {
        // Load static workouts from JSON file
        const workoutDataPath = path.join(__dirname, '../workout.json');

        if (fs.existsSync(workoutDataPath)) {
            const workoutData = JSON.parse(fs.readFileSync(workoutDataPath, 'utf8'));

            // Find matching workout
            const matchedWorkout = workoutData.find(w =>
                w.level === level && w.title.toLowerCase().includes(split.toLowerCase())
            );

            if (matchedWorkout) {
                return matchedWorkout;
            }
        }

        // Fallback if file doesn't exist or no match found (though file should exist now)
        console.warn("Static workout not found, falling back to basic default.");
        return {
        };
    } catch (error) {
        console.error("Error generating workout:", error);
        // Fallback
        return {
            title: `${split} Workout`,
            description: `A basic ${split} workout for ${level} level.`,
            level: level,
            duration: 45,
            caloriesBurned: 300,
            exercises: [
                { name: "Push Ups", sets: 3, reps: "10", duration: 5, calories: 30 },
                { name: "Squats", sets: 3, reps: "15", duration: 5, calories: 40 }
            ]
        };
    }
};

const generateExerciseSummary = async (exerciseName) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("API Key missing");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Act as an expert biomechanics coach and personal trainer. Please generate a structured summary for the following exercise: "${exerciseName}".
        Include:
        1. Target Muscles
        2. Proper Form/Technique
        3. Common Mistakes
        4. Benefits
        Return the result in Markdown format.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating exercise summary:", error);
        return "Summary unavailable at the moment.";
    }
};

module.exports = { generateMealInfo, generateWorkout, generateExerciseSummary };
