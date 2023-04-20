import { Repository } from 'typeorm';
import { ICreateUserDTO } from '@app/users/dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '@app/users/dtos/IUpdateUserDTO';
import { UsersEntity } from '@app/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repository: Repository<UsersEntity>,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    return await this.repository.find({
      select: ['id', 'username', 'createdAt'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOneById(id: string): Promise<UsersEntity> {
    return await this.repository.findOne({
      where: { id: id },
    });
  }

  async findByUsername(username: string): Promise<UsersEntity> {
    return await this.repository.findOne({
      where: { username: username },
    });
  }

  async store({ username, password }: ICreateUserDTO) {
    const userAlreadyExists = await this.findByUsername(username);

    if (userAlreadyExists) {
      throw new NotFoundException('Username already exists!');
    }

    const user = this.repository.create({
      username,
      password,
    });

    await this.repository.save(user);
  }

  async update(id: string, data: IUpdateUserDTO) {
    const user = await this.findOneById(id);
    this.repository.merge(user, data);
    return await this.repository.save(user);
  }

  async destroy(id: string) {
    await this.findOneById(id);
    this.repository.softDelete({ id });
  }

  public async save(user: UsersEntity): Promise<UsersEntity> {
    return this.repository.save(user);
  }
}
