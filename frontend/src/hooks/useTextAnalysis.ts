// hooks/useTextAnalysis.ts
import { useState } from "react";
import { analyzeText } from "../services/textAnalysisService";
import type { AnalysisResultProps } from "../types/Analysis";

export const useTextAnalysis = () => {
  const [text, setText] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisData, setAnalysisData] = useState<AnalysisResultProps | null>(null);

  const analyzeTextHandler = async () => {
    if (!text || isAnalyzing || text.trim() === "") return;

    setIsAnalyzing(true);

    try {
      const result = await analyzeText(text);
      // Validate and shape result before storing
      if (result && result.label && result.original_text) {
        setAnalysisData(result);
      } else {
        console.warn("Invalid API response structure:", result);
      }
    } catch (error) {
      console.error("Error while analyzing text:", error);
      setAnalysisData(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    text,
    setText,
    isAnalyzing,
    analysisData,
    analyzeText: analyzeTextHandler,
  };
};
