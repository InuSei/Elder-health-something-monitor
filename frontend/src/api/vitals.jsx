import { API_BASE_URL, getHeaders } from "./config";

export async function fetchVitals(token) {
  const response = await fetch(`${API_BASE_URL}/vitals/latest`, {
    method: "GET",
    headers: getHeaders(token),
  });
  
  if (response.status === 404) return { heart_rate: 0, spo2: 0 };
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Unknown server error");
  }
  return response.json();
}

export async function fetchVitalsHistory(token) {
  const response = await fetch(`${API_BASE_URL}/vitals/history`, {
    method: "GET",
    headers: getHeaders(token),
  });

  if (!response.ok) throw new Error("Failed to fetch history");
  return response.json();
}