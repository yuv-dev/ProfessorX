"use client";
import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ percentage }) => {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className="w-full bg-white rounded-full h-2.5 dark:bg-white">
      <motion.div
        className="h-2.5 rounded-full "
        style={{
          background: `linear-gradient(90deg, blue 0%, #A865C9 100%)`,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${clampedPercentage}%` }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="relative w-full h-full">
          
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressBar;
