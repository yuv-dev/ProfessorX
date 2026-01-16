"use client";

import { motion } from "framer-motion";

export default function Progress({ value }) {
  return (
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="h-full bg-linear-to-r from-blue-500 to-indigo-500 rounded-full"
      />
    </div>
  );
}
