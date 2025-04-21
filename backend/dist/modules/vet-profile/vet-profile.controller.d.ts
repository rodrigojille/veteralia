import { VetProfileService } from './vet-profile.service';
import { Request } from 'express';
export declare class VetProfileController {
    private readonly vetProfileService;
    constructor(vetProfileService: VetProfileService);
    createOrUpdate(req: Request, data: any): Promise<import("./vet-profile.entity").VetProfile | {
        error: string;
    }>;
    getMyProfile(req: Request): Promise<import("./vet-profile.entity").VetProfile | null>;
    getPending(req: Request): Promise<import("./vet-profile.entity").VetProfile[] | {
        error: string;
    }>;
    approve(req: Request, id: string): Promise<import("./vet-profile.entity").VetProfile | {
        error: string;
    }>;
}
