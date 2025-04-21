import { User } from '../users/user.entity';
import { Pet } from '../pet/pet.entity';
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export declare class Appointment {
    id: string;
    petOwner: User;
    pet: Pet;
    veterinarian: User;
    datetime: Date;
    reason?: string;
    notes?: string;
    status: AppointmentStatus;
}
