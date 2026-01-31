"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useGlobalProgress } from "@/hooks/useGlobalProgress";
import StreakCalendar from "./StreakCalender";
import Stats from "./Stats";
import SkillRadar from "./SkillRadar";
import Achievements from "./Achievements";
import { useRouter } from "next/navigation";
import ProgressBar from "../ui/ProgressBar";
import { ArrowRight } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Dashboard = () => {
  const { progress, loading, error, recordActivity } = useGlobalProgress();

  useEffect(() => {
    recordActivity();
    const heartbeat = setInterval(() => recordActivity(5), 5 * 60 * 1000); // record 5 minutes every 5 minutes
    return () => clearInterval(heartbeat);
  }, []);

  const router = useRouter();
  const handleResumeModuleClick = (courseId, moduleId) => {
    if (courseId && moduleId) {
      router.push(`/dashboard/courses/${courseId}/modules/${moduleId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading Dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p className="font-bold">An error occurred</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="p-6 text-center text-gray-500">
        No progress data available. Start a course to see your dashboard!
      </div>
    );
  }

  const rankToLevel = (rank) => {
    const ranks = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
    return ranks[rank?.toLowerCase()] || 0;
  };

  const chartData = progress.skillSet.map((skill) => ({
    subject: skill.subject,
    level: rankToLevel(skill.rank),
  }));

  const rankColors = {
    Beginner: "bg-blue-100 text-blue-800",
    Intermediate: "bg-green-100 text-green-800",
    Advanced: "bg-purple-100 text-purple-800",
    Expert: "bg-red-100 text-red-800",
  };

  return (
    <motion.div
      className="p-4 sm:p-6 bg-gray-50 text-black min-h-screen"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (takes 2/3 width on large screens) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* 1. Welcome & Resume Card */}
          <motion.div
            className="bg-linear-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
            onClick={() =>
              handleResumeModuleClick(
                progress.lastActiveModule?.courseId?._id,
                progress.lastActiveModule?.moduleId?._id,
              )
            }
          >
            <h2 className="text-2xl font-bold mb-1">
              {progress.lastActiveModule?.courseId
                ? "Continue Learning"
                : "Welcome to Your Dashboard!"}
            </h2>
            {progress.lastActiveModule?.courseId ? (
              <>
                <p className="text-lg font-medium text-indigo-200 mb-2">
                  {progress.lastActiveModule.courseId.title}
                </p>
                <p className="text-sm text-purple-200 mb-4">
                  {progress.lastActiveModule.moduleId.moduleTitle}
                </p>
                <ProgressBar
                  percentage={progress.lastActiveModule.progressPercentage}
                  bgColor="bg-white/30"
                  fillColor="bg-white"
                />
                <div className="flex items-center justify-end mt-4 text-sm font-semibold">
                  Resume Now <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </>
            ) : (
              <p className="text-indigo-200">
                Explore our courses and start your learning journey today.
              </p>
            )}
          </motion.div>

          {/* 2. Statistics Card */}
          <motion.div variants={cardVariants}>
            <Stats stats={progress.activity} />
          </motion.div>

          {/* 3. Skill Set Card */}
          <motion.div
            className="bg-white p-6 shadow-md rounded-xl border border-gray-200"
            variants={cardVariants}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Skill Set</h2>
            {progress.skillSet.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {progress.skillSet.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                      rankColors[skill.rank] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {skill.subject} - {skill.rank}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                Your skills will be tracked here as you complete modules.
              </p>
            )}
          </motion.div>
        </div>

        {/* Right Column (takes 1/3 width on large screens) */}
        <div className="flex flex-col gap-6">
          {/* 4. Activity Calendar */}
          <motion.div
            className="bg-white p-6 shadow-md rounded-xl border border-gray-200"
            variants={cardVariants}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Activity Calendar
            </h2>
            <div className="flex justify-around items-center mb-4 p-2 bg-gray-50 rounded-lg">
              <div className="text-center">
                <span className="text-3xl font-bold text-orange-500">
                  {progress.activity.currentStreak}
                </span>
                <p className="text-sm text-gray-500 mt-1">🔥 Current Streak</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-blue-500">
                  {Math.round(progress.activity.totalHoursSpent)}
                </span>
                <p className="text-sm text-gray-500 mt-1">⏳ Hours Spent</p>
              </div>
            </div>
            <StreakCalendar activityLog={progress.activity.activityLog || []} />
          </motion.div>

          {/* 5. Achievements Card */}
          <motion.div variants={cardVariants}>
            <Achievements milestones={progress.milestones} />
          </motion.div>
        </div>

        {/* Bottom Row (Full Width) */}
        <div className="lg:col-span-3">
          {/* 6. Skill Radar */}
          <motion.div
            className="bg-white p-6 shadow-md rounded-xl border border-gray-200"
            variants={cardVariants}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Skill Radar
            </h2>
            <div className="h-64 sm:h-80">
              <SkillRadar chartData={chartData} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
