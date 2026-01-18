import CourseList from "@/Components/course/CourseList";
import { getAllCourses } from "@/lib/api-client";

const page = async () => {
  const response = await getAllCourses();
  const enrollments = response || [];

  return (
    <div className="max-w-7xl mx-auto px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Browse Courses</h1>
        <p className="text-slate-500">Enroll into the course you wanna learn</p>
      </header>

      {enrollments.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
          <p className="text-slate-500">
            You haven&apos;t enrolled in any courses yet.
          </p>
          <a
            href="/courses"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Browse Catalog
          </a>
        </div>
      ) : (
        <div className="">
          <CourseList courses={enrollments} />
        </div>
      )}
    </div>
  );
};
export default page;
