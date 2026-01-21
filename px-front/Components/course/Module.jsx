"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Target,
  CheckCircle,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import Accordion from "@/Components/ui/Accordion.jsx";

const Module = ({ module, courseId }) => {
  const router = useRouter();
  const onBack = () => {
    router.push(`/dashboard/courses/${courseId}`);
  };
  console.log("Module Data:", module);
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

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
        <div className="bg-blue-600 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">{module.moduleTitle}</h2>
          <p className="opacity-90 text-lg">{module.summary}</p>
        </div>

        <div className="p-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="text-blue-600" /> Learning Outcomes
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {module.learningOutcomes.map((outcome, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg text-blue-900"
              >
                <CheckCircle className="w-5 h-5 mt-0.5 text-blue-600 shrink-0" />
                {outcome}
              </li>
            ))}
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-8">
            <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" /> Important Points
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {module.importantPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">
            Lessons
          </h3>
          <div className="space-y-4">
            {module.lessons.map((lesson, idx) => (
              <Accordion key={idx} title={lesson.lessonTitle} icon={BookOpen}>
                <div className="space-y-4 text-gray-700">
                  <p className="font-medium text-lg text-gray-900">
                    {lesson.explanation}
                  </p>
                  <p>{lesson.detailedDescription}</p>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <span className="font-bold block text-sm text-gray-500 uppercase mb-1">
                        Analogy
                      </span>
                      <p className="italic">{lesson.analogy}</p>
                    </div>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <span className="font-bold block text-gray-500 uppercase mb-1 select-none">
                        Example
                      </span>
                      {lesson.examples}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-bold text-blue-600 mb-2">
                      Practice Tasks:
                    </h4>
                    <ul className="list-disc list-inside pl-2">
                      {lesson.practiceTasks.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 bg-pink-50 p-4 rounded-lg border border-pink-200">
                    <h4 className="font-bold text-pink-600 mb-2">
                      MiniQuiz:
                      <span className="text-gray-700 text-xs">
                        {" "}
                        #Search answers yourself!
                      </span>
                    </h4>
                    <ul className="list-disc list-inside pl-2">
                      {lesson.miniQuiz.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Module;
