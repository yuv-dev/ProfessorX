import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({ 
  courseTitle, 
  activeModule, 
  activeProject, 
  onBack 
}) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6 animate-fade-in">
      {/* Root Link */}
      <button 
        onClick={onBack}
        className="flex items-center hover:text-indigo-600 transition-colors"
      >
        <Home size={16} className="mr-1" />
        <span>Dashboard</span>
      </button>

      <ChevronRight size={14} className="text-gray-400" />

      {/* Course Level */}
      <button 
        onClick={onBack}
        className={`hover:text-indigo-600 transition-colors ${!activeModule && !activeProject ? 'font-semibold text-indigo-700' : ''}`}
      >
        {courseTitle || "Course"}
      </button>

      {/* Module Level */}
      {activeModule && (
        <>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="font-semibold text-indigo-700 truncate max-w-[200px]">
            {activeModule.moduleTitle}
          </span>
        </>
      )}

      {/* Project Level */}
      {activeProject && (
        <>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="font-semibold text-indigo-700 truncate max-w-[200px]">
            {activeProject.title}
          </span>
        </>
      )}
    </nav>
  );
}