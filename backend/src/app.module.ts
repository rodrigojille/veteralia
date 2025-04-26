console.log('DATABASE_URL:', process.env.DATABASE_URL);
import { Module } from '@nestjs/common';
import { AdminAnalyticsModule } from './modules/admin-analytics/admin-analytics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PetModule } from './modules/pet/pet.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { VetProfileModule } from './modules/vet-profile/vet-profile.module';
import { User } from './modules/users/user.entity';
import { VetProfile } from './modules/vet-profile/vet-profile.entity';
import { VetAvailability } from './modules/vet-availability/vet-availability.entity';
import { Pet } from './modules/pet/pet.entity';
import { MedicalHistory } from './modules/medical-history/medical-history.entity';
import { Appointment } from './modules/appointment/appointment.entity';
import { MedicalHistoryModule } from './modules/medical-history/medical-history.module';
import { VetAvailabilityModule } from './modules/vet-availability/vet-availability.module';
import { AppController } from './app.controller';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    AdminAnalyticsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || undefined,
      host: process.env.DATABASE_URL ? undefined : process.env.DB_HOST,
      port: process.env.DATABASE_URL ? undefined : parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DATABASE_URL ? undefined : process.env.DB_USERNAME,
      password: process.env.DATABASE_URL ? undefined : process.env.DB_PASSWORD,
      database: process.env.DATABASE_URL ? undefined : process.env.DB_NAME,
      synchronize: false,
      autoLoadEntities: false,
      entities: [User, VetProfile, VetAvailability, Pet, MedicalHistory, Appointment],
      ssl: process.env.DATABASE_URL && process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    AuthModule,
    UsersModule,
    PetModule,
    AppointmentModule,
    VetProfileModule,
    MedicalHistoryModule,
    VetAvailabilityModule,
    NotificationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
