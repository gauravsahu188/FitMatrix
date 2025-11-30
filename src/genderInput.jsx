import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCircle } from 'lucide-react';
import './index.css';

const GenderInput = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (selectedGender) {
      // TODO: Save gender selection and navigate to next screen
      console.log('Selected gender:', selectedGender);
      // navigate('/next-screen');
      // navigate('/next-screen');
      navigate('/ageinput', { state: { gender: selectedGender } })
    }
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const getButtonClass = (gender) => {
    const baseClass = "flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors duration-200";
    return selectedGender === gender
      ? `${baseClass} bg-primary`
      : `${baseClass} bg-[#322d34] hover:bg-[#49424d]`;
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
      <div className="relative flex h-screen w-full flex-col group/design-root overflow-hidden  font-display">
        {/* Screen Container */}
        <div className="flex-1 flex flex-col justify-between">

          {/* Top Section */}
          <div>
            {/* Top App Bar */}
            <div className="flex items-center p-4">
              <button
                onClick={handleBack}
                className="text-white flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="text-2xl" />
              </button>
            </div>
            {/* Page Indicators */}
            <div className="flex w-full flex-row items-center justify-center gap-3 py-5">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <div className="h-2 w-2 rounded-full bg-text-secondary-dark/50"></div>

              <div className="h-2 w-2 rounded-full bg-text-secondary-dark/50"></div>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex flex-col items-center">
            {/* Headline Text */}
            <h1 className="text-white tracking-tight text-3xl font-bold leading-tight px-4 text-center pb-8 pt-6">
              Tell us about yourself
            </h1>
            {/* Button Group */}
            <div className="w-full max-w-md px-4">
              <div className="flex flex-col items-stretch gap-4">
                <button
                  onClick={() => handleGenderSelect('male')}
                  className={getButtonClass('male')}
                >
                  <UserCircle className="mr-3" size={24} />
                  <span className="truncate">Male</span>
                </button>
                <button
                  onClick={() => handleGenderSelect('female')}
                  className={getButtonClass('female')}
                >
                  <UserCircle className="mr-3" size={24} />
                  <span className="truncate">Female</span>
                </button>
                <button
                  onClick={() => handleGenderSelect('prefer-not-to-say')}
                  className={getButtonClass('prefer-not-to-say')}
                >
                  <span className="truncate">Prefer not to say</span>
                </button>
              </div>
            </div>
          </div>
          {/* Bottom Section (CTA Button) */}
          <div className="w-full px-4 pt-8 pb-6">
            <button
              onClick={handleNext}
              disabled={!selectedGender}
              className={`flex min-w-[84px] w-full max-w-md mx-auto cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 transition-opacity ${selectedGender
                  ? 'bg-primary opacity-100'
                  : 'bg-primary/50 opacity-50 cursor-not-allowed'
                }`}
            >
              <span className="truncate">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderInput;

