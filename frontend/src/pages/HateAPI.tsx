import { motion } from 'motion/react'; // Import motion from framer-motion

const HateApi = () => {
  const baseUrl = import.meta.env.VITE_FLASK_API_BASE_URL;

  const demoResponse = {
    category: "General Insult",
    category_confidence: 0.999,
    cleaned_text: "انت غبي وما تفهم شي",
    label: "Hate Speech",
    label_confidence: 0.9992,
    offensive_keywords: ["غبي"],
    original_text: "أنت غبي وما تفهم شي",
    severity: "Low",
    severity_confidence: 0.9985,
    suggested_text: "يبدو أنك تحتاج إلى مزيد من التوضيح.",
    topic: "General",
    topic_confidence: 0.9867,
  };

  return (
    <div className="p-2 md:p-6 max-w-7xl mx-auto dark:bg-zinc-900 dark:text-white rounded-2xl">
      <motion.h2
        className="text-2xl font-semibold text-center mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hate Speech Detection API Integration
      </motion.h2>

      <motion.p
        className="mb-4 p-2 center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        The <code>/api/open_hate/detect</code> endpoint is used for detecting
        hate speech in Arabic text. You can send a POST request to this endpoint
        with the text to analyze, like so:
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div
          className="p-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-2">API Request Example</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto dark:bg-zinc-800 dark:text-white whitespace-pre-wrap break-words text-sm md:text-base">
            {`POST ${baseUrl}/api/open_hate/detect
Content-Type: application/json
Body:
{
  "text": "انت غبي وما تفهم شي"
}`}
          </pre>
        </motion.div>

        <motion.div
          className="p-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-2">API Response (JSON)</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto dark:bg-zinc-800 dark:text-white whitespace-pre-wrap break-words text-sm md:text-base">
            {JSON.stringify(demoResponse, null, 2)}
          </pre>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HateApi;
