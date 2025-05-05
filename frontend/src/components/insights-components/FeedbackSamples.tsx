import { useEffect, useState } from 'react';
import { getFeedbackSamples } from '../../services/feedbackService';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

interface FeedbackSample {
  id: number;
  feedback_text: string;
  created_at: string;
  original_text: string;
  label: string;
}

const labelColors: Record<string, string> = {
  "Hate Speech": "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
  "Offensive Language": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  "Neutral": "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
  // Add more if needed
};

const FeedbackSamples = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackSample[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await getFeedbackSamples();
        setFeedbacks(data);
      } catch (error) {
        console.error('Error loading feedback samples:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-500 animate-pulse">Loading feedback samples...</div>;
  }

  if (feedbacks.length === 0) {
    return <div className="text-center py-8 text-gray-500 flex justify-center items-center">No feedback samples available.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="p-6 rounded-2xl border bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-muted/20 dark:via-muted/10 dark:to-muted/5 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="text-md font-semibold text-gray-800 dark:text-gray-200">
            Feedback Samples
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="p-4 rounded-2xl bg-white dark:bg-muted shadow-sm transition"
            >
              <div className="text-gray-800 dark:text-gray-100 mb-2 text-sm font-semibold">
                "{feedback.original_text}"
              </div>

              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${labelColors[feedback.label] || 'bg-gray-100 text-gray-600 dark:bg-muted dark:text-gray-300'}`}>
                  {feedback.label}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  <span className="font-semibold mr-2">Feedback:</span>
                  {feedback.feedback_text}
                </p>
                <span className="text-gray-400 dark:text-gray-500 text-xs whitespace-nowrap">
                  {format(new Date(feedback.created_at), 'MMM d, yyyy HH:mm')}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackSamples;
