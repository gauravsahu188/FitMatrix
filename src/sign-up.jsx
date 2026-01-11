import React, { useState } from 'react';
import { Phone, Lock, Eye, EyeOff, CheckCircle2, User } from 'lucide-react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import './index.css';
import { profile } from './services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import Pattern from './components/BackgroundPattern';

const SignUp = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onboardingData = location.state || {};
  const [authMode, setAuthMode] = useState(onboardingData.authMode || 'signup'); // 'signup' or 'login'
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtp, setshowOtp] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number")
      return
    }
    try {
      const response = await fetch('https://fitmatrix-backend-deployment.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, phonenumber: phoneNumber, password }),
      });
      if (response.ok) {
        // If we have onboarding data, we should probably auto-login or handle it after login
        // For now, just switch to login mode as per existing flow
        setAuthMode('login');
      }

      const data = await response.json();

    } catch (error) {
      console.error('Error during signup:', error);


    }



  };
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://fitmatrix-backend-deployment.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store token if returned, though current backend might not be sending it in this specific response based on previous code. Assuming standard auth flow.

        // Update profile with onboarding data if available
        if (onboardingData.height || onboardingData.weight || onboardingData.age || onboardingData.gender) {
          try {
            await profile.updateProfile(username, {
              height: onboardingData.height,
              weight: onboardingData.weight,
              age: onboardingData.age,
              gender: onboardingData.gender
            });
          } catch (profileError) {
            console.error("Failed to update profile with onboarding data:", profileError);
          }
        }

        navigate('/dashboard', { state: { username } });
      }
      // const data = await response.json(); // Already parsed above if ok

    } catch (error) {
      console.error('Error during login:', error);
    }
  }




  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign in
    console.log('Google sign in clicked');
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple sign in
    console.log('Apple sign in clicked');
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password
    console.log('Forgot password clicked');
  };

  return (
    <div className="relative isolate flex h-auto min-h-screen w-full flex-col items-center group/design-root overflow-x-hidden p-4 bg-background-light dark:bg-background-dark font-display">
      <Pattern />
      {!showOtp ? <div className="w-full max-w-sm mx-auto flex flex-col gap-9 pt-10">
        {/* Logo and Branding */}
        <div className="flex justify-center items-center gap-2  mb-8">
          <CheckCircle2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-gray-100">FitMatrix</span>
        </div>

        {/* Heading */}
        <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight text-center pb-4">
          Create Account
        </h1>

        {/* Auth Mode Toggle */}
        <div className="flex px-0 py-3">
          <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-card-dark p-1">
            <label
              onClick={() => navigate('/getStarted02')}
              className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-colors duration-300 ${authMode === 'signup'
                ? 'bg-primary text-black shadow-[0_0_8px_rgba(175,255,0,0.3)]'
                : 'text-[#8A8A8E]'
                }`}
            >
              <span className="truncate">Sign Up</span>
              <input
                checked={authMode === 'signup'}
                onChange={() => navigate('/getStarted02')}
                className="invisible w-0"
                name="auth-toggle"
                type="radio"
                value="Sign Up"
              />
            </label>
            <label
              onClick={() => setAuthMode('login')}
              className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-colors duration-300 ${authMode === 'login'
                ? 'bg-primary text-black shadow-[0_0_8px_rgba(175,255,0,0.3)]'
                : 'text-[#8A8A8E]'
                }`}
            >
              <span className="truncate">Log In</span>
              <input
                checked={authMode === 'login'}
                onChange={() => setAuthMode('login')}
                className="invisible w-0"
                name="auth-toggle"
                type="radio"
                value="Log In"
              />
            </label>
          </div>
        </div>

        {/* Username Input */}
        <div className="flex w-full flex-wrap items-end gap-4 px-0 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#F5F5F5] text-base font-medium leading-normal pb-2">
              Username
            </p>
            <div className="flex w-full flex-1 items-stretch rounded-xl border border-transparent focus-within:border-primary transition-colors duration-300">
              <div className="text-[#8A8A8E] flex border-none bg-card-dark items-center justify-center pl-4 rounded-l-xl border-r-0">
                <User size={24} />
              </div>
              <input
                className="form-input flex  w-full min-w-0 flex-1 resize-none overflow-hidden text-white focus:outline-0 focus:ring-0 border-none bg-card-dark h-14 placeholder:text-[#8A8A8E]  p-4 text-base font-normal leading-normal"
                placeholder="  Enter your username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </label>
        </div>

        {/* Phone Number Input - Only for Sign Up */}
        {
          authMode === 'signup' && (
            <div className="flex w-full flex-wrap items-end gap-4 px-0 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F5F5F5] text-base font-medium leading-normal pb-2">
                  Phone Number
                </p>
                <div className="flex w-full flex-1 items-stretch rounded-xl border border-transparent focus-within:border-primary transition-colors duration-300">
                  <div className="text-[#8A8A8E] flex border-none bg-card-dark items-center justify-center pl-4 rounded-l-xl border-r-0">
                    <Phone size={24} />
                  </div>
                  <input
                    className="form-input flex  w-full min-w-0 flex-1 resize-none overflow-hidden text-white focus:outline-0 focus:ring-0 border-none bg-card-dark h-14 placeholder:text-[#8A8A8E]  p-4 text-base font-normal leading-normal"
                    placeholder="  Enter your phone number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </label>
            </div>
          )
        }

        {/* Password Input */}
        <div className="flex w-full flex-wrap items-end gap-4 px-0 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#F5F5F5] text-base font-medium leading-normal pb-2">
              Password
            </p>
            <div className="flex w-full flex-1 items-stretch rounded-xl border border-transparent focus-within:border-primary transition-colors duration-300">
              <div className="text-[#8A8A8E] flex border-none bg-card-dark items-center justify-center pl-4 rounded-l-xl border-r-0">
                <Lock size={24} />
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-white focus:outline-0 focus:ring-0 border-none bg-card-dark h-14 placeholder:text-[#8A8A8E] p-4 text-base font-normal leading-normal"
                placeholder="  Enter your password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="text-[#8A8A8E] flex border-none bg-card-dark items-center justify-center pr-4 rounded-r-xl border-l-0 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </div>
            </div>
          </label>
        </div>

        {/* Forgot Password */}
        {
          authMode === 'login' && (
            <div className="w-full flex justify-end">
              <p
                className="text-[#8A8A8E] text-sm font-normal leading-normal pb-3 pt-1 px-0 underline cursor-pointer hover:text-primary transition-colors"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </p>
            </div>
          )
        }

        {
          authMode === 'signup' && (
            <div className="w-full px-0 py-3">
              <button
                onClick={handleSignup}
                className="w-full h-14 rounded-xl bg-primary text-black text-lg font-bold hover:opacity-90 transition-opacity"
              >
                SignUp
              </button>
            </div>)
        }
        {
          authMode === 'login' && (
            <div className="w-full px-0 py-3">
              <button
                onClick={handlelogin}
                className="w-full h-14 rounded-xl bg-primary text-black text-lg font-bold hover:opacity-90 transition-opacity"
              >
                Login
              </button>
            </div>)
        }

        {/* Terms and Privacy */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#8A8A8E]">
            By continuing, you agree to our{' '}
            <a
              className="underline text-[#F5F5F5] hover:text-primary"
              href="#"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              className="underline text-[#F5F5F5] hover:text-primary"
              href="#"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div > :
        <div>
          <OtpInput phoneNumber={phoneNumber} />
        </div>}
    </div >
  );
};

export default SignUp;
