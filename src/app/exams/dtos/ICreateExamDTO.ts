import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ICreateExamDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Exame Name',
    example: 'Backend Test',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Exame Grade',
    example: 100,
  })
  grade: string;
}
