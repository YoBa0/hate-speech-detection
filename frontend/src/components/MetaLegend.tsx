import { categoryMap } from "../hooks/useCategory";
import { topicMap } from "../hooks/useTopic";
import { severityMap } from "../hooks/useSeverity";

const Section = ({
  title,
  items,
}: {
  title: string;
  items: {
    title: string;
    description: string;
    color: string;
    icon: React.ElementType;
  }[];
}) => (
  <div className="mb-10">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map(({ title, description, color, icon: Icon }) => (
        <div
          key={title}
          className={`rounded-xl p-4 shadow-md flex items-start gap-3 ${color}`}
        >
          <Icon className="w-6 h-6 mt-1 shrink-0" />
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm opacity-90">{description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 🔁 Normalize maps to { title, description, color, icon }
const normalizeCategoryMap = Object.values(categoryMap).map(
  ({ category, categoryDescription, categoryColor, CategoryIcon }) => ({
    title: category,
    description: categoryDescription,
    color: categoryColor,
    icon: CategoryIcon,
  })
);

const normalizeSeverityMap = Object.values(severityMap).map(
  ({ severity, severityDescription, severityColor, SeverityIcon }) => ({
    title: severity,
    description: severityDescription,
    color: severityColor,
    icon: SeverityIcon,
  })
);

const normalizeTopicMap = Object.values(topicMap)
  .filter(({ TopicIcon }) => TopicIcon) // Remove nulls if any
  .map(({ topic, topicDescription, topicColor, TopicIcon }) => ({
    title: topic,
    description: topicDescription,
    color: topicColor,
    icon: TopicIcon!,
  }));

const MetaLegend = () => {
  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto">
      <Section title="🧩 Categories" items={normalizeCategoryMap} />
      <Section title="🚨 Severity Levels" items={normalizeSeverityMap} />
      <Section title="🗂️ Topics" items={normalizeTopicMap} />
    </div>
  );
};

export default MetaLegend;
