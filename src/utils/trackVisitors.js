// utils/trackVisitor.js
const API_URL = process.env.REACT_APP_API_URL || "https://pms-tracker-3.onrender.com";

export const trackVisitor = async (page) => {
  try {
    const response = await fetch(`${API_URL}/api/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page }),
    });
    
    if (!response.ok) {
      console.log("Tracking failed with status:", response.status);
    }
  } catch (err) {
    // Silent fail - don't affect user experience
    console.log("Tracking failed (offline or server issue)");
  }
};

// Optional: Track custom events
// export const trackEvent = async (eventName, eventData = {}) => {
//   try {
//     await fetch(`${API_URL}/api/track-event`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         event: eventName,
//         data: eventData,
//         page: window.location.pathname,
//       }),
//     });
//   } catch (err) {
//     console.log("Event tracking failed");
//   }
// };