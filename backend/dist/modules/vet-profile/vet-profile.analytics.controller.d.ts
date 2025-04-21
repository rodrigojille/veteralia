import { VetProfileService } from './vet-profile.service';
export declare class VetProfileAnalyticsController {
    private readonly vetProfileService;
    constructor(vetProfileService: VetProfileService);
    getAnalytics(): Promise<{
        total: number;
        pending: number;
        approved: number;
        approvalRate: number;
        perMonth: any;
    }>;
}
