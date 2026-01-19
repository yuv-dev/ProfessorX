"use client";
import React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Module from "./Module.jsx";
import CourseDisplay from "./CourseDisplay.jsx";
import { useAuth } from "@/context/AuthContext";
import { checkEnrollment, enrollInCourse } from "@/lib/api-client";

const CourseFrontend = ({ courseData }) => {
  const [activeModule, setActiveModule] = useState(null);
  // STATE: Records all quiz attempts for future analysis
  const [quizHistory, setQuizHistory] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const { user } = useAuth();

  // Check enrollment status on component mount
  useEffect(() => {
    const checkUserEnrollment = async () => {
      if (user && courseData._id) {
        try {
          const response = await checkEnrollment(courseData._id);
          setIsEnrolled(response.isEnrolled);
        } catch (error) {
          console.error("Error checking enrollment:", error);
        }
      }
    };

    checkUserEnrollment();
  }, [user, courseData._id]);

  const handleEnroll = async () => {
    if (!user) {
      alert("Please log in to enroll in courses");
      return;
    }

    setEnrollmentLoading(true);
    try {
      await enrollInCourse(courseData._id);

      setIsEnrolled(true);
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("Failed to enroll in course. Please try again.");
    } finally {
      setEnrollmentLoading(false);
    }
  };

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
            isEnrolled={isEnrolled}
            onEnroll={handleEnroll}
            enrollmentLoading={enrollmentLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseFrontend;
