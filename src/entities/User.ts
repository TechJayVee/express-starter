import bcrypt from 'bcrypt';
import {
  BeforeInsert,
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

  @Column({ name: 'password', type: 'varchar', nullable: true })
  password?: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @Column({ type: 'varchar', name: 'email', unique: true })
  email: string;

  @Column({ nullable: true, name: 'profile_picture', type: 'varchar' })
  profilePicture!: string;

  @Column({ nullable: true, name: 'refresh_token', type: 'varchar' })
  refreshToken?: string;

  @Column({ nullable: true, name: 'password_reset_token', type: 'varchar' })
  passwordResetToken!: string;

  @Column({
    nullable: true,
    name: 'password_reset_expires',
    type: 'timestamp with time zone',
  })
  passwordResetExpires!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'date' })
  updatedAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'date' })
  createdAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'date' })
  deletedAt?: Date;

  toJSON(): Partial<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, id, passwordResetToken, passwordResetExpires, ...user } =
      this;
    return user;
  }
}
