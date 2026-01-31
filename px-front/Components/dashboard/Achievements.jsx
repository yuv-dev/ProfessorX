import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

const AchievementCard = ({ title, unlockedAt, delay }) => {
  const formattedDate = new Date(unlockedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      className="bg-gray-50 p-4 rounded-lg flex items-center space-x-4 border border-gray-200"
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ delay }}
    >
      <div className="p-3 rounded-full bg-yellow-100">
        <Award className="h-6 w-6 text-yellow-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">Unlocked on {formattedDate}</p>
      </div>
    </motion.div>
  );
};

const Achievements = ({ milestones }) => {
  if (!milestones || milestones.length === 0) {
    return (
      <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Achievements</h2>
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Your achievements will appear here as you unlock them!</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white p-6 shadow-md rounded-xl border border-gray-200"
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
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Achievements</h2>
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {milestones.map((milestone, index) => (
          <AchievementCard
            key={index}
            title={milestone.title}
            unlockedAt={milestone.unlockedAt}
            delay={index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Achievements;
