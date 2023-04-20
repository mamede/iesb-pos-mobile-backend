import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '@app/users/users.service';
import { ICreateUserDTO } from '@app/users/dtos/ICreateUserDTO';

@ApiTags('Users')
@Controller('/v1/users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Get list of all users',
    description: 'Returns 200 and show all users',
  })
  async find() {
    return await this.service.findAll();
  }

  @Post('/register')
  @ApiOperation({
    summary: 'Create a user if pass all required items',
    description:
      'Returns 201 without content, you need to put this informations: "name", "username", "email", "password"',
  })
  public async execute(@Body() body: ICreateUserDTO) {
    return await this.service.store(body);
  }
}
