"use client";
import { Card, CardContent } from "@/Components/ui/Card";
import Progress from "@/Components/ui/Progress";
import { BookOpen, Clock, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function LearnerAnalytics() {
  const analytics = {
    coursesCompleted: 6,
    totalCourses: 12,
    learningHours: 84,
    weeklyGoal: 10,
    weeklyProgress: 7,
    skillGrowth: 72,
  };

  const completionPercent =
    (analytics.coursesCompleted / analytics.totalCourses) * 100;
  const weeklyPercent = (analytics.weeklyProgress / analytics.weeklyGoal) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="rounded-2xl h-35 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Courses Completed</p>
                <h3 className="text-xl font-semibold">
                  {analytics.coursesCompleted}/{analytics.totalCourses}
                </h3>
              </div>
            </div>
            <Progress value={completionPercent} className="mt-4" />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-2xl h-35 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Learning Hours</p>
                <h3 className="text-xl font-semibold">
                  {analytics.learningHours} hrs
                </h3>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Total time spent learning
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="rounded-2xl h-35 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Weekly Goal</p>
                <h3 className="text-xl font-semibold">
                  {analytics.weeklyProgress}/{analytics.weeklyGoal} hrs
                </h3>
              </div>
            </div>
            <Progress value={weeklyPercent} className="mt-4" />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="rounded-2xl h-35 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Skill Growth</p>
                <h3 className="text-xl font-semibold">
                  {analytics.skillGrowth}%
                </h3>
              </div>
            </div>
            <Progress value={analytics.skillGrowth} className="mt-4" />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// =========================
// Reusable Analytics Card
// =========================

export function AnalyticsCard({
  icon: Icon,
  title,
  value,
  subtitle,
  progress,
  color = "text-blue-600",
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <Icon className={`w-8 h-8 ${color}`} />
            <div>
              <p className="text-sm text-gray-500">{title}</p>
              <h3 className="text-2xl font-semibold">{value}</h3>
            </div>
          </div>

          {progress !== undefined && (
            <div className="space-y-1">
              <Progress value={progress} />
              {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// =========================
// Custom Progress Component
// =========================

export function ProgressBar({ value, label, showPercent = true }) {
  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-gray-600">{label}</p>}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6 }}
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
        />
      </div>
      {showPercent && (
        <p className="text-xs text-gray-500 text-right">{value}%</p>
      )}
    </div>
  );
}
