import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IRefreshTokenDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Create when user get login',
    example: 'Is a token with an e-mail',
  })
  token: string;
}
