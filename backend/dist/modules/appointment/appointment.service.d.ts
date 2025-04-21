import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Pet } from '../pet/pet.entity';
import { User } from '../users/user.entity';
export declare class AppointmentService {
    private readonly appointmentRepo;
    private readonly petRepo;
    private readonly userRepo;
    constructor(appointmentRepo: Repository<Appointment>, petRepo: Repository<Pet>, userRepo: Repository<User>);
    findAllForOwner(ownerId: string): Promise<Appointment[]>;
    findAllForVet(vetId: string): Promise<Appointment[]>;
    create(owner: User, petId: string, vetId: string, data: Partial<Appointment>): Promise<Appointment>;
    update(id: string, ownerId: string, data: Partial<Appointment>): Promise<Appointment | null>;
    remove(id: string, ownerId: string): Promise<true | null>;
}
