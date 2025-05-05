import { useEffect, useState } from "react";
import { Progress } from "../components/ui/progress";
import { Info, Frown, Meh, Smile } from "lucide-react";
import { motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

interface ConfidenceProgressProps {
  confidence: number | null;
}

const ConfidenceProgress = ({ confidence }: ConfidenceProgressProps) => {
  const [confidenceProgress, setConfidenceProgress] = useState(0);

  useEffect(() => {
    if (confidence !== null) {
      const percentage = Math.floor(confidence * 1000) / 10; // Convert to percentage without rounding
      setConfidenceProgress(0);
      const interval = setInterval(() => {
        setConfidenceProgress((prev) => {
          if (prev < percentage) return Math.min(prev + 2, percentage);
          if (prev > percentage) return Math.max(prev - 2, percentage);
          clearInterval(interval);
          return prev;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [confidence]);

  const colorClasses = {
    low: {
      indicator: "bg-red-500",
      track: "bg-red-500/20",
    },
    moderate: {
      indicator: "bg-yellow-500",
      track: "bg-yellow-500/40",
    },
    high: {
      indicator: "bg-green-500",
      track: "bg-green-500/20",
    },
  };

  const getColorClass = (value: number) => {
    if (value < 40) return colorClasses.low;
    if (value < 70) return colorClasses.moderate;
    return colorClasses.high;
  };

  const getIcon = (value: number) => {
    if (value < 40) return <Frown className="text-red-500 w-4 h-4" />;
    if (value < 70) return <Meh className="text-yellow-500 w-4 h-4" />;
    return <Smile className="text-green-500 w-4 h-4" />;
  };

  const color = getColorClass(confidenceProgress);

  return (
    <>
      {confidence !== null && (
        <div className="relative w-full">
          {/* Progress Bar with dynamic color */}
          <div className="relative">
            <Progress
              value={confidenceProgress}
              indicatorColor={color.indicator}
              trackColor={color.track}
              className="h-5 rounded-full overflow-hidden"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <motion.span
                className="text-white font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {confidenceProgress}%
              </motion.span>
            </div>
          </div>

          {/* Icon + Tooltip Info */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              {getIcon(confidenceProgress)}
              <p className="text-sm text-muted-foreground">
                {confidenceProgress < 40
                  ? "Low"
                  : confidenceProgress < 70
                  ? "Moderate"
                  : "High"}{" "}
                confidence
              </p>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-xs text-muted-foreground hover:underline cursor-pointer">
                    <Info className="w-4 h-4 mr-1" />
                    More info
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-xs max-w-xs">
                  This score reflects how confident the AI is in its analysis. A higher score means greater certainty.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfidenceProgress;
