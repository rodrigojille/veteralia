import { User } from '../users/user.entity';
export declare class VetProfile {
    id: string;
    user: User;
    specialty: string;
    location: string;
    pricingTier: 'basic' | 'standard' | 'premium';
    approved: boolean;
    schedule: any;
}
