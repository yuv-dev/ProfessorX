"use client";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Clock, Star } from "lucide-react";

const CourseList = ({ courses, showProgress = false }) => {
  const router = useRouter();

  const handleCourseClick = (courseId) => {
    router.push(`/dashboard/courses/${courseId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
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
          <motion.div
            key={course._id || index}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              handleClick={handleCourseClick}
              id={course._id}
              className="group relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full"
            >
              {/* linear overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-purple-600/0 group-hover:from-blue-500/10 group-hover:to-purple-600/10 transition-all duration-300 z-10" />

              {/* Course thumbnail placeholder */}
              <div className="relative h-48 bg-linear-to-br from-blue-400 via-purple-500 to-indigo-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-800">
                      Course
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-yellow-400 rounded-full p-1">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>
              </div>

              <CardHeader className="relative z-20">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {course.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>4 weeks</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-20 grow">
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                  {course.description}
                </p>

                {/* Progress indicator or enrollment status */}
                <div className="flex items-center justify-between">
                  {showProgress && course.progress ? (
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>
                          {course.progress.completedModules?.length || 0}{" "}
                          modules completed
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-linear-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(((course.progress.completedModules?.length || 0) / (course.modules?.length || 1)) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <div className="flex -space-x-1">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-linear-to-r from-blue-400 to-purple-500 border-2 border-white"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">
                        +120 enrolled
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>

              {/* Hover effect overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Card>
          </motion.div>
        ))}
    </motion.div>
  );
};

export default CourseList;
