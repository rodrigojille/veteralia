import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VetAvailability } from './vet-availability.entity';
import { CreateVetAvailabilityDto } from './dto/create-vet-availability.dto';
import { UpdateVetAvailabilityDto } from './dto/update-vet-availability.dto';

@Injectable()
export class VetAvailabilityService {
  constructor(
    @InjectRepository(VetAvailability)
    private readonly repo: Repository<VetAvailability>,
  ) {}

  async findAllForVet(vetId: string) {
    return this.repo.find({ where: { vetId } });
  }

  async create(vetId: string, dto: CreateVetAvailabilityDto) {
    const entity = this.repo.create({ ...dto, vetId });
    return this.repo.save(entity);
  }

  async update(vetId: string, id: string, dto: UpdateVetAvailabilityDto) {
    const entity = await this.repo.findOne({ where: { id, vetId } });
    if (!entity) throw new NotFoundException('Availability not found');
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(vetId: string, id: string) {
    const entity = await this.repo.findOne({ where: { id, vetId } });
    if (!entity) throw new NotFoundException('Availability not found');
    await this.repo.remove(entity);
    return { deleted: true };
  }
}
