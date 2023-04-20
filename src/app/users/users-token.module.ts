import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@app/users/users.module';
import { UsersTokensService } from '@app/users/users-tokens.service';
import { UserTokensEntity } from '@app/users/entities/users-token.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([UserTokensEntity])],
  controllers: [],
  providers: [UsersTokensService],
  exports: [UsersTokensService],
})
export class UsersTokenModule {}
