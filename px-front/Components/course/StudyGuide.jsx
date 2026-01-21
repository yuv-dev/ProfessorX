"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function StudyGuide({ data }) {
  const [showStudyGuide, setShowStudyGuide] = useState(false);

  if (!data) return null;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-1">
      <div className="bg-teal-50 rounded-xl p-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            StudyGuide
          </h2>

          <div className="flex items-center gap-3 mt-2 md:mt-0">
            {/* TOGGLE BUTTON */}
            <button
              onClick={() => setShowStudyGuide(!showStudyGuide)}
              className="flex items-center gap-1 text-teal-700 font-bold hover:bg-teal-100 px-3 py-1 rounded-lg transition-colors text-sm"
            >
              {showStudyGuide ? (
                <>
                  Hide <ChevronUp size={16} />
                </>
              ) : (
                <>
                  View <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Content */}
        <AnimatePresence>
          {showStudyGuide && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {/* 'prose' enables the typography styles.
        'prose-indigo' sets the bullet/link colors to indigo.
        'max-w-none' prevents the text from being too narrow.
      */}
              <div className="prose prose-indigo prose-slate max-w-none pt-4 border-t border-teal-300">
                <ReactMarkdown>{data}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
