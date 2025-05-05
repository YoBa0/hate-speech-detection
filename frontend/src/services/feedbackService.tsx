// services/feedbackService.js
import axios from 'axios';


// Function to submit feedback
export const submitFeedback = async (analysisId: number, feedbackText: string) => {
  try {
    const response = await axios.post('/api/feedback/submit_feedback', {
      analysis_id: analysisId,
      feedback_text: feedbackText,
    });
    return response.data; // Return response data after successful submission
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error; // Throw error to handle it in the component
  }
};

// Function to get feedback samples
export const getFeedbackSamples = async () => {
  try {
    const response = await axios.get('/api/feedback/get_feedback_samples');
    return response.data.feedback_samples; // Return the array of feedback samples
  } catch (error) {
    console.error('Error fetching feedback samples:', error);
    throw error;
  }
};