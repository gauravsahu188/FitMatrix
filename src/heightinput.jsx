import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './index.css';

const HeightInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [unit, setUnit] = useState('cm'); // 'cm' or 'in'
  const [heightCm, setHeightCm] = useState(170); // Default height in cm
  const [feet, setFeet] = useState(5); // Default feet
  const [inches, setInches] = useState(7); // Default inches

  const cmScrollRef = useRef(null);
  const feetScrollRef = useRef(null);
  const inchesScrollRef = useRef(null);

  const itemHeight = 60;

  // Generate arrays for pickers
  const centimeters = Array.from({ length: 151 }, (_, i) => i + 100); // 100-250 cm
  const feetArray = Array.from({ length: 8 }, (_, i) => i + 1); // 1-8 feet
  const inchesArray = Array.from({ length: 12 }, (_, i) => i); // 0-11 inches

  useEffect(() => {
    // Initialize scroll positions
    if (unit === 'cm' && cmScrollRef.current) {
      const initialScroll = (heightCm - 100) * itemHeight;
      cmScrollRef.current.scrollTop = initialScroll;
    } else if (unit === 'in') {
      setTimeout(() => {
        if (feetScrollRef.current) {
          const feetScroll = (feet - 1) * itemHeight;
          feetScrollRef.current.scrollTop = feetScroll;
        }
        if (inchesScrollRef.current) {
          const inchesScroll = inches * itemHeight;
          inchesScrollRef.current.scrollTop = inchesScroll;
        }
      }, 100);
    }
  }, [unit, heightCm, feet, inches]);

  // Convert feet and inches to cm
  const convertToCm = (ft, inch) => {
    return Math.round((ft * 30.48) + (inch * 2.54));
  };

  // Convert cm to feet and inches
  const convertToFeetInches = (cm) => {
    const totalInches = cm / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inch = Math.round(totalInches % 12);
    return { feet: ft, inches: inch };
  };

  const handleCmScroll = () => {
    if (cmScrollRef.current) {
      const scrollTop = cmScrollRef.current.scrollTop;
      const selectedIndex = Math.round(scrollTop / itemHeight);
      const selectedCm = centimeters[selectedIndex];
      if (selectedCm && selectedCm !== heightCm) {
        setHeightCm(selectedCm);
      }
    }
  };

  const handleFeetScroll = () => {
    if (feetScrollRef.current) {
      const scrollTop = feetScrollRef.current.scrollTop;
      const selectedIndex = Math.round(scrollTop / itemHeight);
      const selectedFeet = feetArray[selectedIndex];
      if (selectedFeet && selectedFeet !== feet) {
        setFeet(selectedFeet);
        const newCm = convertToCm(selectedFeet, inches);
        setHeightCm(newCm);
      }
    }
  };

  const handleInchesScroll = () => {
    if (inchesScrollRef.current) {
      const scrollTop = inchesScrollRef.current.scrollTop;
      const selectedIndex = Math.round(scrollTop / itemHeight);
      const selectedInches = inchesArray[selectedIndex];
      if (selectedInches !== undefined && selectedInches !== inches) {
        setInches(selectedInches);
        const newCm = convertToCm(feet, selectedInches);
        setHeightCm(newCm);
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

  const handleDone = () => {
    // TODO: Save height and navigate to next screen
    console.log('Selected height:', unit === 'cm' ? `${heightCm} cm` : `${feet}'${inches}"`);

    navigate('/weightInput', {
      state: {
        ...location.state,
        height: heightCm // Always save in cm for consistency
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

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    if (newUnit === 'in') {
      // Convert cm to feet/inches
      const { feet: ft, inches: inch } = convertToFeetInches(heightCm);
      setFeet(ft);
      setInches(inch);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-dark overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-pattern-height"
              height="100"
              patternTransform="rotate(45)"
              patternUnits="userSpaceOnUse"
              width="100"
            >
              <path d="M50 0V100M0 50H100" stroke="#FFFFFF" strokeWidth="2" />
            </pattern>
          </defs>
          <rect fill="url(#grid-pattern-height)" height="100%" width="100%" />
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
          <div className="h-2 w-2 rounded-full bg-primary"></div>

        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="text-text-primary-dark tracking-tight text-4xl font-bold leading-tight text-center pb-3 pt-6">
            What's your height?
          </h1>
          <p className="text-text-secondary-dark text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
            This helps us create a plan that's right for you.
          </p>
          <div className="h-8"></div>

          {/* Unit Toggle */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => handleUnitChange('cm')}
              className={`px-6 py-2 rounded-2xl font-black text-base transition-all ${unit === 'cm'
                ? 'bg-primary text-background-dark'
                : 'bg-surface-dark text-text-secondary-dark'
                }`}
            >
              Centimeters
            </button>
            <button
              onClick={() => handleUnitChange('in')}
              className={`px-6 py-4 rounded-full font-bold text-base transition-all ${unit === 'in'
                ? 'bg-primary text-background-dark'
                : 'bg-surface-dark text-text-secondary-dark'
                }`}
            >
              Inches
            </button>
          </div>

          {/* Height Picker Wheel(s) */}
          <div className="flex w-full justify-center px-4 py-3">
            {unit === 'cm' ? (
              <div className="relative w-full max-w-xs">

                {/* Picker Container */}
                <div className="relative h-[300px] overflow-hidden rounded-xl border-2 border-surface-dark bg-surface-dark">
                  {/* Selection Indicator */}
                  <div className="absolute left-0 right-0 top-1/2 z-10 h-[60px] -translate-y-1/2 border-y-2 border-primary/30 bg-primary/10 pointer-events-none"></div>

                  {/* Scrollable CM List */}
                  <div
                    ref={cmScrollRef}
                    onScroll={handleCmScroll}
                    onTouchEnd={() => handleScrollEnd(cmScrollRef)}
                    onMouseUp={() => handleScrollEnd(cmScrollRef)}
                    className="h-full overflow-y-scroll scrollbar-hide snap-y snap-mandatory"
                    style={{
                      scrollSnapType: 'y mandatory',
                      scrollPaddingTop: `${itemHeight * 2}px`,
                      paddingTop: `${itemHeight * 2}px`,
                      paddingBottom: `${itemHeight * 2}px`,
                      WebkitOverflowScrolling: 'touch',
                    }}
                  >
                    {centimeters.map((cm) => {
                      const isSelected = cm === heightCm;
                      return (
                        <div
                          key={cm}
                          onClick={() => scrollToValue(cmScrollRef, cm, centimeters)}
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
                            {cm} cm
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
            ) : (
              <div className="relative w-full max-w-md">
                <p className="text-text-secondary-dark flex justify-center text-sm font-bold leading-normal pb-4">
                  Height
                </p>

                {/* Dual Picker Container */}
                <div className="flex gap-4">
                  {/* Feet Picker */}
                  <div className="relative flex-1 h-[300px] overflow-hidden rounded-xl border-2 border-surface-dark bg-surface-dark">
                    <div className="absolute left-0 right-0 top-1/2 z-10 h-[60px] -translate-y-1/2 border-y-2 border-primary/30 bg-primary/10 pointer-events-none"></div>

                    <div
                      ref={feetScrollRef}
                      onScroll={handleFeetScroll}
                      onTouchEnd={() => handleScrollEnd(feetScrollRef)}
                      onMouseUp={() => handleScrollEnd(feetScrollRef)}
                      className="h-full overflow-y-scroll scrollbar-hide snap-y snap-mandatory"
                      style={{
                        scrollSnapType: 'y mandatory',
                        scrollPaddingTop: `${itemHeight * 2}px`,
                        paddingTop: `${itemHeight * 2}px`,
                        paddingBottom: `${itemHeight * 2}px`,
                        WebkitOverflowScrolling: 'touch',
                      }}
                    >
                      {feetArray.map((ft) => {
                        const isSelected = ft === feet;
                        return (
                          <div
                            key={ft}
                            onClick={() => scrollToValue(feetScrollRef, ft, feetArray)}
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
                              {ft}'
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="absolute top-0 left-0 right-0 h-[120px] bg-linear-to-b from-background-dark to-transparent pointer-events-none z-20"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-linear-to-t from-background-dark to-transparent pointer-events-none z-20"></div>
                  </div>

                  {/* Inches Picker */}
                  <div className="relative flex-1 h-[300px] overflow-hidden rounded-xl border-2 border-surface-dark bg-surface-dark">
                    <div className="absolute left-0 right-0 top-1/2 z-10 h-[60px] -translate-y-1/2 border-y-2 border-primary/30 bg-primary/10 pointer-events-none"></div>

                    <div
                      ref={inchesScrollRef}
                      onScroll={handleInchesScroll}
                      onTouchEnd={() => handleScrollEnd(inchesScrollRef)}
                      onMouseUp={() => handleScrollEnd(inchesScrollRef)}
                      className="h-full overflow-y-scroll scrollbar-hide snap-y snap-mandatory"
                      style={{
                        scrollSnapType: 'y mandatory',
                        scrollPaddingTop: `${itemHeight * 2}px`,
                        paddingTop: `${itemHeight * 2}px`,
                        paddingBottom: `${itemHeight * 2}px`,
                        WebkitOverflowScrolling: 'touch',
                      }}
                    >
                      {inchesArray.map((inch) => {
                        const isSelected = inch === inches;
                        return (
                          <div
                            key={inch}
                            onClick={() => scrollToValue(inchesScrollRef, inch, inchesArray)}
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
                              {inch}"
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="absolute top-0 left-0 right-0 h-[120px] bg-linear-to-b from-background-dark to-transparent pointer-events-none z-20"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-linear-to-t from-background-dark to-transparent pointer-events-none z-20"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-auto w-full px-4 pt-8">
          <button
            onClick={handleDone}
            className="flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-[#A855F7] px-5 py-2 text-lg font-bold leading-normal tracking-wide text-white shadow-[0_20px_45px_rgba(168,85,247,0.3)]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeightInput;

