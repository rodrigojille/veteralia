// Utility for admin API calls (pending vet profiles, approve, etc.)
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getAnalytics(token: string) {
  const res = await axios.get(`${API_BASE}/vet-profile/analytics`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function loginAdmin(email: string, password: string) {
  const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
  return res.data.access_token;
}

export async function getPendingProfiles(token: string) {
  const res = await axios.get(`${API_BASE}/vet-profile/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function approveProfile(token: string, id: string) {
  const res = await axios.patch(
    `${API_BASE}/vet-profile/approve/${id}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}
