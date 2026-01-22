import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ModuleNavigation({ courseId, prev, next }) {

  return (
    <div className="flex justify-between items-center my-8 pt-8 border-t border-gray-200">
      {/* PREVIOUS */}
      {prev ? (
        <Link 
          href={`/dashboard/courses/${courseId}/modules/${prev._id}`}
          className="flex items-center gap-2 group p-2 rounded-lg hover:bg-gray-50"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          <div className="text-left">
            <span className="text-[10px] uppercase text-gray-400 font-bold">Previous</span>
            <p className="text-sm font-semibold">{prev.moduleTitle}</p>
          </div>
        </Link>
      ) : <div />}

      {/* NEXT */}
      {next ? (
        <Link 
          href={`/dashboard/courses/${courseId}/modules/${next._id}`}
          className="flex items-center gap-2 group p-2 rounded-lg hover:bg-gray-50"
        >
          <div className="text-right">
            <span className="text-[10px] uppercase text-blue-500 font-bold">Next Lesson</span>
            <p className="text-sm font-semibold">{next.moduleTitle}</p>
          </div>
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
          🎉 Course Completed!
        </div>
      )}
    </div>
  );
}