import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Settings,
    Plus,
    Utensils,
    Coffee,
    Croissant,
    Soup,
    LayoutDashboard,
    Dumbbell,
    UtensilsCrossed,
    User
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import { diet } from './services/api';
import { useEffect, useState } from 'react';


const DietPlan = () => {
    const navigate = useNavigate();
    const { username } = useLocation().state || { username: 'Guest' };
    const [summary, setSummary] = useState({
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        meals: []
    });
    const [mealInput, setMealInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedMeal, setGeneratedMeal] = useState(null);

    useEffect(() => {
        const fetchDietSummary = async () => {
            if (username && username !== 'Guest') {
                try {
                    const response = await diet.getDietSummary(username);
                    setSummary(response.data);
                } catch (error) {
                    console.error("Failed to fetch diet summary:", error);
                }
            }
        };
        fetchDietSummary();
    }, [username]);

    const handleGenerateMeal = async () => {
        if (!mealInput.trim()) return;
        setIsGenerating(true);
        try {
            const response = await diet.generateMeal(mealInput);
            setGeneratedMeal(response.data);
        } catch (error) {
            console.error("Failed to generate meal:", error);
            alert("Could not generate meal info. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleConfirmLog = async () => {
        if (username && username !== 'Guest' && generatedMeal) {
            try {
                const mealData = {
                    username,
                    ...generatedMeal
                };
                await diet.logMeal(mealData);
                setMealInput('');
                setGeneratedMeal(null);
                // Refresh summary
                const response = await diet.getDietSummary(username);
                setSummary(response.data);
            } catch (error) {
                console.error("Failed to log meal:", error);
            }
        } else {
            alert("Please log in to track meals.");
        }
    };

    const caloriesData = [
        { name: 'Consumed', value: summary.totalCalories },
        { name: 'Remaining', value: Math.max(0, 2400 - summary.totalCalories) },
    ];
    const COLORS = ['#39FF14', '#333'];

    return (
        <div className="flex w-full flex-col font-display text-text-primary-dark gap-5">

            {/* Header */}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-text-primary-dark">Diet Track</h1>
                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-card-dark text-text-primary-dark hover:bg-card-dark/80 transition-colors">
                        <Settings size={24} />
                    </button>
                </div>
            </div>

            {/* Calories Card */}
            <div className="px-6 mb-8">
                <div className="rounded-3xl bg-card-dark p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-sm font-medium text-text-secondary-dark mb-1">Today's Calories</p>
                            <p className="text-3xl font-bold text-text-primary-dark">{summary.totalCalories} <span className="text-lg font-normal text-text-secondary-dark">/ 2,400 kcal</span></p>
                        </div>
                        <div className="relative h-24 w-24">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={caloriesData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={36}
                                        outerRadius={45}
                                        startAngle={90}
                                        endAngle={-270}
                                        dataKey="value"
                                        stroke="none"
                                        cornerRadius={10}
                                    >
                                        {caloriesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-bold text-text-primary-dark">{Math.round((summary.totalCalories / 2400) * 100)}%</span>
                                <span className="text-[10px] text-text-secondary-dark uppercase tracking-wider">Goal</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center border-t border-white/5 pt-4">
                        <div>
                            <p className="text-xs text-text-secondary-dark mb-1">Carbs</p>
                            <p className="font-bold text-text-primary-dark">{summary.totalCarbs}<span className="text-xs font-normal text-text-secondary-dark">/180g</span></p>
                            <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-blue-400 rounded-full" style={{ width: `${Math.min(100, (summary.totalCarbs / 180) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-text-secondary-dark mb-1">Protein</p>
                            <p className="font-bold text-text-primary-dark">{summary.totalProtein}<span className="text-xs font-normal text-text-secondary-dark">/180g</span></p>
                            <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, (summary.totalProtein / 180) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-text-secondary-dark mb-1">Fat</p>
                            <p className="font-bold text-text-primary-dark">{summary.totalFat}<span className="text-xs font-normal text-text-secondary-dark">/80g</span></p>
                            <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${Math.min(100, (summary.totalFat / 80) * 100)}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Log Meal */} <br />
            <div className="px-6 mb-8">
                <h2 className="text-xl font-bold text-text-primary-dark mb-4">Add Your Meal</h2>
                <br />
                {!generatedMeal ? (
                    <div className="rounded-2xl bg-card-dark p-2 pl-4 flex items-center gap-3 shadow-sm border border-white/5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Utensils size={20} />
                        </div>
                        <input
                            className="grow bg-transparent border-none text-text-primary-dark placeholder-text-secondary-dark focus:ring-0 text-sm"
                            placeholder="e.g., Grilled Chicken Salad"
                            type="text"
                            value={mealInput}
                            onChange={(e) => setMealInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleGenerateMeal()}
                            disabled={isGenerating}
                        />
                        <button
                            onClick={handleGenerateMeal}
                            disabled={isGenerating || !mealInput.trim()}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-background-dark hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-background-dark border-t-transparent" />
                            ) : (
                                <Plus size={24} />
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="rounded-2xl bg-card-dark p-4 shadow-sm border border-primary/50 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-text-primary-dark">{generatedMeal.name}</h3>
                                <p className="text-xs text-text-secondary-dark capitalize">{generatedMeal.type}</p>
                            </div>
                            <button onClick={() => setGeneratedMeal(null)} className="text-text-secondary-dark hover:text-white">
                                <Plus size={20} className="rotate-45" />
                            </button>
                        </div>

                        <div className="grid grid-cols-4 gap-2 mb-4">
                            <div className="text-center p-2 rounded-xl bg-background-dark/50">
                                <p className="text-xs text-text-secondary-dark">Cals</p>
                                <p className="font-bold text-text-primary-dark">{generatedMeal.calories}</p>
                            </div>
                            <div className="text-center p-2 rounded-xl bg-background-dark/50">
                                <p className="text-xs text-text-secondary-dark">Prot</p>
                                <p className="font-bold text-text-primary-dark">{generatedMeal.protein}g</p>
                            </div>
                            <div className="text-center p-2 rounded-xl bg-background-dark/50">
                                <p className="text-xs text-text-secondary-dark">Carbs</p>
                                <p className="font-bold text-text-primary-dark">{generatedMeal.carbs}g</p>
                            </div>
                            <div className="text-center p-2 rounded-xl bg-background-dark/50">
                                <p className="text-xs text-text-secondary-dark">Fat</p>
                                <p className="font-bold text-text-primary-dark">{generatedMeal.fat}g</p>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirmLog}
                            className="w-full py-3 rounded-xl bg-primary text-background-dark font-bold hover:bg-primary/90 transition-colors"
                        >
                            Confirm & Log Meal
                        </button>
                    </div>
                )}
            </div>

            {/* Today's Meals */}
            <div className="px-6 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xl font-bold text-text-primary-dark">Today's Meals</h2>
                    <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">See All</button>
                </div>

                {summary.meals.length > 0 ? (
                    summary.meals.map((meal, index) => (
                        <div key={index} className="rounded-2xl bg-card-dark p-4 flex items-center gap-4 hover:bg-card-dark/80 transition-colors cursor-pointer group border border-white/5 shadow-sm">
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary`}>
                                <Utensils size={24} />
                            </div>
                            <div className="grow">
                                <p className="font-bold text-text-primary-dark group-hover:text-primary transition-colors">{meal.name}</p>
                                <p className="text-sm text-text-secondary-dark">{meal.type}</p>
                            </div>
                            <p className="font-bold text-text-secondary-dark">{meal.calories} <span className="text-xs font-normal">kcal</span></p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-text-secondary-dark">No meals logged today.</p>
                )}
            </div>


        </div>
    );
};

export default DietPlan;
