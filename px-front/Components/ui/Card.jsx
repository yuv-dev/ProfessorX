import { motion } from "framer-motion";

export function Card({ children, handleClick, id, className = "" }) {
  return (
    <motion.div
      onClick={() => handleClick(id)}
      className={`bg-white border-2 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className = "" }) {
  return <div className={`px-6 pt-6 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return (
    <div
      className={`px-6 py-4 border-t border-gray-100 bg-gray-50/50 ${className}`}
    >
      {children}
    </div>
  );
}
