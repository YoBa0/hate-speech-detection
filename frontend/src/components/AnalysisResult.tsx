import { motion } from "motion/react";
import { BrainCircuit } from "lucide-react";
import StatusIcon from "./analysis-components/StatusIcon";
import InfoCard from "./analysis-components/InfoCard"; // Updated import
import Keywords from "./analysis-components/Keywords";
import Suggestion from "./analysis-components/Suggestion";
import ConfidenceProgress from "./ConfidenceProgress";

import { fadeVariant } from "../utils/animationHelper";
import { AnalysisResultProps } from "../types/Analysis";
import { useSeverity } from "../hooks/useSeverity";
import { useCategory } from "../hooks/useCategory";
import { useTopic } from "../hooks/useTopic"; // ✅ useTopic

const AnalysisResult = ({
  analysisData,
}: {
  analysisData: AnalysisResultProps;
}) => {
  const { label } = analysisData || {};
  const { severity, severityColor, severityDescription, SeverityIcon } =
    useSeverity(analysisData?.severity);
  const { category, categoryColor, categoryDescription, CategoryIcon } =
    useCategory(analysisData?.category);
  const { topic, topicColor, topicDescription, TopicIcon } = useTopic(
    analysisData?.topic
  ); // ✅ useTopic

  const hasHateSpeech = label === "Hate Speech";

  return (
    <motion.div
      className="shadow-md rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col relative"
      initial="hidden"
      animate="visible"
      variants={fadeVariant}
    >
      {/* Header */}
      {label && (
        <motion.div
          className="w-full flex flex-col justify-center p-4 items-center bg-gradient-to-br from-purple-600 to-indigo-500 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BrainCircuit className="w-10 h-10 mb-2" />
          <p className="text-xl font-semibold">AI Analysis</p>
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        className="p-4 flex flex-col gap-6"
        variants={fadeVariant}
        custom={1}
      >
        {/* Grid with Status + Category, then Severity + Topic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First column: StatusIcon */}
          <StatusIcon label={label} />

          {/* Second column: Category */}
          {hasHateSpeech && CategoryIcon && (
            <InfoCard
              data={{
                title: category,
                color: categoryColor,
                description: categoryDescription,
                Icon: CategoryIcon,
                badgeText:"Category",
              }}
            />
          )}

          {/* Third column: Severity */}
          {hasHateSpeech && (
            <InfoCard
              data={{
                title: severity,
                color: severityColor,
                description: severityDescription,
                Icon: SeverityIcon,
                badgeText:"Severity",
              }}
            />
          )}

          {/* Fourth column: Topic */}
          {topic && TopicIcon && (
            <InfoCard
              data={{
                title: topic,
                color: topicColor,
                description: topicDescription,
                Icon: TopicIcon,
                badgeText:"Topic",
              }}
            />
          )}
        </div>

        {/* Confidence Progress */}
        {analysisData.label_confidence !== undefined && (
          <motion.div
            className="flex flex-col gap-2 mx-auto w-full lg:w-3/4"
            variants={fadeVariant}
            custom={5}
          >
            <ConfidenceProgress confidence={analysisData.label_confidence} />
          </motion.div>
        )}

        {/* Offensive Keywords */}
        {analysisData.offensive_keywords &&
          analysisData.offensive_keywords.length > 0 && (
            <motion.div className="mt-4" variants={fadeVariant} custom={6}>
              <Keywords keywords={analysisData.offensive_keywords} />
            </motion.div>
          )}

        {/* Suggested Text */}
        {analysisData.suggested_text && (
          <motion.div className="mt-4" variants={fadeVariant} custom={7}>
            <Suggestion suggestion={analysisData.suggested_text} />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AnalysisResult;
