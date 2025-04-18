// Shared types for Veteralia

export interface User {
  id: string;
  role: 'pet_owner' | 'veterinarian' | 'secretary' | 'admin';
  email: string;
  name: string;
  language: 'es' | 'en';
}

export interface VetProfile {
  id: string;
  userId: string;
  name: string;
  specialty: string;
  location: string;
  pricingTier: 'basic' | 'standard' | 'premium';
  approved: boolean;
  schedule: any; // To be refined
}

export interface Appointment {
  id: string;
  petOwnerId: string;
  vetId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}
