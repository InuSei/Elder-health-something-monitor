import { API_BASE_URL, getHeaders } from "./config";

export async function fetchNotifications(token) {
  const response = await fetch(`${API_BASE_URL}/notifications`, {
    method: "GET",
    headers: getHeaders(token),
  });

  if (!response.ok) throw new Error("Failed to fetch notifications");
  return response.json();
}