import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://fitmatrix-backend-deployment.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const auth = {
    signup: (data) => api.post('/auth/signup', data),
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
};

export const profile = {
    getProfile: (username) => api.get(`/profile/${username}`),
    updateProfile: (username, data) => api.put(`/profile/${username}`, data),
};

export const workout = {
    getWorkouts: (level) => api.get(`/workout?level=${level || 'All'}`),
    logWorkout: (data) => api.post('/workout/log', data),
    generateWorkout: (data) => api.post('/workout/generate', data),
    getExerciseSummary: (data) => api.post('/workout/summary', data),
};

export const diet = {
    logMeal: (data) => api.post('/diet/log', data),
    getDietSummary: (username) => api.get(`/diet/today?username=${username}`),
    generateMeal: (mealName) => api.post('/diet/generate', { mealName }),
};

export const dashboard = {
    getStats: (username) => api.get(`/dashboard/stats?username=${username}`),
};

export default api;
