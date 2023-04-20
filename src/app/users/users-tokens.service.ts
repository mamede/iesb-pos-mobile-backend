import dayjs from 'dayjs';

import { Repository } from 'typeorm';
import { ICreateUserTokenDTO } from '@app/users/dtos/ICreateUserTokenDTO';
import { UserTokensEntity } from '@app/users/entities/users-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { verify, sign } from 'jsonwebtoken';
import auth from '@config/auth';
import { ITokenResposeDTO } from '@app/users/dtos/ITokenResposeDTO';

interface IPayload {
  sub: string;
  email: string;
}

export class UsersTokensService {
  constructor(
    @InjectRepository(UserTokensEntity)
    private readonly repository: Repository<UserTokensEntity>,
  ) {}

  async store({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokensEntity> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });
    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokensEntity> {
    const usersTokens = await this.repository.findOne({
      where: { user_id, refresh_token },
    });

    return usersTokens;
  }

  async destroy(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokensEntity> {
    const userToken = await this.repository.findOne({
      where: { refresh_token },
    });

    return userToken;
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  async RefreshToken(token: string): Promise<ITokenResposeDTO> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken = await this.findByUserIdAndRefreshToken(user_id, token);

    if (!userToken) {
      throw new NotFoundException('Refresh Token does not exists!');
    }

    await this.destroy(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.addDays(auth.expires_refresh_token_days);

    await this.store({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}
