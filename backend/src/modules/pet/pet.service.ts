import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepo: Repository<Pet>,
  ) {}

  async countAll(): Promise<number> {
    return this.petRepo.count();
  }

  async findAllByOwner(ownerId: string) {
    return this.petRepo.find({ where: { owner: { id: ownerId } } });
  }

  async findOneById(id: string, ownerId: string) {
    return this.petRepo.findOne({ where: { id, owner: { id: ownerId } } });
  }

  async create(owner: User, data: Partial<Pet>) {
    const pet = this.petRepo.create({ ...data, owner });
    return this.petRepo.save(pet);
  }

  async update(id: string, ownerId: string, data: Partial<Pet>) {
    const pet = await this.findOneById(id, ownerId);
    if (!pet) return null;
    Object.assign(pet, data);
    return this.petRepo.save(pet);
  }

  async remove(id: string, ownerId: string) {
    const pet = await this.findOneById(id, ownerId);
    if (!pet) return null;
    await this.petRepo.remove(pet);
    return true;
  }
}
