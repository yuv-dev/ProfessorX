"use client";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { useRouter } from "next/navigation";

const CourseList = ({ courses }) => {
  const router = useRouter();
  const handleCourseClick = (courseId) => {
    router.push(`/dashboard/courses/${courseId}`);
  };

  return (
    <div className="course-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses &&
        courses.map((course, index) => (
          <Card
            key={index}
            handleClick={handleCourseClick}
            id={course._id}
            className="box-border mb-4 md:mb-0 border-gray-700 hover:border-blue-600 cursor-pointer hover:shadow-lg transition-shadow shadow-blue-200"
          >
            <CardHeader>
              <h3 className="text-lg text-black font-semibold">
                {course.title}
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{course.description}</p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default CourseList;
