"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home, BookOpen, Rocket } from "lucide-react";

export default function CourseBreadcrumbs({
  activeTitle,
  courseId,
  courseTitle,
}) {
  const pathname = usePathname();

  // Logic to determine if we are in a module or project
  const isModule = pathname.includes("/modules/");
  const isProject = pathname.includes("/projects/");

  return (
    <nav className="flex items-center space-x-2 px-4 py-2 md:p-6 text-xs md:text-sm text-gray-500 overflow-x-auto whitespace-nowrap md:whitespace-normal pb-2">
      {/* 1. Dashboard Link */}
      <Link
        href="/dashboard/courses"
        className="flex items-center hover:text-blue-600 transition-colors"
      >
        <Home size={14} className="mr-1" />
        <span>My Courses</span>
      </Link>

      <ChevronRight size={14} className="text-gray-400 shrink-0" />

      {/* 2. Parent Course Link */}
      <Link
        href={`/dashboard/courses/${courseId}`}
        className={`hover:text-blue-600 transition-colors ${!isModule && !isProject ? "font-bold text-gray-900" : ""}`}
      >
        {courseTitle}
      </Link>

      {/* 3. Dynamic Segment (Module or Project) */}
      {(isModule || isProject) && (
        <>
          <ChevronRight size={14} className="text-gray-400 shrink-0" />
          <div className="flex items-center font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md">
            {isModule ? (
              <BookOpen size={14} className="mr-1.5" />
            ) : (
              <Rocket size={14} className="mr-1.5" />
            )}
            <span className="max-w-[150px] md:max-w-[300px] truncate">
              {activeTitle || (isModule ? "Module" : "Project")}
            </span>
          </div>
        </>
      )}
    </nav>
  );
}
