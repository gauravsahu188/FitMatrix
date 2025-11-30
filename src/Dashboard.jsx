import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import {
  Flame,
  CheckCircle2,
  TrendingUp,
  Calendar,
  LayoutDashboard,
  Dumbbell,
  UtensilsCrossed,
  User
} from 'lucide-react';

import { dashboard } from './services/api';
import { useEffect, useState } from 'react';



const Dashboard = () => {
  const navigate = useNavigate();
  const { username } = useLocation().state || { username: 'Guest' };

  const [stats, setStats] = useState({
    caloriesConsumed: 0,
    workoutProgress: 0,
    level: 'Beginner',
    streak: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (username && username !== 'Guest') {
        try {
          const response = await dashboard.getStats(username);
          setStats(response.data);
        } catch (error) {
          console.error("Failed to fetch dashboard stats:", error);
        }
      }
    };
    fetchStats();
  }, [username]);

  // Data for charts (using real stats where possible, or keeping dummy for visual structure if backend doesn't provide detailed history yet)
  const caloriesData = [
    { name: '1', value: 5 },
    { name: '2', value: 45 },
    { name: '3', value: 25 },
    { name: '4', value: 50 },
    { name: '5', value: 35 },
  ];

  const daysData = [
    { name: '1', value: 5 },
    { name: '2', value: 45 },
    { name: '3', value: 30 },
    { name: '4', value: 40 },
    { name: '5', value: 15 },
    { name: '6', value: 25 },
    { name: '7', value: 10 },
  ];

  const workoutData = [
    { name: 'Completed', value: stats.workoutProgress },
    { name: 'Remaining', value: 100 - stats.workoutProgress },
  ];

  const COLORS = {
    primary: '#39FF14',
    gray: '#374151',
  };

  return (
    <div className="flex w-full flex-col font-display text-text-primary-dark gap-3">

      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg text-text-secondary-dark">Hello !</p>
            <h1 className="text-2xl font-bold text-text-primary-dark">{`${username}`}</h1>
          </div>
          {/* Profile image removed as it is in the global header now */}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Calories */}
        <div className="flex flex-col gap-4 rounded-xl bg-card-dark p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Flame size={18} />
            </div>
            <p className="text-sm font-medium text-text-secondary-dark">Calories</p>
          </div>
          <p className="text-2xl font-bold">
            {stats.caloriesConsumed} <span className="text-base font-normal text-text-secondary-dark">kcal</span>
          </p>
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={caloriesData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={COLORS.primary}
                  strokeWidth={4}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Burned Calories */}
        <div className="flex flex-col gap-4 rounded-xl bg-card-dark p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Flame size={18} />
            </div>
            <p className="text-sm font-medium text-text-secondary-dark">Burned</p>
          </div>
          <p className="text-2xl font-bold">
            {stats.caloriesBurned} <span className="text-base font-normal text-text-secondary-dark">kcal</span>
          </p>
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={caloriesData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={COLORS.primary}
                  strokeWidth={4}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workout */}
        <div className="flex flex-col gap-4 rounded-xl bg-card-dark p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <CheckCircle2 size={18} />
            </div>
            <p className="text-sm font-medium text-text-secondary-dark">Workout</p>
          </div>
          <p className="text-2xl font-bold">{Math.round(stats.workoutProgress)}%</p>
          <div className="relative h-16 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={workoutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={32}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={COLORS.primary} />
                  <Cell fill={COLORS.gray} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Level */}
        <div className="flex flex-col gap-4 rounded-xl bg-card-dark p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <TrendingUp size={18} />
            </div>
            <p className="text-sm font-medium text-text-secondary-dark">Level</p>
          </div>
          <p className="text-2xl font-bold">{stats.level}</p>
          <div className="flex h-16 w-full items-end gap-1">
            <div className="h-1/4 w-1/5 rounded-t-sm bg-primary/30"></div>
            <div className="h-2/4 w-1/5 rounded-t-sm bg-primary/50"></div>
            <div className="h-3/4 w-1/5 rounded-t-sm bg-primary/70"></div>
            <div className="h-full w-1/5 rounded-t-sm bg-primary"></div>
            <div className="h-1/4 w-1/5 rounded-t-sm bg-gray-700"></div>
          </div>
        </div>

        {/* Days */}
        <div className="flex flex-col gap-4 rounded-xl bg-card-dark p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Calendar size={18} />
            </div>
            <p className="text-sm font-medium text-text-secondary-dark">Days</p>
          </div>
          <p className="text-2xl font-bold">{stats.streak}</p>
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={daysData}>
                <Line
                  type="linear"
                  dataKey="value"
                  stroke={COLORS.primary}
                  strokeWidth={4}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
