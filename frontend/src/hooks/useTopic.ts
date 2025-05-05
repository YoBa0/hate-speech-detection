import { useState, useEffect } from "react";
import {
  Landmark,
  Users,
  Newspaper,
  HandCoins,
  GraduationCap,
  Stethoscope,
  Medal,
  CircleHelp,
  Briefcase,
  BookOpenText,
} from "lucide-react";

import type { Topic, TopicProps } from "../types/Analysis";

// Topic Map with properties
export const topicMap: Record<Topic, TopicProps> = {
  Politics: {
    topic: "Politics",
    topicColor: "bg-red-600 text-white",
    topicDescription: "Covers political opinions, parties, and governance-related content.",
    TopicIcon: Landmark,
  },
  Religion: {
    topic: "Religion",
    topicColor: "bg-purple-700 text-white",
    topicDescription: "Includes religious beliefs, practices, and related sensitive discourse.",
    TopicIcon: BookOpenText,
  },
  Ethnicity: {
    topic: "Ethnicity",
    topicColor: "bg-emerald-200 text-emerald-900",
    topicDescription: "Relates to race, ethnicity, and cultural background topics.",
    TopicIcon: Users,
  },
  "Media & Journalism": {
    topic: "Media & Journalism",
    topicColor: "bg-blue-600 text-white",
    topicDescription: "Comments on news, media houses, or journalism ethics.",
    TopicIcon: Newspaper,
  },
  Economy: {
    topic: "Economy",
    topicColor: "bg-green-600 text-white",
    topicDescription: "Concerns about financial systems, inequality, and economic policy.",
    TopicIcon: HandCoins,
  },
  Education: {
    topic: "Education",
    topicColor: "bg-indigo-500 text-white",
    topicDescription: "Mentions of schools, educational systems, or learning access.",
    TopicIcon: GraduationCap,
  },
  Healthcare: {
    topic: "Healthcare",
    topicColor: "bg-teal-600 text-white",
    topicDescription: "Health-related opinions, policy, or public healthcare discourse.",
    TopicIcon: Stethoscope,
  },
  Sports: {
    topic: "Sports",
    topicColor: "bg-orange-500 text-white",
    topicDescription: "Sports teams, players, events, and fan discussions.",
    TopicIcon: Medal,
  },
  General: {
    topic: "General",
    topicColor: "bg-amber-200 text-amber-900",
    topicDescription: "Content that doesn't strongly align with a specific topic.",
    TopicIcon: CircleHelp,
  },
  Business: {
    topic: "Business",
    topicColor: "bg-pink-600 text-white",
    topicDescription: "Corporate content, entrepreneurship, and market trends.",
    TopicIcon: Briefcase,
  },
};

// Hook
export const useTopic = (topic: Topic | null) => {
  const defaultTopic = topicMap["General"];
  const [topicInfo, setTopicInfo] = useState<TopicProps>(defaultTopic);

  useEffect(() => {
    if (!topic || !topicMap[topic]) return;
    setTopicInfo(topicMap[topic]);
  }, [topic]);

  return topicInfo;
};
