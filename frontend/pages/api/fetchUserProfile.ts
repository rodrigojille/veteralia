import axios from "axios";

export async function fetchUserProfile(token: string) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const res = await axios.get(`${API_BASE}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
