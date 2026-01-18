"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Clock } from "lucide-react";

const RoadMap = (data) => {
  const [showRoadmap, setShowRoadmap] = useState(false);

  if (!data) return null;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-1">
      <div className="bg-pink-50 rounded-xl p-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="text-pink-600" /> Course Roadmap
          </h2>

          <div className="flex items-center gap-3 mt-2 md:mt-0">
            <span className="text-sm font-bold text-gray-600 bg-white/50 px-3 py-1 rounded-full border border-pink-100">
              {data?.roadmap?.duration}
            </span>

            {/* TOGGLE BUTTON */}
            <button
              onClick={() => setShowRoadmap(!showRoadmap)}
              className="flex items-center gap-1 text-pink-700 font-bold hover:bg-pink-100 px-3 py-1 rounded-lg transition-colors text-sm"
            >
              {showRoadmap ? (
                <>
                  Hide Schedule <ChevronUp size={16} />
                </>
              ) : (
                <>
                  View Schedule <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Content */}
        <AnimatePresence>
          {showRoadmap && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <div className="bg-white/80 backdrop-blur rounded-xl p-6 border border-pink-100 shadow-inner">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.roadmap?.dailyPlan?.map((day, idx) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }} // Stagger effect
                        key={idx}
                        className="flex items-center gap-3 p-2 rounded hover:bg-pink-50 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                        <span className="text-gray-700 font-medium">{day}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RoadMap;
