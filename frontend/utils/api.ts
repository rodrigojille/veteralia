// Centralized API utility for scalable backend communication
// Uses the environment variable REACT_APP_API_URL

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined! Please set it in your environment variables.');
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
    let errorMsg = `API error: ${response.status} ${response.statusText}`;
    try {
      const data = await response.json();
      if (data && data.message) {
        errorMsg = JSON.stringify({ message: data.message });
      }
    } catch {}
    throw new Error(errorMsg);
  }

  // Optionally, handle no-content (204) responses
  if (response.status === 204) return null as T;

  return response.json();
}

// Example usage (remove before production):
// apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })

export async function getAllPets() {
  return apiFetch('/pets');
}

export async function getMedicalHistory(petId: string, token: string) {
  return apiFetch(`/pets/${petId}/medical-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function addMedicalHistory(petId: string, event: any, token: string) {
  return apiFetch(`/pets/${petId}/medical-history`, {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateAppointment(id: string, data: { datetime?: string; notes?: string }, token: string | null) {
  return apiFetch(`/appointments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
}

export async function getVetAppointments(token: string | null) {
  return apiFetch('/appointments/vet', {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
}

export async function updateMedicalHistory(eventId: number, event: any, token: string) {
  return apiFetch(`/medical-history/${eventId}`, {
    method: 'PATCH',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteMedicalHistory(eventId: number, token: string) {
  return apiFetch(`/medical-history/${eventId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
