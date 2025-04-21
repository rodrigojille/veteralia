import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { User } from '../users/user.entity';
export declare class PetService {
    private readonly petRepo;
    constructor(petRepo: Repository<Pet>);
    findAllByOwner(ownerId: string): Promise<Pet[]>;
    findOneById(id: string, ownerId: string): Promise<Pet | null>;
    create(owner: User, data: Partial<Pet>): Promise<Pet>;
    update(id: string, ownerId: string, data: Partial<Pet>): Promise<Pet | null>;
    remove(id: string, ownerId: string): Promise<true | null>;
}
