import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ModuleNavigation({ courseId, prev, next }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-8 px-4 border-t border-gray-200 gap-4">
      {/* PREVIOUS */}
      {prev ? (
        <Link
          href={`/dashboard/courses/${courseId}/modules/${prev._id}`}
          className="flex items-center gap-2 group p-3 rounded-lg hover:bg-gray-50 w-full md:w-auto justify-center md:justify-start"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          <div className="text-left">
            <span className="text-xs uppercase text-gray-400 font-bold">
              Previous
            </span>
            <p className="text-sm font-semibold group-hover:text-yellow-600">{prev.moduleTitle}</p>
          </div>
        </Link>
      ) : (
        <div className="hidden md:block w-1/3" />
      )}

      {/* NEXT */}
      {next ? (
        <Link
          href={`/dashboard/courses/${courseId}/modules/${next._id}`}
          className="flex items-center gap-2 group p-3 rounded-lg hover:bg-gray-50 w-full md:w-auto justify-center md:justify-end"
        >
          <div className="text-right">
            <span className="text-xs uppercase text-blue-500 font-bold">
              Next Lesson
            </span>
            <p className="text-sm font-semibold group-hover:text-yellow-600">{next.moduleTitle}</p>
          </div>
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold w-full text-center md:w-auto">
          🎉 Course Completed!
        </div>
      )}
    </div>
  );
}