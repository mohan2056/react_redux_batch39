import axios from "axios";

const apiClient = axios.create({
    baseURL : 'http://localhost:3002/api',
    timeout:10000,
    headers: { "Content-Type": "application/json" },
});

// Handles your API response: { success: true, data: [...] }
export function unwrapApiResponse(response) {
  const body = response.data;
  if (body && typeof body === "object" && body.success === false) {
    throw new Error(body.message || "API request failed");
  }
  return body?.data !== undefined ? body.data : body;
}

export default apiClient;