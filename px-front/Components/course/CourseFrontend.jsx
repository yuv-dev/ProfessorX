"use client";
import React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import CourseDisplay from "./CourseDisplay.jsx";
import { useAuth } from "@/context/AuthContext";
import { checkEnrollment, enrollInCourse, getProgressByCourseId } from "@/lib/api-client";

const CourseFrontend = ({ courseData }) => {
  // STATE: Records all quiz attempts for future analysis
  const [quizHistory, setQuizHistory] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const { user } = useAuth();

  // Check enrollment status and fetch progress on component mount
  useEffect(() => {
    const checkUserEnrollment = async () => {
      if (user && courseData._id) {
        try {
          const response = await checkEnrollment(courseData._id);
          setIsEnrolled(response.isEnrolled);
          if (response.isEnrolled) {
            const progressResponse = await getProgressByCourseId(courseData._id);
            setProgress(progressResponse.progress);
          }
        } catch (error) {
          console.error("Error checking enrollment or fetching progress:", error);
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      <AnimatePresence mode="wait">
        <CourseDisplay
          key="course-display"
          data={courseData}
          handleQuizRecord={handleQuizRecord}
          quizHistory={quizHistory}
          isEnrolled={isEnrolled}
          onEnroll={handleEnroll}
          enrollmentLoading={enrollmentLoading}
          lastActiveModule={progress?.lastActiveModule}
          completedModules={progress?.completedModules || []}
        />
      </AnimatePresence>
    </div>
  );
};

export default CourseFrontend;
