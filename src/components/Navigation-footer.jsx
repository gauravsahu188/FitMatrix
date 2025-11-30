import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    LayoutDashboard,
    Dumbbell,
    UtensilsCrossed,
    User
} from 'lucide-react'
import { useLocation } from 'react-router-dom'


const NavigationFooter = () => {
    const navigate = useNavigate();
    const { username } = useLocation().state || { username: 'Guest' };
    return (
        <nav className="fixed bottom-0 left-0 z-10 w-full border-t border-card-dark bg-background-dark/95 backdrop-blur-xl pb-safe">
            <div className="mx-auto grid h-20 max-w-lg grid-cols-4 px-6 font-medium">
                <button
                    className="inline-flex flex-col items-center justify-center px-2 text-text-secondary-dark hover:text-white transition-colors gap-1 active:text-primary"
                    onClick={() => navigate('/dashboard', { state: { username } })}
                >
                    <LayoutDashboard size={26} />
                    <span className="text-[10px] font-medium">Dashboard</span>
                </button>
                <button
                    className="inline-flex flex-col items-center justify-center px-2 text-text-secondary-dark hover:text-white transition-colors gap-1 active:text-primary"
                    onClick={() => navigate('/workout', { state: { username } })}
                >
                    <Dumbbell size={26} />
                    <span className="text-[10px] font-medium">Workout</span>
                </button>
                <button
                    className="inline-flex flex-col items-center justify-center px-2 text-text-secondary-dark gap-1 active:text-primary"
                    onClick={() => navigate('/diet-plan', { state: { username } })}
                >
                    <UtensilsCrossed size={26} />
                    <span className="text-[10px] font-medium">DietTrack</span>
                </button>
                <button
                    className="inline-flex flex-col items-center justify-center px-2 text-text-secondary-dark hover:text-white transition-colors gap-1 active:text-primary  "
                    onClick={() => navigate('/profile', { state: { username } })}
                >
                    <User size={26} />
                    <span className="text-[10px] font-medium">Profile</span>
                </button>
            </div>
        </nav>
    )
}

export default NavigationFooter