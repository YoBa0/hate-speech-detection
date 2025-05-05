export type Totals = {
    total_hate_speech: number;
    total_safe: number;
    total_texts: number;
  };
  
  export type CategoryItem = {
    category: string;
    count: number;
  };
  
  export type CategoryBreakdown = CategoryItem[];
  
  export type SeverityItem = {
    severity: 'Low' | 'Medium' | 'High';
    count: number;
  };
  
  export type SeverityDistribution = SeverityItem[];
  
  export type TopicTrendItem = {
    topic: string;
    count: number;
    date: string;
  };
  
  export type TopicTrend = TopicTrendItem[];
  
  export type CommonKeywordItem = {
    keyword: string;
    count: number;
  };
  
  export type CommonKeyword = CommonKeywordItem[];
  
  export type SampleCase = {
    original_text: string;
    cleaned_text: string;
    offensive_keywords: string[];
    suggested_text: string;
    severity: 'Low' | 'Medium' | 'High';
    category: string;
    topic: string;
    timestamp: string;
  }[];
  