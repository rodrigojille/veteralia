import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pet } from '../pet/pet.entity';

@Entity()
export class MedicalHistory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'date' })
  date!: string;

  @Column()
  condition!: string;

  @Column()
  vetClinic!: string;

  @Column({ nullable: true })
  notes?: string;

  @ManyToOne(() => Pet, pet => pet.medicalHistory, { onDelete: 'CASCADE' })
  pet!: Pet;
}
