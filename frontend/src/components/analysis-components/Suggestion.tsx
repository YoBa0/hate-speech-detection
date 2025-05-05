import { Lightbulb } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { fadeVariant } from "../../utils/animationHelper";
import { motion } from "motion/react";

const Suggestion = ({ suggestion }: { suggestion: string | null }) => (
  suggestion ? (
    <motion.div variants={fadeVariant} custom={7} initial="hidden" animate="visible">
      <Alert variant="default" className="pt-2">
        <Lightbulb className="h-4 w-4 text-yellow-500" />
        <AlertTitle className="text-foreground">Suggestion</AlertTitle>
        <AlertDescription className="text-muted-foreground" dir="rtl">{suggestion}</AlertDescription>
      </Alert>
    </motion.div>
  ) : null
);

export default Suggestion;
