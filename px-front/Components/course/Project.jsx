import { Award } from "lucide-react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
} from "lucide-react";

const Project = ({ project, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-6xl mx-auto p-6"
      >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 font-medium mb-6 hover:underline"
      >
        <ArrowLeft size={20} /> Back to Course
      </button>
      <div className="md:col-span-2 bg-linear-to-br from-gray-900 to-gray-800 text-white rounded-xl p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-blue-600 opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-yellow-400" />
            <span className="text-xs font-bold tracking-wider text-yellow-400 uppercase">
              Capstone Project
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-4">
            {project?.projectTitle}
          </h3>
          <p className="text-gray-300 mb-6 max-w-lg">
            {project?.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-sm text-gray-400 uppercase mb-3">
                Core Features
              </h4>
              <ul className="space-y-1">
                {project?.features?.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>{" "}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-400 uppercase mb-3">
                Stretch Goals
              </h4>
              <ul className="space-y-1">
                {project?.stretchGoals?.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>{" "}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-bold text-sm text-gray-400 uppercase mb-3">
                Tech Requirements
              </h4>
              <ul className="space-y-1">
                {project?.requirements?.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>{" "}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-400 uppercase mb-3">
                Steps to Complete Project
              </h4>
              <ul className="space-y-1">
                {project?.steps?.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>{" "}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Project;
