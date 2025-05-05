// Define Severity and Category types as before
export type Severity = "High" | "Medium" | "Low";

// Define Category and Topic types
export type Category =
  | "General Insult"
  | "Gender-Based Hate"
  | "Political Hate"
  | "Ethnic/National Hate"
  | "Religious Hate";

export type Topic =
  | "Politics"
  | "Religion"
  | "Ethnicity"
  | "Media & Journalism"
  | "Economy"
  | "Education"
  | "Healthcare"
  | "Sports"
  | "General"
  | "Business"; 

// Define props for Category
export type CategoryProps = {
  category: Category;
  categoryColor: string;
  categoryDescription: string;
  CategoryIcon: React.ElementType | null;
};

// Define props for Severity
export type SeverityProps = {
  severity: Severity;
  severityColor: string;
  severityDescription: string;
  SeverityIcon: React.ElementType;
};

// Define props for Topic
export type TopicProps = {
  topic: Topic;
  topicColor: string;
  topicDescription: string;
  TopicIcon: React.ElementType | null;
};

// Updated interface for AnalysisResultProps reflecting the backend response
export interface AnalysisResultProps {
  id: number;
  label: "Hate Speech" | "Not Hate Speech";
  label_confidence: number;

  severity: "Low" | "Medium" | "High";
  severity_confidence: number;

  category: 
    | "Ethnic/National Hate"
    | "Religious Hate"
    | "Political Hate"
    | "Gender-Based Hate"
    | "General Insult";
  category_confidence: number;

  topic:
    | "Politics"
    | "Religion"
    | "Ethnicity"
    | "Media & Journalism"
    | "Economy"
    | "Education"
    | "Healthcare"
    | "Sports"
    | "General"
    | "Business";
  topic_confidence: number;

  original_text: string;
  cleaned_text: string;

  offensive_keywords: string[];
  suggested_text: string;
}

