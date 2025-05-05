import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center gap-6 max-w-4xl w-full px-4 md:px-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-4 rounded-full shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
      >
          <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
      </motion.div>

      <motion.div
        className="flex flex-col text-left"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold leading-tight text-justify text-black dark:text-white">
          Detect Hate Speech in Arabic Instantly
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg mt-2 dark:text-gray-300">
          Paste Arabic text below and let our AI analyze and identify whether it contains hate speech.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
