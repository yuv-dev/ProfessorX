import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { CheckCircle } from "lucide-react";

const MiniProject = () => {
    
  return (
    <div className="relative overflow-hidden grow p-6">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="h-full flex flex-col"
      >
        <button className="flex items-center gap-2 text-blue-600 font-medium mb-6 hover:underline">
          <ArrowLeft size={20} /> Back to Course
        </button>
        <h3 className="text-xl font-bold mb-3 text-blue-600">
          {projects[currentIndex].projectTitle}
        </h3>
        <p className="text-gray-600 text-sm mb-6 grow">
          {projects[currentIndex].description}
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-xs text-gray-400 uppercase mb-2">
              Requirements
            </h4>
            <div className="space-y-2">
              {projects[currentIndex].requirements.map((req, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <CheckCircle size={14} className="text-green-500 shrink-0" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs text-gray-400 uppercase mb-2">
              Roadmap Steps
            </h4>
            <div className="flex flex-wrap gap-2">
              {projects[currentIndex].steps.map((step, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200"
                >
                  {i + 1}. {step}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MiniProject;
