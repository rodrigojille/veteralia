import { Repository } from 'typeorm';
import { VetProfile } from './vet-profile.entity';
import { User } from '../users/user.entity';
export declare class VetProfileService {
    private readonly vetProfileRepo;
    constructor(vetProfileRepo: Repository<VetProfile>);
    createOrUpdate(user: User, data: Partial<VetProfile>): Promise<VetProfile>;
    findByUserId(userId: string): Promise<VetProfile | null>;
    findAllPendingApproval(): Promise<VetProfile[]>;
    approveProfile(id: string): Promise<VetProfile>;
    getAnalytics(): Promise<{
        total: number;
        pending: number;
        approved: number;
        approvalRate: number;
        perMonth: any;
    }>;
}
