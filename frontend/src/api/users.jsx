import { API_BASE_URL, getHeaders } from "./config";

export async function fetchUserProfile(token) {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to load user profile");
  return response.json();
}

export async function updateUserProfile(token, userData) {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to update profile");
  }
  return response.json();
}

export async function claimDevice(token, device_id) {
  const response = await fetch(`${API_BASE_URL}/device/claim`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ device_id }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to claim device");
  }
  return response.json();
}