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
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user (UUID v7)',
    example: '018b4569-2345-79a0-9c8d-1234567890ab',
  })
  @PrimaryColumn('uuid')
  id: string;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv7();
    }
  }

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @Column({ unique: true })
  @Index()
  email: string;

  @ApiProperty({
    description: 'The hashed password of the user',
    example: '$2b$10$EpRnTzVlqHNP0.fKbX99ijRnGeQq/w',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
    required: false,
  })
  @Column({ nullable: true })
  name?: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+15551234567',
    required: false,
  })
  @Column({ unique: true, nullable: true })
  @Index()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Indicates if the user account is active',
    example: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'The timestamp when the user was created',
    example: '2023-10-25T14:48:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the user was last updated',
    example: '2023-10-26T10:00:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'The timestamp of the last user login',
    example: '2023-10-27T08:30:00.000Z',
    required: false,
  })
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