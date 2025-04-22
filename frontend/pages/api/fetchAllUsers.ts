import axios from "axios";

export async function fetchAllUsers(token: string, role?: string) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const url = role ? `${API_BASE}/users?role=${role}` : `${API_BASE}/users`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
