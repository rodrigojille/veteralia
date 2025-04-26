import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { VetProfile } from '../vet-profile/vet-profile.entity';
import { VetAvailability } from '../vet-availability/vet-availability.entity';

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

  @Column({ default: false })
  isEmailVerified!: boolean;

  @Column({ nullable: true })
  passwordResetToken?: string;

  @Column({ nullable: true })
  emailVerificationToken?: string;

  // Add relation to VetProfile
  @OneToOne(() => VetProfile, profile => profile.user)
  vetProfile?: VetProfile;

  // Relation to VetAvailability (forwardRef to avoid circular dep)
  @OneToMany(() => VetAvailability, va => va.vet)
  vetAvailabilities?: VetAvailability[];
}

