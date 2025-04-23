import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VetAvailability } from './vet-availability.entity';
import { VetAvailabilityService } from './vet-availability.service';
import { VetAvailabilityController } from './vet-availability.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VetAvailability])],
  controllers: [VetAvailabilityController],
  providers: [VetAvailabilityService],
})
export class VetAvailabilityModule {}
