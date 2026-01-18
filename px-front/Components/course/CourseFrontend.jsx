"use client";
import React from "react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Module from "./Module.jsx";
import CourseDisplay from "./CourseDisplay.jsx";

const CourseFrontend = ({ courseData }) => {
  const [activeModule, setActiveModule] = useState(null);
  // STATE: Records all quiz attempts for future analysis
  const [quizHistory, setQuizHistory] = useState([]);

  const handleQuizRecord = (result) => {
    setQuizHistory((prev) => {
      const newHistory = [...prev, result];
      // Logging to console to demonstrate recording capability
      console.log("Updated Quiz History:", newHistory);
      return newHistory;
    });
  };

  // Scroll to top when view changes
  React.useEffect(() => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    }
  }, [activeModule]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      <AnimatePresence mode="wait">
        {activeModule ? (
          <Module
            key="module-page"
            module={activeModule}
            onBack={() => setActiveModule(null)}
          />
        ) : (
          <CourseDisplay
            key="course-display"
            data={courseData}
            onModuleSelect={setActiveModule}
            handleQuizRecord={handleQuizRecord}
            quizHistory={quizHistory}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseFrontend;
