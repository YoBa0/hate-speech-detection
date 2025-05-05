import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getDashboardSummary } from "../services/dashboardService";
import StatCard from "../components/insights-components/StatCard";
import MetaLegend from "../components/MetaLegend";
import TopicTrendsChart from "../components/insights-components/TopicTrendsChart";
import SeverityChart from "../components/insights-components/SeverityChart";
import CommonKeywordsChart from "../components/insights-components/CommonKeywordsChart";
import { FileText, MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import CategoryChart from "../components/insights-components/CategoryChart";
import SampleCases from "../components/insights-components/SampleCases";
import type {
  Totals,
  CategoryBreakdown,
  SeverityDistribution,
  TopicTrend,
  SampleCase,
  CommonKeyword,
} from "../types/Dashboard";
import FeedbackSamples from "../components/insights-components/FeedbackSamples";

const Insights = () => {
  const [totals, setTotals] = useState<Totals>({
    total_hate_speech: 0,
    total_safe: 0,
    total_texts: 0,
  });
  const [categoryData, setCategoryData] = useState<CategoryBreakdown>([]);
  const [severityData, setSeverityData] = useState<SeverityDistribution>([]);
  const [topicTrends, setTopicTrends] = useState<TopicTrend>([]);
  const [sampleCases, setSampleCases] = useState<SampleCase>([]);
  const [commonKeywords, setCommonKeywords] = useState<CommonKeyword>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summary = await getDashboardSummary();

        setTotals({
          total_texts: summary.totals?.total_texts || 0,
          total_hate_speech: summary.totals?.total_hate_speech || 0,
          total_safe: summary.totals?.total_safe || 0,
        });

        setCategoryData(summary.category_breakdown || []);
        setSeverityData(summary.severity_distribution || []);
        setTopicTrends(summary.topic_trends || []);
        setSampleCases(summary.sample_cases || []);
        setCommonKeywords(summary.common_keywords || []);
      } catch (error) {
        console.error("Error fetching dashboard summary", error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-4 md:p-12 dark:bg-background min-h-screen transition-colors"
    >
      <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Hate Speech Insights
      </h1>

      {/* Stat Cards + Category Chart in a 2-column grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Total Texts"
            value={totals.total_texts}
            icon={MessageCircle}
            color="text-blue-600 dark:text-blue-400"
          />
          <StatCard
            title="Topics"
            value={10} // You can make this dynamic later if needed
            icon={FileText}
            color="text-sky-600 dark:text-sky-400"
          />
          <StatCard
            title="Hate Speech"
            value={totals.total_hate_speech}
            icon={ThumbsDown}
            color="text-red-600 dark:text-red-400"
          />
          <StatCard
            title="Safe Speech"
            value={totals.total_safe}
            icon={ThumbsUp}
            color="text-green-600 dark:text-green-400"
          />
        </div>
        <CategoryChart data={categoryData} />
      </motion.div>

      {/* Topic Trends + Common Keywords */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <TopicTrendsChart topicTrends={topicTrends} />
        <CommonKeywordsChart commonKeywords={commonKeywords} />
      </motion.div>

      {/* Severity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
      >
        <SeverityChart severityData={severityData} />
        <FeedbackSamples />
      </motion.div>

      {/* Sample Cases */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="mt-6"
      >
        <SampleCases sampleCases={sampleCases} />
      </motion.div>

      {/* Meta Legend */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="mt-6"
      >
        <MetaLegend />
      </motion.div>
    </motion.div>
  );
};

export default Insights;
