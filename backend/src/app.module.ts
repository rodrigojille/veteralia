import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/user.entity';
import { VetProfile } from './modules/vet-profile/vet-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '140290',
      database: process.env.DB_NAME || 'veteralia',
      entities: [User, VetProfile],
      synchronize: false,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
