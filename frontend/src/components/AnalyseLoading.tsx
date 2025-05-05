import { BrainCircuit } from "lucide-react";
import { motion } from "motion/react";
const AnalyseLoading = () => {
  return (
    <motion.div
    className="flex flex-col justify-center items-center gap-4 min-h-[300px] rounded-lg bg-gradient-to-tl from-purple-600 to-indigo-600 text-white p-6 shadow-md"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        repeat: Infinity,
        duration: 1.2,
        ease: "easeInOut",
      }}
    >
      <BrainCircuit className="w-12 h-12" />
    </motion.div>
    <motion.p
      className="text-lg font-medium"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      Analyzing...
    </motion.p>
  </motion.div>
  )
}

export default AnalyseLoading