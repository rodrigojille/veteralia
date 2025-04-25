import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Pet } from '../pet/pet.entity';

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'approved' | 'rejected';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.id)
  petOwner!: User;

  @ManyToOne(() => Pet, pet => pet.id)
  pet!: Pet;

  @ManyToOne(() => User, user => user.id)
  veterinarian!: User;

  @Column({ type: 'timestamp' })
  datetime!: Date;

  @Column({ nullable: true })
  reason?: string;

  @Column({ nullable: true })
  notes?: string;

  @Column({ type: 'enum', enum: ['pending', 'confirmed', 'completed', 'cancelled', 'approved', 'rejected'], default: 'pending' })
  status!: AppointmentStatus;
}
