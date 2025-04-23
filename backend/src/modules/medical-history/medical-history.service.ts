import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalHistory } from './medical-history.entity';
import { Pet } from '../pet/pet.entity';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectRepository(MedicalHistory)
    private readonly historyRepo: Repository<MedicalHistory>,
    @InjectRepository(Pet)
    private readonly petRepo: Repository<Pet>,
  ) {}

  async findAllByPet(petId: string) {
    return this.historyRepo.find({ where: { pet: { id: petId } }, order: { date: 'DESC' } });
  }

  async create(petId: string, data: Partial<MedicalHistory>) {
    const pet = await this.petRepo.findOneBy({ id: petId });
    if (!pet) throw new Error('Pet not found');
    const event = this.historyRepo.create({ ...data, pet });
    return this.historyRepo.save(event);
  }

  async update(eventId: string, data: Partial<MedicalHistory>) {
    await this.historyRepo.update(eventId, data);
    return this.historyRepo.findOneBy({ id: eventId });
  }

  async remove(eventId: string) {
    return this.historyRepo.delete(eventId);
  }
}
