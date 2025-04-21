import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VetProfile } from './vet-profile.entity';
import { VetProfileService } from './vet-profile.service';
import { VetProfileController } from './vet-profile.controller';
import { VetProfileAnalyticsController } from './vet-profile.analytics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VetProfile])],
  providers: [VetProfileService],
  controllers: [VetProfileController, VetProfileAnalyticsController],
  exports: [VetProfileService],
})
export class VetProfileModule {}
