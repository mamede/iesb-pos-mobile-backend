import { Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersTokensService } from '@app/users/users-tokens.service';

@UseGuards(AuthGuard('jwt-refresh'))
@ApiTags('Users Token')
@Controller('auth')
export class UsersTokenController {
  logger: Logger;

  constructor(private readonly refreshTokenUseCase: UsersTokensService) {
    this.logger = new Logger();
  }

  @Post('/refresh-token')
  @ApiOperation({
    summary: 'Refresh user token if pass all required items',
    description:
      'Returns 201 without content, you need to put a valid token to get a new one',
  })
  async handle(@Req() req: any) {
    const token =
      req.body.token || req.headers['x-access-token'] || req.query.token;
    return await this.refreshTokenUseCase.RefreshToken(token);
  }
}
