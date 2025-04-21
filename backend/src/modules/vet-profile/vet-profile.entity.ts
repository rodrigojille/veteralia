import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class VetProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User, user => user.vetProfile, { eager: true })
  @JoinColumn()
  user!: User;

  @Column()
  specialty!: string;

  @Column()
  location!: string;

  @Column({ type: 'enum', enum: ['basic', 'standard', 'premium'], default: 'basic' })
  pricingTier!: 'basic' | 'standard' | 'premium';

  @Column({ default: false })
  approved!: boolean;

  @Column({ type: 'jsonb', nullable: true })
  schedule!: any; // To be refined
}
