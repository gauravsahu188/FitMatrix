import React, { useState } from 'react';
import { Menu, X, Dumbbell, UtensilsCrossed, LogOut, LayoutDashboard, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const { username } = useLocation().state || { username: 'Guest' };
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleNavigation = (path) => {
        navigate(path, { state: { username } });
        setIsSidebarOpen(false);
    };

    return (
        <>
            <header className="fixed top-0 left-0 z-30 w-full bg-background-dark/95 backdrop-blur-xl border-b border-card-dark px-4 h-16 flex items-center justify-between">
                <button
                    onClick={toggleSidebar}
                    className="text-text-primary-dark hover:text-primary transition-colors"
                >
                    <Menu size={24} />
                </button>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-text-secondary-dark uppercase tracking-wider">Welcome Back</p>
                        <p className="text-sm font-bold text-text-primary-dark">{username}</p>
                    </div>
                    <div
                        className="relative cursor-pointer"
                        onClick={() => navigate('/profile', { state: { username } })}
                    >
                        <img
                            alt="User profile"
                            className="h-10 w-10 rounded-full object-cover border-2 border-card-dark"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPp7E9FLX3J695OrEfwkTHR0zs8Ih-DZ331UIh0VPQAgU48WNeYhS-IGB2llf3MftGGVjLMJ3N7EYaDp_9nSodjJhFhaGNP17c7ih_nqHb-JaiGbEAg45xJsaMkZGUNz6lHx05Et1tGIj02lldAm169vuZp_TWqkQl0wxq1YlhgNFtNzlevjg5ge9VJibQCrWTcL5Zhlzr5Uepyxj9BM6yfoT025AgiZOCZm2-8uLx3YHs6LlctVTfq7P-etwR-s_lYEWrAjLhPg9b"
                        />
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-background-dark bg-primary"></span>
                    </div>
                </div>
            </header>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 z-50 h-full w-1/2 bg-card-dark border-r border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex items-center justify-between border-b border-white/5 h-16">
                    <h2 className="text-xl font-bold text-text-primary-dark">Menu</h2>
                    <button
                        onClick={toggleSidebar}
                        className="text-text-secondary-dark hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-4 flex flex-col gap-2">
                    <button
                        onClick={() => handleNavigation('/dashboard')}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-text-primary-dark transition-colors text-left"
                    >
                        <LayoutDashboard size={20} className="text-primary" />
                        <span className="font-medium">Dashboard</span>
                    </button>

                    <button
                        onClick={() => handleNavigation('/workout')}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-text-primary-dark transition-colors text-left"
                    >
                        <Dumbbell size={20} className="text-primary" />
                        <span className="font-medium">Workout</span>
                    </button>

                    <button
                        onClick={() => handleNavigation('/diet-plan')}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-text-primary-dark transition-colors text-left"
                    >
                        <UtensilsCrossed size={20} className="text-primary" />
                        <span className="font-medium">Diet Plan</span>
                    </button>

                    <button
                        onClick={() => handleNavigation('/profile')}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-text-primary-dark transition-colors text-left"
                    >
                        <User size={20} className="text-primary" />
                        <span className="font-medium">Profile</span>
                    </button>

                    <div className="h-px bg-white/5 my-2" />

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-colors text-left"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Header;
