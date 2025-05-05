import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import HeroSection from "../components/HeroSection";
import AnalysisResult from "../components/AnalysisResult";
import { Textarea } from "../components/ui/textarea";
import { useTextAnalysis } from "../hooks/useTextAnalysis";
import AnalyseLoading from "../components/AnalyseLoading";
import Placeholder from "../components/AnalysisPlaceholder";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { submitFeedback } from "../services/feedbackService"; // Import the service
import { toast } from "sonner"; // Import the Sonner toast library

const Home = () => {
  const { text, setText, analyzeText, isAnalyzing, analysisData } = useTextAnalysis();
  
  // State to manage feedback text input
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle submission state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state

  const handleSubmitFeedback = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    try {
      // Assuming `analysisData.id` is the ID of the analysis result
      const analysisId = analysisData?.id;
      if (analysisId && feedback.trim()) {
        await submitFeedback(analysisId, feedback);
        setFeedback(""); // Clear feedback after submission
        toast.success("Feedback submitted successfully!"); // Show success toast using Sonner
        setIsDialogOpen(false); // Close the dialog after submission
      } else {
        toast.error("Please provide feedback before submitting.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center p-3 md:p-4 bg-white dark:bg-background transition-colors duration-300">
      <HeroSection />
      {/* 2-Column Layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:p-8">
        {/* Left Column: Textarea + Floating Buttons */}
        <div className="flex flex-col h-full relative">
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="...اكتب أو الصق النص العربي هنا"
              dir="rtl"  // Set direction to RTL
              className="w-full p-4 h-full min-h-[300px] text-right text-lg resize-none bg-white dark:bg-muted/10 text-black dark:text-white placeholder:text-muted-foreground dark:placeholder:text-muted-foreground-dark"
            />

            {/* Floating Buttons */}
            <motion.div
              className="absolute bottom-4 right-4 flex gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={analyzeText}>Analyze</Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" onClick={() => setText("")}>
                  Reset
                </Button>
              </motion.div>
              {/* Feedback Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" disabled={!analysisData}>
                     Send Feedback
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogTitle>Provide Feedback</DialogTitle>
                    <DialogDescription>
                      Please provide your feedback regarding the analysis result.
                    </DialogDescription>
                    <Textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Enter your feedback here"
                      className="w-full p-4 h-[200px] resize-none bg-white dark:bg-muted/10 text-black dark:text-white placeholder:text-muted-foreground dark:placeholder:text-muted-foreground-dark"
                    />
                    <DialogFooter>
                      <Button
                        onClick={handleSubmitFeedback}
                        disabled={isSubmitting || !feedback.trim()}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Feedback"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: Analysis */}
        <div className="w-full">
          {isAnalyzing ? (
            <AnalyseLoading />
          ) : (
            analysisData ? (
              <AnalysisResult analysisData={analysisData} />
            ) : (
              <Placeholder />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
