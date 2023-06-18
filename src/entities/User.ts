import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'uuid', generated: 'uuid', name: 'user_uuid' })
  userUuid: string;

  @Column({ nullable: true, name: 'first_name', type: 'varchar' })
  firstName!: string;

  @Column({ nullable: true, name: 'last_name', type: 'varchar' })
  lastName?: string;

  @Column({ name: 'middle_name', type: 'varchar', nullable: false })
  middleName?: string;

  @Column({ type: 'varchar', name: 'email', unique: true })
  email: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'date' })
  updatedAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'date' })
  createdAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'date' })
  deletedAt?: Date;
}
