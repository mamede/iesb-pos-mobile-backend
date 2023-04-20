import { Injectable, NotFoundException } from '@nestjs/common';
import auth from '@config/auth';
import { sign } from 'jsonwebtoken';
import { UsersEntity } from '@app/users/entities/users.entity';
import { UsersService } from '@app/users/users.service';
import { UsersTokensService } from '@app/users/users-tokens.service';

interface IRequest {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly userTokenService: UsersTokensService,
  ) {}

  async login({ username, password }: IRequest) {
    const user = await this.userService.findByUsername(username);

    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!user) {
      throw new NotFoundException('Email or password incorrect!');
    }

    const passwordMatch = password === user.password;

    if (!passwordMatch) {
      throw new NotFoundException('Email or password incorrect!');
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ username }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.userTokenService.addDays(
      expires_refresh_token_days,
    );

    await this.userTokenService.store({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const tokenReturn = {
      token,
      user: user.username,
      refresh_token,
    };

    return tokenReturn;
  }

  async validateUser(username: string, password: string) {
    let user: UsersEntity;
    try {
      user = await this.userService.findByUsername(username);
    } catch (error) {
      return null;
    }

    const isPasswordValid = password === user.password;
    if (!isPasswordValid) return null;

    return user;
  }

  async me(user: UsersEntity): Promise<UsersEntity> {
    return this.userService.findOneById(user.id);
  }
}
