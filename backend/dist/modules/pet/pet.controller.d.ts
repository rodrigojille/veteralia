import { PetService } from './pet.service';
import { Request } from 'express';
export declare class PetController {
    private readonly petService;
    constructor(petService: PetService);
    getMyPets(req: Request): Promise<import("./pet.entity").Pet[]>;
    getPet(req: Request, id: string): Promise<import("./pet.entity").Pet | null>;
    createPet(req: Request, data: any): Promise<import("./pet.entity").Pet>;
    updatePet(req: Request, id: string, data: any): Promise<import("./pet.entity").Pet | null>;
    deletePet(req: Request, id: string): Promise<true | null>;
}
