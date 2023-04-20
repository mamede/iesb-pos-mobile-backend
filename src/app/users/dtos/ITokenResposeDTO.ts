import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ITokenResposeDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Create when user get login',
    example: 'Is a token with an e-mail',
  })
  token: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Create when user get login or acess refresh route.',
    example: 'Is a token with an e-mail',
  })
  refresh_token: string;
}
