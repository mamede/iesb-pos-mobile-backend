import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class IAuthUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Username',
    example: 'Username',
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
