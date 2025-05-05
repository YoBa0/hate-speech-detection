import { TriangleAlert, CircleCheck } from "lucide-react";
import { motion } from "motion/react";

const StatusIcon = ({ label }: { label: string | null }) => {
  if (label === "Hate Speech") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-4 shadow-md w-full"
      >
        <div className="flex items-center gap-3 mb-1">
          <TriangleAlert className="w-5 h-5 text-white" />
          <p className="text-md font-semibold">Hate Speech Detected</p>
        </div>
        <p className="text-sm text-indigo-100 mt-2">
          This text may contain offensive or harmful language.
        </p>
      </motion.div>
    );
  } else if (label === "Not Hate Speech") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-4 shadow-md w-full"
      >
        <div className="flex items-center gap-3 mb-1">
          <CircleCheck className="w-5 h-5 text-white" />
          <p className="text-md font-semibold">No Hate Speech Detected</p>
        </div>
        <p className="text-sm text-indigo-100 mt-2">
          The content appears to be free of offensive language.
        </p>
      </motion.div>
    );
  }

  return null;
};

export default StatusIcon;
