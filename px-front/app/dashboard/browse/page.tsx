"use client";
import CourseList from "@/Components/course/CourseList";
import { getAllCourses } from "@/lib/api-client";
import { useState, useEffect } from "react";

interface Course {
  _id: string;
  title: string;
  createdAt?: string;
  enrollmentCount?: number;
}

const Page = () => {
  // const { user } = useAuth(); // Not needed for browse page
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("newest");

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        setLoading(true);
        console.log("Fetching all courses...");
        const response = await getAllCourses();
        console.log("API Response:", response);
        const allCourses = response?.courses || response || [];
        console.log("All courses extracted:", allCourses);
        console.log("All courses length:", allCourses.length);

        // Sort courses based on selected criteria
        const sortedCourses = sortCourses(allCourses, sortBy);
        console.log("Sorted courses:", sortedCourses);
        setCourses(sortedCourses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourses();
  }, [sortBy]);

  const sortCourses = (courses: Course[], criteria: string): Course[] => {
    const sorted = [...courses];
    switch (criteria) {
      case "name":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "newest":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime(),
        );
      case "popular":
        // Sort by enrollment count (assuming courses have enrollmentCount)
        return sorted.sort(
          (a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0),
        );
      default:
        return sorted;
    }
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    const sortedCourses = sortCourses(courses, newSortBy);
    setCourses(sortedCourses);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600 rounded-full mb-6 animate-bounce">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 mb-4 animate-slide-up">
            Browse Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
            Discover amazing courses tailored to your learning journey. Enroll
            and start your path to mastery today.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-linear-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <svg
                  className="w-12 h-12 text-blue-500 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Loading Courses...
              </h3>
              <p className="text-gray-500">
                Please wait while we fetch the latest courses for you.
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-linear-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Failed to Load Courses
              </h3>
              <p className="text-gray-500 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Content Section */}
        {!loading && !error && courses.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-linear-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <svg
                  className="w-12 h-12 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Courses Available
              </h3>
              <p className="text-gray-500 mb-6">
                We&apos;re working on adding amazing courses. Check back soon!
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )}

        {!loading && !error && courses.length > 0 && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Available Courses
                </h2>
                <p className="text-gray-600">
                  {courses.length} course{courses.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 text-black font-medium focus:border-transparent"
                >
                  <option value="newest">Newest</option>
                  <option value="name">Name</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
            <CourseList courses={courses} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
