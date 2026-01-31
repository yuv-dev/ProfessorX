import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Trophy, UserCheck, Flame } from "lucide-react";

// Custom hook for number animation
const useAnimatedCounter = (targetValue) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrameId;
    const start = count; // Start from the current value
    const duration = 1500; // ms
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const current = Math.min(
        Math.ceil(start + (targetValue - start) * (progress / duration)),
        targetValue
      );
      setCount(current);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetValue]);

  return count;
};

const StatCard = ({ icon, label, value, color, delay }) => {
  const animatedValue = useAnimatedCounter(value);

  return (
    <motion.div
      className="bg-gray-50 p-5 rounded-lg flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ delay }}
    >
      <div className={`p-3 rounded-lg ${color.bg}`}>
        {React.cloneElement(icon, { className: `h-6 w-6 ${color.text}` })}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <span className="text-2xl font-bold text-gray-800">{animatedValue}</span>
      </div>
    </motion.div>
  );
};

const Stats = ({ stats }) => {
  const {
    totalModulesCompleted = 0,
    totalCoursesCompleted = 0,
    loginCount = 0,
    longestStreak = 0,
  } = stats;

  const statItems = [
    {
      label: "Modules Completed",
      value: totalModulesCompleted,
      icon: <BookOpen />,
      color: { bg: "bg-green-100", text: "text-green-600" },
    },
    {
      label: "Courses Completed",
      value: totalCoursesCompleted,
      icon: <Trophy />,
      color: { bg: "bg-purple-100", text: "text-purple-600" },
    },
    {
      label: "Login Count",
      value: loginCount,
      icon: <UserCheck />,
      color: { bg: "bg-yellow-100", text: "text-yellow-600" },
    },
    {
      label: "Longest Streak",
      value: longestStreak,
      icon: <Flame />,
      color: { bg: "bg-red-100", text: "text-red-600" },
    },
  ];

  return (
    <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Statistics</h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {statItems.map((item, index) => (
          <StatCard
            key={index}
            icon={item.icon}
            label={item.label}
            value={item.value}
            color={item.color}
            delay={index * 0.1}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Stats;