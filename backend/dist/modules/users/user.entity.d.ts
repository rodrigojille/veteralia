import { VetProfile } from '../vet-profile/vet-profile.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    phone?: string;
    role: 'pet_owner' | 'veterinarian' | 'secretary' | 'admin';
    language: 'es' | 'en';
    vetProfile?: VetProfile;
}
