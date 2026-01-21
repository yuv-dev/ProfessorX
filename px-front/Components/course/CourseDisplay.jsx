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
} from "lucide-react";
import Accordion from "../ui/Accordion.jsx";
import MiniProjectSlider from "./MiniProjectSlider.jsx";
import QuizItem from "./QuizItem.jsx";
import RoadMap from "./RoadMap.jsx";
import StudyGuide from "./StudyGuide.jsx";

const CourseDisplay = ({
  data,
  onProjectSelect,
  quizHistory,
  handleQuizRecord,
  isEnrolled = false,
  onEnroll,
  enrollmentLoading = false,
}) => {
  const router = useRouter();

  const moduleSelect = (module) => {
    router.push(`/dashboard/courses/${data._id}/modules/${module._id}`);
  };
  // Calculate quick stats from the history
  const totalAttempted = quizHistory.length;
  const correctCount = quizHistory.filter((q) => q.isCorrect).length;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16"
    >
      {/* Header */}
      <div className="relative">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600 tracking-tight">
            {data.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {data.description}
          </p>
        </div>
        <div className="absolute top-0 right-0">
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
      {/* Roadmap Section */}
      <RoadMap {...data} />

      {/* Study Guide Footer */}
      <StudyGuide data={data.studyGuide} />

      {/* Modules Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <BookOpen className="text-blue-600" /> Learning Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.modules?.map((mod) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={mod._id}
              onClick={() => moduleSelect(mod)}
              className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer flex flex-col h-full overflow-hidden group"
            >
              <div className="p-6 grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                    MODULE {mod.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black group-hover:text-blue-600 transition-colors mb-3">
                  {mod.title || mod.moduleTitle}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {mod.summary}
                </p>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  {mod.lessons?.length || 0} Lessons
                </span>
                <span className="text-blue-600 font-bold text-sm">
                  Start Learning &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Code className="text-blue-600" /> Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Mini Project */}

          <MiniProjectSlider projects={data.projects.miniProjects} />

          {/* Final Project (Takes up 2 cols) */}
          <div
            onClick={() => onProjectSelect(data.projects?.finalProject)}
            className="cursor-pointer md:col-span-2 bg-linear-to-br from-gray-900 to-gray-800 text-white rounded-xl p-8 shadow-lg relative overflow-hidden group transition-all duration-300 hover:scale-[1.01]"
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

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-sm text-gray-400 uppercase mb-3">
                    Core Features
                  </h4>
                  <div className="relative max-h-32 overflow-hidden group/list">
                    <ul className="space-y-1">
                      {data.projects?.finalProject?.features?.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>{" "}
                          {f}
                        </li>
                      ))}
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
              <div className="grid sm:grid-cols-2 gap-6 mt-6">
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
                        <li key={i} className="flex items-center gap-2 text-sm">
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
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
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
                <span className="text-green-600">{correctCount} Correct</span>
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
    </motion.div>
  );
};

export default CourseDisplay;
