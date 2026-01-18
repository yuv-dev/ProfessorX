import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"; // Import icons
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const MiniProjectSlider = ({ projects }) => {
    console.log("MiniProjectSlider projects:", projects);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  // Auto-play logic
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Changes every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header / Controls */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">
          Mini Project {currentIndex + 1} / {projects.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Slide Content */}
      <div className="relative overflow-hidden grow p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col"
          >
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
                      <CheckCircle
                        size={14}
                        className="text-green-500 shrink-0"
                      />
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
        </AnimatePresence>
      </div>

      {/* Progress Bar (Visual Timer) */}
      <div className="h-1 bg-gray-100 w-full">
        {!isPaused && (
          <motion.div
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-blue-500"
          />
        )}
      </div>
    </div>
  );
};

export default MiniProjectSlider;
