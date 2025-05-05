import { useState, useEffect } from "react";
import { EyeOff, AlertCircle, VenusAndMars, Flag, Feather } from "lucide-react";
import type { Category, CategoryProps } from "../types/Analysis"

// Mapping of categories to their properties
export const categoryMap: Record<Category, CategoryProps> = {
  "General Insult": {
    category: "General Insult",
    categoryColor: "bg-red-100 text-red-800",
    categoryDescription: "Rude or offensive remarks targeting individuals or groups.",
    CategoryIcon: AlertCircle,
  },
  "Gender-Based Hate": {
    category: "Gender-Based Hate",
    categoryColor: "bg-pink-100 text-pink-800",
    categoryDescription: "Hate speech targeting individuals based on gender.",
    CategoryIcon: VenusAndMars,
  },
  "Political Hate": {
    category: "Political Hate",
    categoryColor: "bg-blue-100 text-blue-800",
    categoryDescription: "Hate speech based on political beliefs or affiliations.",
    CategoryIcon: EyeOff,
  },
  "Ethnic/National Hate": {
    category: "Ethnic/National Hate",
    categoryColor: "bg-green-100 text-green-800",
    categoryDescription: "Hate speech targeting individuals based on ethnicity or nationality.",
    CategoryIcon: Flag,
  },
  "Religious Hate": {
    category: "Religious Hate",
    categoryDescription: "Hate speech targeting individuals based on religion.",
    categoryColor: "bg-purple-100 text-purple-800",
    CategoryIcon: Feather, // You can choose a relevant icon for religious hate
  },
};

export const useCategory = (category: Category | null) => {
  const [categoryStyle, setCategoryStyle] = useState<CategoryProps>(categoryMap["General Insult"]);

  useEffect(() => {
    if (!category || !categoryMap[category]) return;

    setCategoryStyle(categoryMap[category]);
  }, [category]); // Re-run when category changes

  return categoryStyle;
};
