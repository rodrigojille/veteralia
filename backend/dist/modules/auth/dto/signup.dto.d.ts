export declare class SignupDto {
    email: string;
    password: string;
    name: string;
    role: 'pet_owner' | 'veterinarian' | 'secretary' | 'admin';
    language: 'es' | 'en';
    specialty?: string;
    location?: string;
    pricingTier?: 'basic' | 'standard' | 'premium';
}
