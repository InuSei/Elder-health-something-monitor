// src/api/config.js
export const API_BASE_URL = "beneficial-determination-production-2c43.up.railway.app";

export const getHeaders = (token) => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
  "ngrok-skip-browser-warning": "true",
});