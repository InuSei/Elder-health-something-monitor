// src/api/config.js
export const API_BASE_URL = "https://lavona-orthodox-leota.ngrok-free.dev";

export const getHeaders = (token) => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
  "ngrok-skip-browser-warning": "true",
});