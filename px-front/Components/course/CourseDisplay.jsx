"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Code,
  List,
  CheckCircle,
  Award,
  BarChart2,
  LockKeyholeIcon,
} from "lucide-react";
import Accordion from "../ui/Accordion.jsx";
import MiniProjectSlider from "./MiniProjectSlider.jsx";
import QuizItem from "./QuizItem.jsx";
import RoadMap from "./RoadMap.jsx";
import StudyGuide from "./StudyGuide.jsx";

const CourseDisplay = ({
  data,
  quizHistory,
  handleQuizRecord,
  isEnrolled = false,
  onEnroll,
  enrollmentLoading = false,
  lastActiveModule,
  completedModules = [],
}) => {
  const router = useRouter();
  const courseId = data._id;
  const moduleSelect = (module) => {
    router.push(`/dashboard/courses/${courseId}/modules/${module._id}`);
  };
  const onProjectSelect = (type, identifier) => {
    router.push(
      `/dashboard/courses/${courseId}/projects/${type}/${identifier}`,
    );
  };

  // Calculate quick stats from the history
  const totalAttempted = quizHistory.length;
  const correctCount = quizHistory.filter((q) => q.isCorrect).length;

  const lastActiveModuleData = data.modules?.find(
    (mod) => mod._id === lastActiveModule,
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-10 space-y-16"
    >
      {/* Header */}
      <div className="flex flex-col items-center md:relative">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-blue-600 tracking-tight">
            {data.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            {data.description}
          </p>
        </div>
        <div className="mt-4 md:absolute md:top-0 md:right-0">
          <button
            onClick={isEnrolled ? undefined : onEnroll}
            disabled={isEnrolled || enrollmentLoading}
            className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
              isEnrolled
                ? "bg-green-100 text-green-800 cursor-not-allowed opacity-75"
                : enrollmentLoading
                  ? "bg-blue-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 active:scale-95"
            }`}
          >
            {enrollmentLoading
              ? "Enrolling..."
              : isEnrolled
                ? "Enrolled"
                : "Enroll Now"}
          </button>
        </div>
      </div>

      {/* Resume Last Module */}
      {lastActiveModule && (
        <div className="bg-linear-90 from-blue-200 to-indigo-50  border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Continue Learning
          </h3>

          <p className="text-gray-800 font-bold mb-4 text-2xl sm:text-3xl">
            {" "}
            {lastActiveModuleData.moduleTitle}
          </p>
          <button
            onClick={() => {
              const selectedModule = data.modules?.find(
                (mod) => mod._id === lastActiveModule,
              );
              if (selectedModule) moduleSelect(selectedModule);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Resume Module
          </button>
        </div>
      )}

      {/* Roadmap Section */}
      <RoadMap {...data} />

      {/* Study Guide Footer */}
      <StudyGuide data={data.studyGuide} />

      <div
        className={`bg-linear-0 from-transparent to-blue-100 p-4 sm:p-8  rounded-xl space-y-10 overflow-hidden ${!isEnrolled ? "h-70" : " "} `}
      >
        {!isEnrolled ? (
          <div>
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-md">
              <h3 className="text-2xl font-bold mb-4">
                <LockKeyholeIcon size={48} />
                Enroll to Access Full Course Content
              </h3>
              <p className="text-gray-600 mb-6">
                Join now to unlock all modules, projects, and quizzes to enhance
                your learning experience.
              </p>
              <button
                onClick={isEnrolled ? undefined : onEnroll}
                disabled={isEnrolled || enrollmentLoading}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  isEnrolled
                    ? "bg-green-100 text-green-800 cursor-not-allowed opacity-75"
                    : enrollmentLoading
                      ? "bg-blue-400 text-white cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 active:scale-95"
                }`}
              >
                {enrollmentLoading
                  ? "Enrolling..."
                  : isEnrolled
                    ? "Enrolled"
                    : "Enroll Now"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Modules Grid */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <BookOpen className="text-blue-600" /> Learning Modules
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.modules?.map((mod) => {
                  const isCompleted = completedModules.includes(mod._id);
                  return (
                    <motion.div
                      whileHover={{ y: -5 }}
                      key={mod._id}
                      onClick={() => moduleSelect(mod)}
                      className={`rounded-xl border shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col h-full overflow-hidden group ${
                        isCompleted
                          ? "bg-green-50 border-green-200 hover:border-green-300"
                          : "bg-white border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="p-4 sm:p-6 grow">
                        <div className="flex justify-between items-start mb-4">
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            isCompleted
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            MODULE {mod.id}
                          </span>
                          {isCompleted && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <h3 className={`text-xl font-bold mb-3 transition-colors ${
                          isCompleted
                            ? "text-gray-800 group-hover:text-green-600"
                            : "text-black group-hover:text-blue-600"
                        }`}>
                          {mod.title || mod.moduleTitle}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {mod.summary}
                        </p>
                      </div>
                      <div className={`px-4 sm:px-6 py-4 border-t flex items-center justify-between ${
                        isCompleted
                          ? "bg-green-100 border-green-200"
                          : "bg-gray-50 border-gray-100"
                      }`}>
                        <span className="text-sm font-medium text-gray-500">
                          {mod.lessons?.length || 0} Lessons
                        </span>
                        <span className={`font-bold text-sm ${
                          isCompleted
                            ? "text-green-600"
                            : "text-blue-600"
                        }`}>
                          {isCompleted ? "Review Module" : "Start Learning"} &rarr;
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Projects Section */}
            <section className="mt-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Code className="text-blue-600" /> Projects
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Mini Project */}

                <MiniProjectSlider
                  projects={data.projects.miniProjects}
                  onProjectSelect={onProjectSelect}
                />

                {/* Final Project (Takes up 2 cols) */}
                <div
                  onClick={() => onProjectSelect("final", "main")}
                  className="cursor-pointer md:col-span-2 bg-linear-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 sm:p-8 shadow-lg relative overflow-hidden group transition-all duration-300 hover:scale-[1.01]"
                >
                  <div className="absolute top-0 right-0 p-32 bg-blue-600 opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="text-yellow-400" />
                      <span className="text-xs font-bold tracking-wider text-yellow-400 uppercase">
                        Capstone Project
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {data.projects?.finalProject?.projectTitle}
                    </h3>
                    <p className="text-gray-300 mb-6 max-w-lg">
                      {data.projects?.finalProject?.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-sm text-gray-400 uppercase mb-3">
                          Core Features
                        </h4>
                        <div className="relative max-h-32 overflow-hidden group/list">
                          <ul className="space-y-1">
                            {data.projects?.finalProject?.features?.map(
                              (f, i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>{" "}
                                  {f}
                                </li>
                              ),
                            )}
                          </ul>

                          <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-gray-900 to-transparent pointer-events-none"></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-400 uppercase mb-3">
                          Stretch Goals
                        </h4>
                        <div className="relative max-h-32 overflow-hidden">
                          <ul className="space-y-1">
                            {data.projects?.finalProject?.stretchGoals?.map(
                              (f, i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>{" "}
                                  {f}
                                </li>
                              ),
                            )}
                          </ul>
                          <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-gray-900 to-transparent pointer-events-none"></div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-bold text-sm text-gray-400 uppercase mb-3">
                          Tech Requirements
                        </h4>
                        <div className="relative max-h-32 overflow-hidden">
                          <ul className="space-y-1">
                            {data.projects?.finalProject?.requirements?.map(
                              (f, i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>{" "}
                                  {f}
                                </li>
                              ),
                            )}
                          </ul>
                          <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-gray-900 to-transparent pointer-events-none"></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-400 uppercase mb-3">
                          Steps to Complete Project
                        </h4>
                        <div className="relative max-h-32 overflow-hidden">
                          <ul className="space-y-1">
                            {data.projects?.finalProject?.steps?.map((f, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-2 text-sm"
                              >
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>{" "}
                                {f}
                              </li>
                            ))}
                          </ul>
                          <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-gray-900 to-transparent pointer-events-none"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quizzes Section */}
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-10">
              <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <List className="text-blue-600" /> Weekly Quizzes
                </h2>

                {/* Real-time Stats Display */}
                {totalAttempted > 0 && (
                  <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BarChart2 size={16} />
                      <span>Current Session:</span>
                    </div>
                    <div className="flex gap-3 text-sm font-bold">
                      <span className="text-green-600">
                        {correctCount} Correct
                      </span>
                      <span className="text-red-500">
                        {totalAttempted - correctCount} Wrong
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                {data.weeklyQuizzes.map((weekQuiz) => (
                  <Accordion
                    key={weekQuiz._id}
                    title={`Week ${weekQuiz.week} Knowledge Check`}
                    icon={CheckCircle}
                  >
                    <div className="space-y-2">
                      {weekQuiz.quizzes.map((quiz, qIdx) => (
                        <QuizItem
                          key={qIdx}
                          quizData={quiz}
                          onAnswer={handleQuizRecord}
                        />
                      ))}
                    </div>
                  </Accordion>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CourseDisplay;
