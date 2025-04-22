// Centralized API utility for scalable backend communication
// Uses the environment variable REACT_APP_API_URL

const API_BASE_URL = process.env.REACT_APP_API_URL;

if (!API_BASE_URL) {
  throw new Error('REACT_APP_API_URL is not defined! Please set it in your environment variables.');
}

export async function apiFetch<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers),
    },
    credentials: 'include', // For cookies/auth if needed
  });

  if (!response.ok) {
    // Optionally, handle errors globally here
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  // Optionally, handle no-content (204) responses
  if (response.status === 204) return null as T;

  return response.json();
}

// Example usage (remove before production):
// apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
