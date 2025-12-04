const API_BASE_URL = "https://lavona-orthodox-leota.ngrok-free.dev"; // Local FastAPI server

// --- FETCH VITALS ---
export async function fetchVitals(token) {
  const response = await fetch(`${API_BASE_URL}/vitals/me`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  });
  if (response.status === 404) {
    return {vitals: []};
  }
  if (!response.ok) {
    // NEW: Read the error details from the backend
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || "Unknown server error";
    throw new Error(`${response.status}: ${errorMessage}`);
  }
  return response.json();
}

// --- LOGIN ---
export async function loginUser(first_name, last_name, birthday) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ first_name, last_name, birthday }),
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json();
}

// --- SIGNUP ---
export async function signupUser(first_name, last_name, age, birthday, phone_number) {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name,
      last_name,
      age,
      birthday,
      phone_number
    }),
  });
  if (!response.ok) throw new Error("Signup failed");
  return response.json();

}

// --- Device claiming ---
export async function claimDevice(device_id, token) {
  const response = await fetch(`${API_BASE_URL}/device/claim`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // <-- Sends the user's "key"
    },
    body: JSON.stringify({ device_id }), // <-- Sends the device's ID
  });

  // This will handle errors like "Device not found" or "Already claimed"
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to claim device");
  }
  
  return response.json();
}