import { useState, useEffect } from "react";
import { Angry, Annoyed, Smile } from "lucide-react";
import type { Severity, SeverityProps } from "../types/Analysis";

// Mapping of severities to their properties
export const severityMap: Record<Severity, SeverityProps> = {
  High: {
    severity: "High",
    severityColor: "bg-red-500 text-white",
    severityDescription: "High Severity - Content is strongly offensive and potentially harmful.",
    SeverityIcon: Angry,
  },
  Medium: {
    severity: "Medium",
    severityColor: "bg-yellow-500 text-white",
    severityDescription: "Medium Severity - Content is offensive but less harmful.",
    SeverityIcon: Annoyed,
  },
  Low: {
    severity: "Low",
    severityColor: "bg-green-400 text-white",
    severityDescription: "Low Severity - Mildly offensive or inappropriate language.",
    SeverityIcon: Smile,
  },
};

export const useSeverity = (severity: Severity | null) => {
  const [severityInfo, setSeverityInfo] = useState<SeverityProps>(severityMap["Low"]); // Default to "Low"

  useEffect(() => {
    if (!severity || !severityMap[severity]) return;

    setSeverityInfo(severityMap[severity]);
  }, [severity]); // Re-run when severity changes

  return severityInfo;
};
