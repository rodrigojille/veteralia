import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { MedicalHistory } from '../medical-history/medical-history.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  species!: string;

  @Column({ nullable: true })
  breed?: string;

  @Column({ type: 'date', nullable: true })
  birthdate?: Date;

  @Column({ nullable: true })
  notes?: string;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  owner!: User;

  // Medical history relation
  @OneToMany(() => MedicalHistory, (mh: MedicalHistory) => mh.pet, { cascade: true })
  medicalHistory!: MedicalHistory[];
}
