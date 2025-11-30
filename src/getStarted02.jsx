import React from 'react'; 
import './index.css';
import { Goal } from 'lucide-react';
import {  useNavigate } from 'react-router-dom';


const GetStarted02 = () => {
  const navigate = useNavigate();
  const btnhandeler = ()=>{
    console.log("btn clicked")
    navigate('/genderInput');
  }
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#121212] p-6 text-white">
      <div className="flex flex-1 flex-col items-center justify-between text-center">
        <div className="grow" />
        <div className="flex w-full max-w-sm flex-col items-center">
          <div className="mb-12 flex h-48 w-48 items-center justify-center rounded-full bg-linear-to-br from-[#A855F7]/20 via-[#FBBF24]/10 to-transparent p-4">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-800/50">
              <span className="material-symbols-outlined text-8xl text-[#FBBF24]">
                <Goal className='size-35'> </Goal>
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Set Fitness Goals
          </h1>
          <p className="mt-4 text-base font-normal leading-relaxed text-slate-300">
            Define your targets to stay motivated. Whether it&apos;s strength, endurance, or wellness,
            clear goals pave the way to success.
          </p>
        </div>
        <div className="grow" />
        <div className="w-full max-w-sm">
          <div className="flex w-full flex-row items-center justify-center gap-2.5 py-5">
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <div className="h-2 w-5 rounded-full bg-[#A855F7]" />
            <div className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          <div className="py-3">
            <button onClick={btnhandeler} className="flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-[#A855F7] px-5 text-lg font-bold leading-normal tracking-wide text-white shadow-[0_20px_45px_rgba(168,85,247,0.3)]">
              <span className="truncate">Get Started</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted02;
