// app/dashboard/courses/[courseId]/CourseContext.js
"use client";

import { createContext, useContext } from "react";

const CourseContext = createContext(null);

export function CourseProvider({ children, courseData }) {
  return (
    <CourseContext.Provider value={courseData}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
}
