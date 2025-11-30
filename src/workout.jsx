import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Search,
    Play,
    LayoutDashboard,
    Dumbbell,
    UtensilsCrossed,
    User,
    BrainCircuit,
    X,
    Loader,
    CheckCircle2
} from 'lucide-react';

import { workout } from './services/api';
import { useEffect, useState } from 'react';


const Workout = () => {
    const navigate = useNavigate();
    const { username } = useLocation().state || { username: 'Guest' };
    const [workouts, setWorkouts] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState('Beginner');
    const [selectedSplit, setSelectedSplit] = useState('Push');
    const [loading, setLoading] = useState(false);
    const [generatedWorkout, setGeneratedWorkout] = useState(null);
    const [activeExercise, setActiveExercise] = useState(null);
    const [progress, setProgress] = useState(0);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [summaryContent, setSummaryContent] = useState('');
    const [summaryLoading, setSummaryLoading] = useState(false);

    const [completedExercises, setCompletedExercises] = useState([]);

    useEffect(() => {
        // Initial fetch if needed, or just rely on generation
    }, []);

    const handleGenerateWorkout = async () => {
        setLoading(true);
        try {
            const response = await workout.generateWorkout({
                level: selectedLevel,
                split: selectedSplit
            });
            setGeneratedWorkout(response.data);
            setCompletedExercises([]); // Reset completed exercises on new generation
        } catch (error) {
            console.error("Failed to generate workout:", error);
            alert("Failed to generate workout. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleStartExercise = (exercise, index) => {
        setActiveExercise({ ...exercise, index });
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    handleCompleteExercise(exercise);
                    return 100;
                }
                return prev + (100 / (exercise.duration * 60 * 10)); // Update every 100ms
            });
        }, 100);
    };

    const handleCompleteExercise = async (exercise) => {
        setActiveExercise(null);
        setCompletedExercises(prev => [...prev, exercise]);

        if (username && username !== 'Guest') {
            try {
                await workout.logWorkout({
                    username,
                    workoutId: generatedWorkout._id || 'ai-generated',
                    duration: exercise.duration,
                    title: generatedWorkout.title,
                    caloriesBurned: exercise.calories
                });
            } catch (error) {
                console.error("Failed to log exercise:", error);
            }
        }
    };

    const handleShowSummary = async (exerciseName) => {
        setShowSummaryModal(true);
        setSummaryLoading(true);
        try {
            const response = await workout.getExerciseSummary({
                exerciseName
            });
            setSummaryContent(response.data.summary);
        } catch (error) {
            console.error("Failed to fetch summary:", error);
            setSummaryContent("Failed to load summary.");
        } finally {
            setSummaryLoading(false);
        }
    };

    return (
        <div className="flex w-full flex-col font-display text-text-primary-dark gap-5">

            {/* Header */}
            <div className="p-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-text-primary-dark">Workout</h1>
                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-card-dark text-text-primary-dark hover:bg-card-dark/80 transition-colors">
                        <Search size={24} />
                    </button>
                </div>
            </div>

            {/* AI Workout Generator */}
            {/* AI Workout Generator */}
            <div className="px-6 mb-8">
                <div className="rounded-2xl bg-card-dark p-8 shadow-xl border border-white/5 mt-10 transition-all duration-300 hover:shadow-2xl hover:border-white/10 hover:-translate-y-1">
                    <h2 className="text-2xl font-bold text-text-primary-dark mb-8 flex items-center gap-4">
                        <BrainCircuit className="text-primary w-10 h-10" />
                        AI Workout Generator
                    </h2>

                    <div className="space-y-8">
                        <div>
                            <label className="text-lg text-text-secondary-dark mb-4 block font-medium">Level</label>
                            <div className="flex gap-4">
                                {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                                    <button
                                        key={level}
                                        onClick={() => setSelectedLevel(level)}
                                        className={`flex-1 py-5 rounded-2xl text-base font-bold transition-all duration-200 ${selectedLevel === level ? 'bg-primary text-background-dark shadow-lg shadow-primary/25 scale-105' : 'bg-background-dark text-text-secondary-dark hover:bg-white/5'}`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-lg text-text-secondary-dark mb-4 block font-medium">Split</label>
                            <div className="flex gap-4">
                                {['Push', 'Pull', 'Legs'].map(split => (
                                    <button
                                        key={split}
                                        onClick={() => setSelectedSplit(split)}
                                        className={`flex-1 py-5 rounded-2xl text-base font-bold transition-all duration-200 ${selectedSplit === split ? 'bg-primary text-background-dark shadow-lg shadow-primary/25 scale-105' : 'bg-background-dark text-text-secondary-dark hover:bg-white/5'}`}
                                    >
                                        {split}
                                    </button>
                                ))}
                            </div><br />
                            <div>                            </div>
                        </div>

                        <button
                            onClick={handleGenerateWorkout}
                            disabled={loading}
                            className="w-full py-5 mt-12 rounded-2xl bg-primary text-background-dark text-xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95"
                        >
                            {loading ? <Loader className="animate-spin w-7 h-7" /> : 'Generate Workout'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Generated Workout */}
            {generatedWorkout && (
                <div className="px-6 mb-12">
                    <h3 className="text-2xl font-bold text-text-primary-dark mb-6">{generatedWorkout.title}</h3>
                    <div className="flex flex-col gap-2">
                        {generatedWorkout.exercises.map((exercise, index) => {
                            const isCompleted = completedExercises.some(e => e.name === exercise.name);
                            return (
                                <div key={index} className={`rounded-3xl bg-card-dark p-6 border border-white/5 ${isCompleted ? 'opacity-50' : ''}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-xl font-bold text-text-primary-dark mb-1">{exercise.name}</h4>
                                            <p className="text-base text-text-secondary-dark">{exercise.sets} sets • {exercise.reps} reps</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-base font-bold text-primary">{exercise.duration} min</p>
                                            <p className="text-sm text-text-secondary-dark">{exercise.calories} kcal</p>
                                        </div>
                                    </div>

                                    {activeExercise?.name === exercise.name ? (
                                        <div className="w-full bg-background-dark rounded-full h-3 mb-5">
                                            <div
                                                className="bg-primary h-3 rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(57,255,20,0.5)]"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    ) : null}

                                    <div className="flex gap-4">
                                        {!isCompleted ? (
                                            <button
                                                onClick={() => handleStartExercise(exercise, index)}
                                                disabled={activeExercise !== null}
                                                className="flex-1 py-3 rounded-xl bg-primary/20 text-primary font-bold text-base hover:bg-primary/30 transition-colors disabled:opacity-50"
                                            >
                                                {activeExercise?.name === exercise.name ? 'In Progress...' : 'Start'}
                                            </button>
                                        ) : (
                                            <div className="flex-1 py-3 rounded-xl bg-green-500/20 text-green-500 font-bold text-base flex items-center justify-center gap-2">
                                                Completed
                                            </div>
                                        )}
                                        <button
                                            onClick={() => handleShowSummary(exercise.name)}
                                            className="flex-1 py-3 rounded-xl bg-background-dark text-text-secondary-dark font-bold text-base hover:text-white transition-colors"
                                        >
                                            AI Summary
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Completed Exercises Section */}
            {completedExercises.length > 0 && (
                <div className="px-6 mb-28">
                    <h3 className="text-2xl font-bold text-text-primary-dark mb-6">Completed Exercises</h3>
                    <div className="flex flex-col gap-6">
                        {completedExercises.map((exercise, index) => (
                            <div key={index} className="rounded-3xl bg-card-dark p-6 border border-green-500/20 shadow-lg shadow-green-900/10">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="text-lg font-bold text-text-primary-dark mb-1">{exercise.name}</h4>
                                        <p className="text-sm text-text-secondary-dark">{exercise.calories} kcal burned</p>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                        <CheckCircle2 size={22} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Summary Modal */}
            {showSummaryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-3xl bg-card-dark p-6 shadow-2xl border border-white/10 max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-text-primary-dark">Exercise Summary</h3>
                            <button onClick={() => setShowSummaryModal(false)} className="text-text-secondary-dark hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        {summaryLoading ? (
                            <div className="flex justify-center py-8">
                                <Loader className="animate-spin text-primary" size={32} />
                            </div>
                        ) : (
                            <div className="prose prose-invert prose-sm max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: summaryContent.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </div>
                        )}
                    </div>
                </div>
            )}


        </div>
    );
};

export default Workout;
