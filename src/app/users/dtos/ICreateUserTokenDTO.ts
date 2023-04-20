import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ICreateUserTokenDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: 'uuid as users table',
    example: '1a3c0ce9-87fb-412c-a3c8-fad1980ec618',
  })
  user_id: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Time to expire this token',
    example: '2022-04-07 20:43:02.343',
  })
  expires_date: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Create when user get login or acess refresh route.',
    example: 'Is a token with an e-mail',
  })
  refresh_token: string;
}
