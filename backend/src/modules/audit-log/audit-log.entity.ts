import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  action!: string;

  @Column()
  userEmail!: string;

  @Column()
  details!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
