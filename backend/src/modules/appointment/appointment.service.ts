import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Pet } from '../pet/pet.entity';
import { User } from '../users/user.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(Pet)
    private readonly petRepo: Repository<Pet>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAllForOwner(ownerId: string) {
    return this.appointmentRepo.find({
      where: { petOwner: { id: ownerId } },
      relations: ['pet', 'veterinarian'],
      order: { datetime: 'DESC' },
    });
  }

  async findAllForVet(vetId: string) {
    return this.appointmentRepo.find({
      where: { veterinarian: { id: vetId } },
      relations: ['pet', 'petOwner'],
      order: { datetime: 'DESC' },
    });
  }

  async create(owner: User, petId: string, vetId: string, data: Partial<Appointment>) {
    const pet = await this.petRepo.findOne({ where: { id: petId, owner: { id: owner.id } } });
    const vet = await this.userRepo.findOne({ where: { id: vetId, role: 'veterinarian' } });
    if (!pet || !vet) throw new Error('Invalid pet or vet');
    const appt = this.appointmentRepo.create({ ...data, petOwner: owner, pet, veterinarian: vet });
    return this.appointmentRepo.save(appt);
  }

  async update(id: string, ownerId: string, data: Partial<Appointment>) {
    const appt = await this.appointmentRepo.findOne({ where: { id, petOwner: { id: ownerId } } });
    if (!appt) return null;
    Object.assign(appt, data);
    return this.appointmentRepo.save(appt);
  }

  async remove(id: string, ownerId: string) {
    const appt = await this.appointmentRepo.findOne({ where: { id, petOwner: { id: ownerId } } });
    if (!appt) return null;
    await this.appointmentRepo.remove(appt);
    return true;
  }
}
