import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class VetAvailability {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  vet!: User;

  @Column({ type: 'uuid' })
  vetId!: string;

  @Column({ type: 'int', nullable: true })
  dayOfWeek!: number | null;

  @Column({ type: 'date', nullable: true })
  date!: string | null;

  @Column({ type: 'varchar', length: 5 })
  startTime!: string;

  @Column({ type: 'varchar', length: 5 })
  endTime!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
