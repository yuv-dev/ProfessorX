"use client";
import CourseList from "@/Components/course/CourseList";
import { getUserEnrolledCourses } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useMemo } from "react";
import { Filter, Search, X } from "lucide-react";
import useDebounce from "@/hooks/useDebounce"; // Make sure to create this hook

const Page = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("recent");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms delay

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await getUserEnrolledCourses(user._id);
        const enrolledCourses =
          response?.progress?.map((p) => ({
            ...p.courseId,
            enrollmentDate: p.enrolledAt,
            lastAccessed: p.lastAccessed,
            progress: p, // Keep full progress data
          })) || [];
        setCourses(enrolledCourses);
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
        setError("Failed to load enrolled courses");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  const sortedCourses = useMemo(() => {
    const sorted = [...courses];
    switch (sortBy) {
      case "name":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "enrolled":
        return sorted.sort(
          (a, b) => new Date(b.enrollmentDate) - new Date(a.enrollmentDate),
        );
      case "recent":
        return sorted.sort(
          (a, b) =>
            new Date(b.lastAccessed || b.enrollmentDate) -
            new Date(a.lastAccessed || a.enrollmentDate),
        );
      case "progress":
        return sorted.sort((a, b) => {
          if (a.progress.status === b.progress.status) return 0;
          if (a.progress.status === "active") return -1;
          if (b.progress.status === "active") return 1;
          return 0;
        });
      default:
        return sorted;
    }
  }, [courses, sortBy]);

  // --- FILTER LOGIC ---
  const filteredCourses = useMemo(() => {
    return sortedCourses.filter((course) => {
      const status = course.progress?.status || "active";
      const statusMatch =
        filterStatus === "All"
          ? true
          : status.toLowerCase() === filterStatus.toLowerCase();
      const searchMatch =
        course.title
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        course.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [sortedCourses, filterStatus, debouncedSearchTerm]);

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
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 mb-4 animate-slide-up h-19">
            My Learning
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
            Continue your learning journey with your enrolled courses. Pick up
            where you left off.
          </p>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-linear-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Loading Your Courses
              </h3>
              <p className="text-gray-500">
                Please wait while we fetch your enrolled courses...
              </p>
            </div>
          </div>
        ) : error ? (
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Unable to Load Courses
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
        ) : (
          <div className="animate-slide-up">
            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              {/* Search Input */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-10 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Status Filter Dropdown */}
                <div className="flex items-center space-x-2 relative">
                  <span className="text-sm text-gray-500">Filter:</span>
                  <select
                    className="appearance-none pl-4 pr-8 leading-tight focus:outline-none bg-white border border-gray-300 text-black rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="active">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
                    <Filter className="h-4 w-4" />
                  </div>
                </div>

                {/* Sort by Dropdown */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-gray-300 text-black rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="recent">Recently Accessed</option>
                    <option value="progress">Progress</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="enrolled">Enrollment Date</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Course List Section */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Enrolled Courses
              </h2>
              <p className="text-gray-600">
                {filteredCourses.length} course
                {filteredCourses.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Courses section     */}
            {filteredCourses?.length === 0 ? (
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
                    No Enrolled Courses
                  </h3>
                  <p className="text-gray-500 mb-6">
                    You haven&apos;t enrolled in any courses yet, Or the
                    searched course doesn&apos;t exist. Browse our catalog to
                    view the latest courses!
                  </p>
                  <button
                    onClick={() => (window.location.href = "/dashboard/browse")}
                    className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Browse Courses
                  </button>
                </div>
              </div>
            ) : (
              <CourseList courses={filteredCourses} showProgress={true} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
