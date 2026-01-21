// app/dashboard/courses/[courseId]/layout.js
import { getCourseById } from "@/lib/api-client";
import { CourseProvider } from "@/context/CourseContext";

export default async function CourseLayout({ children, params }) {
  const { courseId } = await params;
  // This fetch happens ONCE when the user enters any sub-route of this course
  const course = await getCourseById(courseId);
  console.log("Layout", course);
  return (
    <CourseProvider courseData={course}>
      <div className="min-h-screen bg-gray-50">{children}</div>
    </CourseProvider>
  );
}
