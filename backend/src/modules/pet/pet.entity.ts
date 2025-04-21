import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

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
}
