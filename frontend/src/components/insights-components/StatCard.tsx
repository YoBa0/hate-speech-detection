import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value?: number;
  icon: LucideIcon;
  color?: string; // Tailwind text color class
}

const StatCard = ({
  title,
  value = 0,
  icon: Icon,
  color = "text-primary",
}: StatCardProps) => {
  return (
    <div className="p-6 rounded-2xl shadow-md transition-all duration-300 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-muted/20 dark:via-muted/10 dark:to-muted/5 border border-border flex flex-col justify-between h-40">
      {/* Top-left icon */}
      <div className="flex justify-start">
        <div className="w-12 h-12 flex items-center justify-center">
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      </div>

      {/* Bottom-left text and value */}
      <div className="mt-auto text-left">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
