import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeContext'; // <-- Import the theme hook
import "../../lib/chart-setup";
import { TopicTrend } from '../../types/Dashboard'; // Import the TopicTrend type

const colors = [
  '#8b5cf6', // Purple
  '#f43f5e', // Red
  '#f59e0b', // Yellow
  '#10b981', // Green
  '#3b82f6', // Blue
  '#9333ea', // Violet
  '#e11d48', // Pink
  '#34d399', // Teal
  '#60a5fa', // Sky Blue
  '#eab308', // Amber
];

const TopicTrendsChart = ({ topicTrends }: { topicTrends: TopicTrend }) => {
  const { theme } = useTheme(); // <-- Get the current theme!

  const labelColor = theme === 'dark' ? '#e4e4e7' : '#333'; // <-- Dynamic label color

  const topicChartData = {
    labels: topicTrends?.map((d) => d.topic) || [],
    datasets: [
      {
        label: 'Mentions',
        data: topicTrends?.map((d) => d.count) || [],
        backgroundColor: topicTrends?.map((_, index) => colors[index % colors.length]) || [],
        width: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 16,
          boxWidth: 12,
          color: labelColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: labelColor,
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        },
      },
      y: {
        ticks: {
          color: labelColor,
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  
  return (
    <Card className="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-muted/20 dark:via-muted/10 dark:to-muted/5 shadow-md">
      <CardHeader>
        <CardTitle className="text-base"> Hate Trending Topics</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <Bar data={topicChartData} options={chartOptions} />
      </CardContent>
    </Card>
  );
};

export default TopicTrendsChart;
