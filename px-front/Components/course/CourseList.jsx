"use client";
import { motion } from "framer-motion";
import CourseCard from "./CourseCard";

const CourseList = ({ courses, showProgress = false }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="course-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {courses &&
        courses.map((course, index) => (
          <CourseCard
            key={course._id || index}
            course={course}
            showProgress={showProgress}
          />
        ))}
    </motion.div>
  );
};

export default CourseList;
