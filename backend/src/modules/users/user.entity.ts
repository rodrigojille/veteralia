import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { OneToOne } from 'typeorm';
import { VetProfile } from '../vet-profile/vet-profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'enum', enum: ['pet_owner', 'veterinarian', 'secretary', 'admin'] })
  role!: 'pet_owner' | 'veterinarian' | 'secretary' | 'admin';

  @Column({ default: 'es' })
  language!: 'es' | 'en';

  // Add relation to VetProfile
  @OneToOne(() => VetProfile, profile => profile.user)
  vetProfile?: VetProfile;
}

