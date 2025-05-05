import axios from "axios";
import { toast } from "sonner";
import { CircleAlert } from "lucide-react";

export const analyzeText = async (text: string) => {
  
  try {
    const response = await axios.post("/api/hate_speech/detect", { text });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.error || "Something went wrong", {
        icon: <CircleAlert className="text-red-500 mr-8" />,
      });
    } else {
      toast.error("Unexpected error occurred", {
        icon: <CircleAlert className="text-red-500 mr-8" />,
      });
    }

    throw error;
  }
};
