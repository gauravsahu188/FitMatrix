# FitMatrix - AI-Powered Fitness & Nutrition Companion

FitMatrix is a comprehensive web application designed to be your personal AI fitness coach and nutritionist. It leverages the power of Google's Gemini AI to provide personalized workout summaries and detailed nutritional information, making fitness accessible and data-driven for everyone.

## 🚀 Key Features

### 1. AI-Powered Workout Generator
*   **Smart Planning**: Generates structured workout plans based on your fitness level (Beginner, Intermediate, Advanced) and preferred split (Push/Pull/Legs, Upper/Lower, etc.).
*   **AI Exercise Summaries**: Uses **Google Gemini 2.5 Flash** to provide expert-level biomechanics breakdowns, form guides, and common mistakes for any exercise on demand.
*   **Visual Tracking**: Interactive progress bars and completion tracking for every session.

### 2. Intelligent Diet Tracker
*   **AI Nutritionist**: Simply type the name of a meal (e.g., "Chicken Caesar Salad"), and our AI engine instantly calculates estimated calories, protein, carbs, and fats.
*   **Visuals**: Automatically generates placeholder visualizations for logged meals.
*   **Daily Logs**: Tracks your daily caloric intake against your personalized goals.

### 3. Interactive Dashboard
*   **Real-Time Stats**: View your "Calories Burned" vs. "Calories Consumed" at a glance.
*   **Progress Visualization**: Beautiful charts and graphs to visualize your fitness journey.
*   **Gamification**: Track your workout streaks and consistency.

### 4. User Onboarding & Personalization
*   **Custom Profile**: Collects vital stats (Age, Gender, Height, Weight) to tailor fitness goals.
*   **Goal Setting**: Set daily calorie targets and workout frequency goals.

---

## 🛠️ Technical Architecture

### Frontend
*   **Framework**: React.js (Vite)
*   **Styling**: Tailwind CSS (Custom dark mode design system)
*   **Icons**: Lucide React
*   **Routing**: React Router DOM

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (via Mongoose)
*   **AI Integration**: Google Generative AI SDK (`@google/generative-ai`)

### Database Schema
*   **Users**: Stores profile data, goals, and authentication info.
*   **DailyLogs**: Tracks workouts completed and meals consumed per day.
*   **Workouts**: Stores structured workout plans (Static JSON + AI enhancements).

---

## 🤖 AI Integration Explained

FitMatrix uses a hybrid approach for reliability and intelligence:

1.  **Workout Generation**:
    *   Core workout structures are retrieved from a curated `workout.json` database to ensure safe and effective programming.
    *   **AI Enhancement**: When a user clicks "AI Summary" for an exercise, the backend calls the **Gemini API** to generate a real-time, detailed guide on form and benefits.

2.  **Diet Tracking**:
    *   Completely AI-driven. When a user logs a meal, the system sends a prompt to Gemini: *"Generate a JSON object for a meal named [Meal Name] with calories, macros, and type."*
    *   The AI returns structured JSON data which is then stored in the user's daily log.

**Code Reference**: `server/utils/ai-service.js`

---

## 🔌 API Routes

The backend exposes the following RESTful endpoints:

### Authentication (`/api/auth`)
*   `POST /signup`: Create a new user account.
*   `POST /login`: Authenticate user and receive JWT.

### Workouts (`/api/workout`)
*   `POST /generate`: Get a workout plan based on level/split.
*   `POST /log`: Log a completed workout or exercise.
*   `POST /summary`: **(AI)** Fetch an exercise summary from Gemini.

### Diet (`/api/diet`)
*   `POST /log`: Log a meal to the daily record.
*   `POST /generate`: **(AI)** Generate nutrition info for a meal name.
*   `GET /today`: Get all meals for the current day.

### Profile & Dashboard
*   `GET /profile/:username`: Fetch user profile and goals.
*   `GET /dashboard/stats`: Get aggregated stats for the dashboard.

---

## 🏁 Getting Started

1.  **Clone the repository**
2.  **Install Dependencies**:
    ```bash
    npm install
    cd server && npm install
    ```
3.  **Environment Setup**:
    *   Create a `.env` file in `server/` with:
        *   `MONGO_URI`: Your MongoDB connection string.
        *   `GEMINI_API_KEY`: Your Google Gemini API Key.
        *   `JWT_SECRET`: Secret for authentication.
4.  **Run the App**:
    *   Frontend: `npm run dev`
    *   Backend: `node server/server.js`

---

## 📸 Presentation Notes
*   **Highlight**: Show the "AI Summary" feature in the workout card to demonstrate real-time AI generation.
*   **Demo**: Log a complex meal name in the Diet section to show the AI's ability to estimate macros.
