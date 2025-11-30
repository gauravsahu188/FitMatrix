import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
const GetStarted01 = () => {
  const navigate = useNavigate();
  const handleCreatePlan = () => {
    // TODO: Add navigation or action
    navigate('/getStarted02');
  };

  const handleLater = () => {
    // TODO: Add navigation or action
    navigate('/sign-up', { state: { authMode: 'login' } });
  };

  const imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBz8-7wu6vram793Rtimud7wETk4XmHXJvmITfpcyD3UJcUel1a3tnqyEIQJyIUPLHc7gx28EhVDfAqpztHq-YbBxW12Fj8InZgk2cxQzt99LYhItDOmPl2pOb-IyBLdBgUbaCb-rXY2UBUHX9Tg_j3nHMH8-X2nZZZ7o_IT82bdmWQnxmYMKC6Xra5hkWw5GEIhBV9VqoOBtcKXtTeEfhxCxFsr4h5OzOdvx8r8THEL0ki2Xlpy1XJ57m4sb-_wnhU6cmpfB5Jb5Bl";

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-hidden">
      <div className="flex flex-col grow justify-between p-6">
        {/* Top section with Image/Illustration */}
        <div className="grow flex items-center justify-center">
          <div className="w-full max-w-sm">
            <div
              className="w-full bg-center bg-no-repeat bg-contain aspect-square"
              data-alt="Stylized illustration of a person planning their workout routine on a digital tablet with charts and icons"
              style={{
                backgroundImage: `url("${imageUrl}")`,
                backgroundSize: 'cover',
                borderRadius: '1.5rem'
              }}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center pt-8">
          <h1 className="text-green-500 tracking-tight text-[32px] font-bold leading-tight text-center">
            FitMatrix: <span className="text-white">Decode Your Path to Peak Health.</span>
          </h1>
        </div>

        {/* Bottom section with CTA and Indicators */}
        <div className="pt-10 pb-4">
          
          <div className="flex flex-col gap-4">
            <button
              onClick={handleCreatePlan}
              className="gradient-button flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-25 px-5 flex-1 text-white text-base font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Create My Plan New User</span>
            </button>
            <button
              onClick={handleLater}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 flex-1 text-[#E0E0E0] text-base font-medium leading-normal"
            >
              <span className="truncate">Already have an account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted01;

