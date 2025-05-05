import { motion } from "motion/react";

interface InfoCardProps {
  data: {
    title: string;
    color: string;
    description: string;
    Icon: React.ElementType;
    badgeText: string; // <-- New prop for the small badge
  };
}

const InfoCard = ({ data }: InfoCardProps) => {
  const { title, color, description, Icon, badgeText } = data;

  return (
    <motion.div
      className={`flex flex-col gap-2 p-4 rounded-lg border ${color} bg-opacity-10`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center justify-between text-sm font-medium">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          <p className="text-md">{title}</p>
        </div>
        <div className="rounded-2xl bg-white/40 px-2 py-1">
          <p className="text-[10px] text-gray-600">{badgeText}</p>
        </div>
      </div>
      <p className={`text-sm ${color}/40`}>{description}</p>
    </motion.div>
  );
};

export default InfoCard;
