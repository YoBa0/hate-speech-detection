import { Line } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import "../../lib/chart-setup";
import { CommonKeyword } from "../../types/Dashboard"; // Import the type
import { ChartOptions } from "chart.js"; // Import ChartOptions type
import { useTheme } from "../../components/ThemeContext"; // 🌟 import useTheme

const CommonKeywordsChart = ({
  commonKeywords,
}: {
  commonKeywords: CommonKeyword;
}) => {
  const { theme } = useTheme(); // 🌟 useTheme
  const labelColor = theme === "dark" ? "#f4f4f5" : "#333"; // 🌟 dynamic label color
  const gridColor = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"; // 🌟 grid color

  const keywordChartData = {
    labels: commonKeywords.map((item) => item.keyword),
    datasets: [
      {
        label: "Keyword Frequency",
        data: commonKeywords.map((item) => item.count),
        fill: false,
        borderColor: "#6366f1", // Example color
        tension: 0.3,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 16,
          boxWidth: 12,
          color: labelColor, // ✅ legend label color
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: labelColor, // ✅ x axis label color
        },
        grid: {
          color: gridColor, // ✅ x axis grid color
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: labelColor, // ✅ y axis label color
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
            return null;
          },
        },
        grid: {
          color: gridColor, // ✅ y axis grid color
        },
      },
    },
  };

  return (
    <Card className="bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-muted/20 dark:via-muted/10 dark:to-muted/5 shadow-md">
      <CardHeader>
        <CardTitle className="text-base">Common Keywords</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <Line data={keywordChartData} options={chartOptions} />
      </CardContent>
    </Card>
  );
};

export default CommonKeywordsChart;
