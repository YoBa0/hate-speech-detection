import { Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeContext'; // <-- Import the theme hook
import "../../lib/chart-setup";
import { SeverityDistribution } from '../../types/Dashboard'; // Import the type

const SeverityChart = ({ severityData }: { severityData: SeverityDistribution }) => {
  const { theme } = useTheme(); // <-- Get the current theme!

  const severityChartData = {
    labels: severityData?.map((d) => d.severity) || [],
    datasets: [
      {
        label: 'Severity Distribution',
        data: severityData?.map((d) => d.count) || [],
        backgroundColor: ['#f91914', '#4ade80', '#f59e0b'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'left' as const,
        labels: {
          padding: 16,
          boxWidth: 12,
          color: theme === 'dark' ? '#e4e4e7' : '#333', // <-- Dynamic color based on theme!
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Card className="bg-gradient-to-bl from-purple-100 to-indigo-200 dark:from-muted/20 dark:via-muted/10 dark:to-muted/5 shadow-md">
      <CardHeader>
        <CardTitle className="text-base">Severity Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <Doughnut data={severityChartData} options={chartOptions} />
      </CardContent>
    </Card>
  );
};

export default SeverityChart;
