import { motion } from "motion/react";
import { fadeVariant } from "../../utils/animationHelper";

const Keywords = ({ keywords }: { keywords: string[] }) => (
  <motion.div className="flex flex-col gap-2" variants={fadeVariant} custom={6}>
    <p className="font-medium text-sm text-foreground">Offensive Keywords</p>
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword, index) => (
        <motion.span
          key={index}
          className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7 + index * 0.05,
            duration: 0.3,
          }}
        >
          {keyword}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

export default Keywords;
