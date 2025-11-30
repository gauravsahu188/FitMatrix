import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GetStarted01 from './getStarted01.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard.jsx' // TODO: Add Dashboard component     
import AppLayout from './components/AppLayout.jsx'
import GetStarted02 from './getStarted02.jsx'
import NotFound from './NotFound.jsx'
import GenderInput from './genderInput.jsx'
import AgeInput from './ageinput.jsx'
import HeightInput from './heightinput.jsx'
import WeightInput from './WeightInput.jsx'
import SignUp from './sign-up.jsx'
import Workout from './workout.jsx'
import DietPlan from './dietplan.jsx'
import Profile from './profile.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<GetStarted01 />} />
      <Route path="/getStarted02" element={<GetStarted02 />} />
      <Route path='/genderInput' element={<GenderInput />} />
      <Route path='/ageInput' element={<AgeInput />} />
      <Route path='/heightInput' element={<HeightInput />} />
      <Route path='/weightInput' element={<WeightInput />} />
      <Route path='/sign-up' element={<SignUp />} />

      {/* App Layout Routes */}
      <Route element={<AppLayout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/diet-plan" element={<DietPlan />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter >
);