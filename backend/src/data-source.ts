import { DataSource } from 'typeorm';
import { User } from './modules/users/user.entity';
import { VetProfile } from './modules/vet-profile/vet-profile.entity';
import { Pet } from './modules/pet/pet.entity';
import { MedicalHistory } from './modules/medical-history/medical-history.entity';
import { Appointment } from './modules/appointment/appointment.entity';
import { VetAvailability } from './modules/vet-availability/vet-availability.entity';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, VetProfile, Pet, MedicalHistory, Appointment, VetAvailability],
  migrations: [process.env.NODE_ENV === 'production' ? 'dist/migrations/*.js' : 'src/migrations/*.ts'],
  synchronize: false,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
