import { Module } from '@nestjs/common';
import { AdminAnalyticsController } from './admin-analytics.controller';
import { UsersModule } from '../users/users.module';
import { PetModule } from '../pet/pet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VetProfile } from '../vet-profile/vet-profile.entity';

@Module({
  imports: [
    UsersModule,
    PetModule,
    TypeOrmModule.forFeature([VetProfile]),
  ],
  controllers: [AdminAnalyticsController],
})
export class AdminAnalyticsModule {}
