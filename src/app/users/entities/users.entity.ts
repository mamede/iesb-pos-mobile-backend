import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Exclude, instanceToPlain } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UsersEntity {
  @PrimaryColumn()
  @ApiProperty({
    description: 'uuid',
    example: '1a3c0ce9-87fb-412c-a3c8-fad1980ec618',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'username to identify user',
    example: 'Campeiro Doe',
  })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  @ApiProperty({
    description:
      'Password with some rules, it must contain at least one uppercase, lowercase, number and special characters',
    example: 'Password1@',
  })
  password: string;

  @CreateDateColumn()
  @ApiProperty({
    description: 'date creation',
    example: '2022-03-01 05:38:29.752349',
  })
  createdAt: string;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'date update',
    example: '2022-03-01 05:38:29.752349',
  })
  updatedAt: string;

  @DeleteDateColumn()
  @ApiProperty({
    description: 'date deleted, default value is null.',
    example: '2022-03-01 05:38:29.752349',
  })
  deletedAt?: string;

  toJSON() {
    return instanceToPlain(this);
  }

  constructor(partial: Partial<UsersEntity>) {
    Object.assign(this, partial);

    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
