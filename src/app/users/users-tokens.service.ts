import dayjs from 'dayjs';

import { Repository } from 'typeorm';
import { ICreateUserTokenDTO } from '@app/users/dtos/ICreateUserTokenDTO';
import { UserTokensEntity } from '@app/users/entities/users-token.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
}
