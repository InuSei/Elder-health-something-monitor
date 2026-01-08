import { API_BASE_URL } from "./config";

export async function loginUser(first_name, last_name, birthday) {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ first_name, last_name, birthday }),
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json();
}

export async function signupUser(first_name, last_name, age, birthday, phone_number) {
  const response = await fetch(`${API_BASE_URL}/auth/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ first_name, last_name, age, birthday, phone_number }),
  });
  if (!response.ok) throw new Error("Signup failed");
  return response.json();
}