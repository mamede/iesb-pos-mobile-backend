import {
  Body,
  Controller,
  Get,
  Req,
  Post,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IAuthUserDTO } from '@app/users/dtos/IAuthUserDTO';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  logger: Logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger();
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Can Login if pass all required items',
    description:
      'Returns 201 and return token, refresh token, and user.username, you need to put this informations: "username", "password"',
  })
  async login(@Body() body: IAuthUserDTO) {
    return await this.authService.login(body);
  }

  @Get('/me')
  @ApiOperation({
    summary: 'Get users Infos',
    description: 'Returns 200 and return logged user info',
  })
  @UseGuards(AuthGuard('jwt'))
  async getUserId(@Req() req: any) {
    return await this.authService.me(req.user);
  }
}
