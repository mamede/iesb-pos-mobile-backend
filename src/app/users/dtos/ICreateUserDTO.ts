import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ICreateUserDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: 'username to identify user',
    example: 'Campeiro Doe',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    description:
      'Password with some rules, it must contain at least one uppercase, lowercase, number and special characters',
    example: 'Password1@',
  })
  password: string;
}
