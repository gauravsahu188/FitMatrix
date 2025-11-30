import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './index.css';

const WeightInput = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { gender, age, height } = location.state || {};

    const [unit, setUnit] = useState('kg'); // 'kg' or 'lbs'
    const [weightKg, setWeightKg] = useState(70); // Default weight in kg
    const [weightLbs, setWeightLbs] = useState(154); // Default weight in lbs

    const kgScrollRef = useRef(null);
    const lbsScrollRef = useRef(null);

    const itemHeight = 60;

    // Generate arrays for pickers
    const kilograms = Array.from({ length: 151 }, (_, i) => i + 30); // 30-180 kg
    const pounds = Array.from({ length: 331 }, (_, i) => i + 66); // 66-396 lbs

    useEffect(() => {
        // Initialize scroll positions
        if (unit === 'kg' && kgScrollRef.current) {
            const initialScroll = (weightKg - 30) * itemHeight;
            kgScrollRef.current.scrollTop = initialScroll;
        } else if (unit === 'lbs' && lbsScrollRef.current) {
            const initialScroll = (weightLbs - 66) * itemHeight;
            lbsScrollRef.current.scrollTop = initialScroll;
        }
    }, [unit, weightKg, weightLbs]);

    const handleKgScroll = () => {
        if (kgScrollRef.current) {
            const scrollTop = kgScrollRef.current.scrollTop;
            const selectedIndex = Math.round(scrollTop / itemHeight);
            const selectedKg = kilograms[selectedIndex];
            if (selectedKg && selectedKg !== weightKg) {
                setWeightKg(selectedKg);
                setWeightLbs(Math.round(selectedKg * 2.20462));
            }
        }
    };

    const handleLbsScroll = () => {
        if (lbsScrollRef.current) {
            const scrollTop = lbsScrollRef.current.scrollTop;
            const selectedIndex = Math.round(scrollTop / itemHeight);
            const selectedLbs = pounds[selectedIndex];
            if (selectedLbs && selectedLbs !== weightLbs) {
                setWeightLbs(selectedLbs);
                setWeightKg(Math.round(selectedLbs / 2.20462));
            }
        }
    };

    const handleScrollEnd = (ref) => {
        if (ref.current) {
            const scrollTop = ref.current.scrollTop;
            const selectedIndex = Math.round(scrollTop / itemHeight);
            const targetScroll = selectedIndex * itemHeight;
            ref.current.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleNext = () => {
        // Navigate to SignUp with all collected data
        navigate('/sign-up', {
            state: {
                gender,
                age,
                height,
                weight: weightKg // Always save in kg for consistency
            }
        });
    };

    const scrollToValue = (ref, value, array) => {
        if (ref.current) {
            const targetIndex = array.indexOf(value);
            if (targetIndex !== -1) {
                const targetScroll = targetIndex * itemHeight;
                ref.current.scrollTo({
                    top: targetScroll,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-dark overflow-x-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10">
                <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern
                            id="grid-pattern-weight"
                            height="100"
                            patternTransform="rotate(45)"
                            patternUnits="userSpaceOnUse"
                            width="100"
                        >
                            <path d="M50 0V100M0 50H100" stroke="#FFFFFF" strokeWidth="2" />
                        </pattern>
                    </defs>
                    <rect fill="url(#grid-pattern-weight)" height="100%" width="100%" />
                </svg>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex h-full min-h-screen flex-col px-4 pt-4 pb-8">
                {/* Top App Bar */}
                <div className="flex items-center justify-between pb-2">
                    <button
                        onClick={handleBack}
                        className="text-text-primary-dark flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="text-2xl" />
                    </button>
                </div>

                {/* Page Indicators */}
                <div className="flex w-full flex-row items-center justify-center gap-3 py-5">
                    <div className="h-2 w-2 rounded-full bg-text-secondary-dark/50"></div>
                    <div className="h-2 w-2 rounded-full bg-text-secondary-dark/50"></div>
                    <div className="h-2 w-2 rounded-full bg-text-secondary-dark/50"></div>
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 flex-col justify-center">
                    <h1 className="text-text-primary-dark tracking-tight text-4xl font-bold leading-tight text-center pb-3 pt-6">
                        What's your weight?
                    </h1>
                    <p className="text-text-secondary-dark text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
                        This helps us create a plan that's right for you.
                    </p>
                    <div className="h-8"></div>

                    {/* Unit Toggle */}
                    <div className="flex justify-center gap-4 mb-6">
                        <button
                            onClick={() => setUnit('kg')}
                            className={`px-6 py-2 rounded-2xl font-black text-base transition-all ${unit === 'kg'
                                    ? 'bg-primary text-background-dark'
                                    : 'bg-surface-dark text-text-secondary-dark'
                                }`}
                        >
                            kg
                        </button>
                        <button
                            onClick={() => setUnit('lbs')}
                            className={`px-6 py-4 rounded-full font-bold text-base transition-all ${unit === 'lbs'
                                    ? 'bg-primary text-background-dark'
                                    : 'bg-surface-dark text-text-secondary-dark'
                                }`}
                        >
                            lbs
                        </button>
                    </div>

                    {/* Weight Picker Wheel */}
                    <div className="flex w-full justify-center px-4 py-3">
                        <div className="relative w-full max-w-xs">

                            {/* Picker Container */}
                            <div className="relative h-[300px] overflow-hidden rounded-xl border-2 border-surface-dark bg-surface-dark">
                                {/* Selection Indicator */}
                                <div className="absolute left-0 right-0 top-1/2 z-10 h-[60px] -translate-y-1/2 border-y-2 border-primary/30 bg-primary/10 pointer-events-none"></div>

                                {/* Scrollable List */}
                                <div
                                    ref={unit === 'kg' ? kgScrollRef : lbsScrollRef}
                                    onScroll={unit === 'kg' ? handleKgScroll : handleLbsScroll}
                                    onTouchEnd={() => handleScrollEnd(unit === 'kg' ? kgScrollRef : lbsScrollRef)}
                                    onMouseUp={() => handleScrollEnd(unit === 'kg' ? kgScrollRef : lbsScrollRef)}
                                    className="h-full overflow-y-scroll scrollbar-hide snap-y snap-mandatory"
                                    style={{
                                        scrollSnapType: 'y mandatory',
                                        scrollPaddingTop: `${itemHeight * 2}px`,
                                        paddingTop: `${itemHeight * 2}px`,
                                        paddingBottom: `${itemHeight * 2}px`,
                                        WebkitOverflowScrolling: 'touch',
                                    }}
                                >
                                    {(unit === 'kg' ? kilograms : pounds).map((val) => {
                                        const isSelected = val === (unit === 'kg' ? weightKg : weightLbs);
                                        return (
                                            <div
                                                key={val}
                                                onClick={() => scrollToValue(unit === 'kg' ? kgScrollRef : lbsScrollRef, val, unit === 'kg' ? kilograms : pounds)}
                                                className="flex h-[60px] cursor-pointer items-center justify-center snap-start transition-all duration-200"
                                                style={{
                                                    scrollSnapAlign: 'start',
                                                }}
                                            >
                                                <span
                                                    className={`text-center font-medium transition-all duration-200 ${isSelected
                                                            ? 'text-4xl font-bold text-text-primary-dark scale-110'
                                                            : 'text-2xl text-text-secondary-dark scale-100'
                                                        }`}
                                                >
                                                    {val} {unit}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Gradient Fade Effects */}
                                <div className="absolute top-0 left-0 right-0 h-[120px] bg-linear-to-b from-background-dark to-transparent pointer-events-none z-20"></div>
                                <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-linear-to-t from-background-dark to-transparent pointer-events-none z-20"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-auto w-full px-4 pt-8">
                    <button
                        onClick={handleNext}
                        className="flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-[#A855F7] px-5 py-2 text-lg font-bold leading-normal tracking-wide text-white shadow-[0_20px_45px_rgba(168,85,247,0.3)]"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WeightInput;
