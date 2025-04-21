import axios from "axios";

export async function fetchVetAppointments(token: string) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const res = await axios.get(`${API_BASE}/appointments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
