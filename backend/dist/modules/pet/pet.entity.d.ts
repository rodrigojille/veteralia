import { User } from '../users/user.entity';
export declare class Pet {
    id: string;
    name: string;
    species: string;
    breed?: string;
    birthdate?: Date;
    notes?: string;
    owner: User;
}
