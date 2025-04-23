import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistory } from './medical-history.entity';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalHistoryController } from './medical-history.controller';
import { Pet } from '../pet/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalHistory, Pet])],
  providers: [MedicalHistoryService],
  controllers: [MedicalHistoryController],
  exports: [MedicalHistoryService],
})
export class MedicalHistoryModule {}
