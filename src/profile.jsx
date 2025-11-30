import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Edit,
    Flame,
    Dumbbell,
    Crown,
    Bell,
    LogOut,
    ChevronRight,
    LayoutDashboard,
    UtensilsCrossed,
    User
} from 'lucide-react';

import { profile, auth } from './services/api';
import { useEffect, useState } from 'react';


const Profile = () => {
    const navigate = useNavigate();
    const { username } = useLocation().state || { username: 'Alex Johnson' };
    const [userProfile, setUserProfile] = useState({
        height: 0,
        weight: 0,
        age: 0,
        goals: {
            targetCalories: 2000,
            targetWeight: 0,
            weeklyWorkouts: 3
        }
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            if (username && username !== 'Guest') {
                try {
                    const response = await profile.getProfile(username);
                    setUserProfile(response.data);
                    setEditForm(response.data);
                } catch (error) {
                    console.error("Failed to fetch profile:", error);
                }
            }
        };
        fetchProfile();
    }, [username]);

    const handleUpdateProfile = async () => {
        try {
            const response = await profile.updateProfile(username, editForm);
            setUserProfile(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            // Attempt server-side logout if needed, but don't block navigation
            // await auth.logout(); 
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            navigate('/');
        }
    };

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex w-full flex-col font-display text-text-primary-dark gap-10">

            {/* Header */}
            <div className="flex items-center justify-between p-6">
                <h1 className="text-3xl font-bold text-text-primary-dark">Profile</h1>
                <button
                    onClick={() => isEditing ? handleUpdateProfile() : setIsEditing(true)}
                    className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-bold text-background-dark hover:bg-primary/90 transition-colors"
                >
                    <Edit size={18} />
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col items-center gap-4 p-6">
                <div className="relative">
                    <img
                        alt="User profile picture"
                        className="h-28 w-28 rounded-full object-cover border-4 border-card-dark"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPp7E9FLX3J695OrEfwkTHR0zs8Ih-DZ331UIh0VPQAgU48WNeYhS-IGB2llf3MftGGVjLMJ3N7EYaDp_9nSodjJhFhaGNP17c7ih_nqHb-JaiGbEAg45xJsaMkZGUNz6lHx05Et1tGIj02lldAm169vuZp_TWqkQl0wxq1YlhgNFtNzlevjg5ge9VJibQCrWTcL5Zhlzr5Uepyxj9BM6yfoT025AgiZOCZm2-8uLx3YHs6LlctVTfq7P-etwR-s_lYEWrAjLhPg9b"
                    />
                    <span className="absolute bottom-1 right-1 block h-5 w-5 rounded-full border-2 border-background-dark bg-primary"></span>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-text-primary-dark">{username}</h2>
                    <p className="text-sm text-text-secondary-dark">{username}.j@fitmatrix.com</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="flex justify-around  items-center gap-4 p-6">
                <div className="flex flex-col items-center rounded-2xl bg-card-dark p-6 shadow-sm border border-white/5">
                    {isEditing ? (
                        <input
                            type="number"
                            name="height"
                            value={editForm.height || ''}
                            onChange={handleChange}
                            className="w-full bg-transparent text-center text-xl font-bold text-text-primary-dark border-b border-primary focus:outline-none"
                        />
                    ) : (
                        <p className="text-xl font-bold text-text-primary-dark">{userProfile.height || 0}cm</p>
                    )}
                    <p className="text-xs text-text-secondary-dark font-medium">Height</p>
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-card-dark p-4 shadow-sm border border-white/5">
                    {isEditing ? (
                        <input
                            type="number"
                            name="weight"
                            value={editForm.weight || ''}
                            onChange={handleChange}
                            className="w-full bg-transparent text-center text-xl font-bold text-text-primary-dark border-b border-primary focus:outline-none"
                        />
                    ) : (
                        <p className="text-xl font-bold text-text-primary-dark">{userProfile.weight || 0}kg</p>
                    )}
                    <p className="text-xs text-text-secondary-dark font-medium">Weight</p>
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-card-dark p-4 shadow-sm border border-white/5">
                    {isEditing ? (
                        <input
                            type="number"
                            name="age"
                            value={editForm.age || ''}
                            onChange={handleChange}
                            className="w-full bg-transparent text-center text-xl font-bold text-text-primary-dark border-b border-primary focus:outline-none"
                        />
                    ) : (
                        <p className="text-xl font-bold text-text-primary-dark">{userProfile.age || 0}yr</p>
                    )}
                    <p className="text-xs text-text-secondary-dark font-medium">Age</p>
                </div>
            </div>

            {/* Settings Sections */}
            <div className="flex flex-col gap-5 px-6">
                {/* Subscription */}


                {/* Settings */}
                <div className="rounded-3xl bg-card-dark p-5 shadow-sm border border-white/5">
                    <div className="flex align-center justify-between">

                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center text-red-500 w-full group hover:text-red-400 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-red-500/10 p-2 group-hover:bg-red-500/20 transition-colors">
                                    <LogOut size={20} />
                                </div>
                                <span className="font-medium">Logout</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Profile;
