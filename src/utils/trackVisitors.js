
const API_URL = (
  process.env.REACT_APP_API_URL ||
  "http://localhost:4480"
).replace(/\/+$/, "");

export const trackVisitor = async (page) => {
  try {
    const response = await fetch(`${API_URL}/api/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page }),
      keepalive: true,
    });

    if (!response.ok) {
      console.warn("Tracking failed:", response.status);
    }
  } catch {
    // Analytics must never interrupt website usage.
  }
};
