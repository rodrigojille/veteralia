import { IsOptional, IsInt, IsDateString, IsString, Length } from 'class-validator';

export class CreateVetAvailabilityDto {
  @IsOptional()
  @IsInt()
  dayOfWeek?: number;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsString()
  @Length(1, 5)
  startTime!: string;

  @IsString()
  @Length(1, 5)
  endTime!: string;
}
