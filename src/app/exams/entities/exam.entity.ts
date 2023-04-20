import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { instanceToPlain } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('exams')
export class ExamsEntity {
  @PrimaryColumn()
  @ApiProperty({
    description: 'uuid',
    example: '1a3c0ce9-87fb-412c-a3c8-fad1980ec618',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'Exame Name',
    example: 'Backend Test',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'Exame Grade',
    example: 100,
  })
  grade: string;

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

  constructor(partial: Partial<ExamsEntity>) {
    Object.assign(this, partial);

    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
