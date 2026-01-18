import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QuizItem = ({ quizData, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleOptionClick = (option) => {
    if (selected) return; // Prevent changing answer

    const correct = option === quizData.correctAnswer;
    setSelected(option);
    setIsCorrect(correct);

    // Send data back to parent for analysis
    onAnswer({
      quizId: quizData.id || quizData.question, // Fallback ID
      question: quizData.question,
      selectedOption: option,
      isCorrect: correct,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 mb-4">
      <h4 className="font-bold text-gray-900 mb-4 text-lg">
        {quizData.question}
      </h4>
      <div className="space-y-3">
        {quizData.options.map((option, idx) => {
          // Determine styles based on state
          let baseStyle =
            "w-full text-left p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ";

          if (selected === null) {
            // Default State
            baseStyle +=
              "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50";
          } else if (option === quizData.correctAnswer) {
            // This is the Correct Answer (Always show green if answered)
            baseStyle +=
              "bg-green-50 border-green-500 text-green-800 font-medium";
          } else if (selected === option && !isCorrect) {
            // User selected this, and it was WRONG
            baseStyle += "bg-red-50 border-red-500 text-red-800";
          } else {
            // Other unselected options
            baseStyle += "bg-gray-100 border-transparent opacity-50";
          }

          return (
            <button
              key={idx}
              disabled={selected !== null}
              onClick={() => handleOptionClick(option)}
              className={baseStyle}
            >
              <span>{option}</span>
              {selected !== null && option === quizData.correctAnswer && (
                <CheckCircle size={20} className="text-green-600" />
              )}
              {selected === option && !isCorrect && (
                <XCircle size={20} className="text-red-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Message */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 text-sm font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}
          >
            {isCorrect
              ? "🎉 Correct! Well done."
              : "❌ Incorrect. Review the topic again."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizItem;
