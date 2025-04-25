import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VetProfile } from './vet-profile.entity';
import { VetProfileService } from './vet-profile.service';
import { VetProfileController } from './vet-profile.controller';
import { VetProfileAnalyticsController } from './vet-profile.analytics.controller';
import { VetProfileAdminController } from './vet-profile.admin.controller';
import { UsersModule } from '../users/users.module';
import { AppointmentModule } from '../appointment/appointment.module';

@Module({
  imports: [TypeOrmModule.forFeature([VetProfile]), UsersModule, AppointmentModule],
  providers: [VetProfileService],
  controllers: [VetProfileController, VetProfileAnalyticsController, VetProfileAdminController],
  exports: [VetProfileService],
})
export class VetProfileModule {}
