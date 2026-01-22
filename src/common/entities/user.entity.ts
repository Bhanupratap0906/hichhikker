import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  BeforeInsert,
  BeforeUpdate,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { v7 as uuidv7 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv7();
    }
  }

  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ unique: true, nullable: true })
  @Index()
  phoneNumber?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastLoginAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}