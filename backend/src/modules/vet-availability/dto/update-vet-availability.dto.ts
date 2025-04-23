import { PartialType } from '@nestjs/mapped-types';
import { CreateVetAvailabilityDto } from './create-vet-availability.dto';

export class UpdateVetAvailabilityDto extends PartialType(CreateVetAvailabilityDto) {}
