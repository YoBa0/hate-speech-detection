import { motion } from "motion/react";

const Placeholder = () => {
  const baseTransition = {
    duration: 4,
    ease: "easeInOut",
  };

  // All the paths from your brain SVG
  const brainPaths = [
    "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
    "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
    "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",
    "M17.599 6.5a3 3 0 0 0 .399-1.375",
    "M6.003 5.125A3 3 0 0 0 6.401 6.5",
    "M3.477 10.896a4 4 0 0 1 .585-.396",
    "M19.938 10.5a4 4 0 0 1 .585.396",
    "M6 18a4 4 0 0 1-1.967-.516",
    "M19.967 17.484A4 4 0 0 1 18 18",
  ];

  return (
    <div className="relative h-[300px] w-full">
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600 flex items-center justify-center rounded-lg shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center text-center text-white">
        <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center shadow-md bg-white text-indigo-600">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {brainPaths.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  ...baseTransition,
                  delay: 0.3 * i,
                }}
              />
            ))}
          </motion.svg>
        </div>
        <p className="text-xl font-semibold tracking-wide">
          Powerful AI Analysis
        </p>
      </div>
    </motion.div>
    </div>
  );
};

export default Placeholder;
