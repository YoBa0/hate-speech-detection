import axios from 'axios';

// ✅ Optimized API call for Dashboard Summary
export const getDashboardSummary = async () => {
  try {
    const response = await axios.get("api/dashboard/dashboard-summary");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard summary", error);
    throw error;
  }
};