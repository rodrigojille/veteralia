console.log('DATABASE_URL:', process.env.DATABASE_URL);
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PetModule } from './modules/pet/pet.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { VetProfileModule } from './modules/vet-profile/vet-profile.module';
import { User } from './modules/users/user.entity';
import { VetProfile } from './modules/vet-profile/vet-profile.entity';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || undefined,
      host: process.env.DATABASE_URL ? undefined : process.env.DB_HOST,
      port: process.env.DATABASE_URL ? undefined : parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DATABASE_URL ? undefined : process.env.DB_USERNAME,
      password: process.env.DATABASE_URL ? undefined : process.env.DB_PASSWORD,
      database: process.env.DATABASE_URL ? undefined : process.env.DB_NAME,
      entities: [User, VetProfile],
      synchronize: false,
      autoLoadEntities: true,
      ssl: process.env.DATABASE_URL && process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    AuthModule,
    UsersModule,
    PetModule,
    AppointmentModule,
    VetProfileModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
