import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './index.css';

const AgeInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [age, setAge] = useState(25); // Default age
  const scrollContainerRef = useRef(null);
  const itemHeight = 60; // Height of each age item in pixels
  const visibleItems = 5; // Number of visible items

  // Generate age array (1-100)
  const ages = Array.from({ length: 100 }, (_, i) => i + 1);

  useEffect(() => {
    // Initialize scroll position to default age
    if (scrollContainerRef.current) {
      const initialScroll = (age - 1) * itemHeight;
      scrollContainerRef.current.scrollTop = initialScroll;
    }
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      const selectedIndex = Math.round(scrollTop / itemHeight);
      const selectedAge = ages[selectedIndex];
      if (selectedAge && selectedAge !== age) {
        setAge(selectedAge);
      }
    }
  };

  const handleScrollEnd = () => {
    // Snap to nearest age when scrolling ends
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      const selectedIndex = Math.round(scrollTop / itemHeight);
      const targetScroll = selectedIndex * itemHeight;
      scrollContainerRef.current.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (age && parseInt(age) > 0) {
      // TODO: Save age and navigate to next screen
      console.log('Selected age:', age);
      // navigate('/next-screen');
      // navigate('/next-screen');
      navigate('/heightinput', { state: { ...location.state, age } })
    }
  };

  const scrollToAge = (targetAge) => {
    if (scrollContainerRef.current) {
      const targetIndex = ages.indexOf(targetAge);
      if (targetIndex !== -1) {
        const targetScroll = targetIndex * itemHeight;
        scrollContainerRef.current.scrollTo({
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
              id="grid-pattern"
              height="100"
              patternTransform="rotate(45)"
              patternUnits="userSpaceOnUse"
              width="100"
            >
              <path d="M50 0V100M0 50H100" stroke="#FFFFFF" strokeWidth="2" />
            </pattern>
          </defs>
          <rect fill="url(#grid-pattern)" height="100%" width="100%" />
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
          <div className="h-2 w-2 rounded-full bg-primary"></div>
          <div className="h-2 w-2 rounded-full bg-text-secondary-dark/50"></div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="text-text-primary-dark tracking-tight text-4xl font-bold leading-tight text-center pb-3 pt-6">
            What's your age?
          </h1>
          <p className="text-text-secondary-dark text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
            This helps us create a plan that's right for you.
          </p>
          <div className="h-8"></div>

          {/* Age Picker Wheel */}
          <div className="flex w-full justify-center px-4 py-3">
            <div className="relative w-full max-w-xs">
              <p className="text-text-secondary-dark flex justify-center text-sm font-bold leading-normal pb-4">
                Age
              </p>

              {/* Picker Container */}
              <div className="relative h-[300px] overflow-hidden rounded-xl border-2 border-surface-dark bg-surface-dark">
                {/* Selection Indicator */}
                <div className="absolute left-0 right-0 top-1/2 z-10 h-[60px] -translate-y-1/2 border-y-2 border-primary/30 bg-primary/10 pointer-events-none"></div>

                {/* Scrollable Age List */}
                <div
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  onTouchEnd={handleScrollEnd}
                  onMouseUp={handleScrollEnd}
                  className="h-full overflow-y-scroll scrollbar-hide snap-y snap-mandatory"
                  style={{
                    scrollSnapType: 'y mandatory',
                    scrollPaddingTop: `${itemHeight * 2}px`,
                    paddingTop: `${itemHeight * 2}px`,
                    paddingBottom: `${itemHeight * 2}px`,
                    WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
                  }}
                >
                  {ages.map((ageOption) => {
                    const isSelected = ageOption === age;
                    return (
                      <div
                        key={ageOption}
                        onClick={() => scrollToAge(ageOption)}
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
                          {ageOption}
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
            disabled={!age || parseInt(age) <= 0}
            className="flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-[#A855F7] px-5 py-2 text-lg font-bold leading-normal tracking-wide text-white shadow-[0_20px_45px_rgba(168,85,247,0.3)]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeInput;

