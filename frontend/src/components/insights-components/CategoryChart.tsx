import { Pie } from "react-chartjs-2";
import "../../lib/chart-setup";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { useTheme } from "../../components/ThemeContext"; // 👈 import theme hook
import type { CategoryBreakdown } from "../../types/Dashboard";

const COLORS = [
  "#f87171", // Red-400
  "#fb923c", // Orange-400
  "#4ade80", // Green-400
  "#60a5fa", // Blue-400
  "#a78bfa", // Purple-400
];


const CategoryChart = ({ data }: { data: CategoryBreakdown }) => {
  const { theme } = useTheme(); // 👈 get theme
  const labelColor = theme === "dark" ? "#f4f4f5" : "#333"; // 👈 dynamic label color

  const sortedData = [...data].sort((a, b) =>
    a.category.localeCompare(b.category)
  );

  const chartData = {
    labels: sortedData.map((d) => d.category),
    datasets: [
      {
        data: sortedData.map((d) => d.count),
        backgroundColor: COLORS.slice(0, sortedData.length),
        hoverOffset: 8,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 16,
          boxWidth: 12,
          color: labelColor, // ✅ legend label color
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Card className="bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-muted/20 dark:via-muted/10 dark:to-muted/5 shadow-md">
      <CardHeader>
        <CardTitle className="text-base">Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <Pie data={chartData} options={chartOptions} />
      </CardContent>
    </Card>
  );
};

export default CategoryChart;
