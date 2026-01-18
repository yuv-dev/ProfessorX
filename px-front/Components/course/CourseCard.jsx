// components/CourseCard.jsx
export default function CourseCard({ enrollment }) {
  const { courseId: course, completedModules, status } = enrollment;
  
  // Calculate progress percentage
  // (Assuming your backend provides totalModules count or you fetch it)
  const totalModulesCount = course.modules?.length || 1; 
  const progressPercent = Math.round((completedModules.length / totalModulesCount) * 100);

  return (
    <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-slate-800">{course.title}</h3>
        <span className={`text-xs font-semibold px-2 py-1 rounded uppercase ${
          status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {status}
        </span>
      </div>
      
      <p className="text-slate-600 text-sm line-clamp-2 mb-6">
        {course.description}
      </p>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-slate-500">
          <span>Progress</span>
          <span>{progressPercent}%</span>
        </div>
        {/* Progress Bar Container */}
        <div className="w-full bg-slate-200 rounded-full h-2">
          {/* Actual Progress Fill */}
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <button className="w-full mt-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
        Continue Learning
      </button>
    </div>
  );
}