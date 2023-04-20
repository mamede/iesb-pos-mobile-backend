import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@app/users/users.module';
import { AuthService } from '@auth/auth.service';
import { AuthController } from '@auth/auth.controller';
import { LocalStrategy } from '@auth/strategies/local.strategy';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { RtStrategy } from '@auth/strategies/rt.strategy';
import { UsersTokenModule } from '@app/users/users-token.module';
import auth from '@config/auth';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    UsersTokenModule,
    PassportModule,
    JwtModule.register({
      privateKey: auth.secret_token,
      signOptions: { expiresIn: auth.expires_in_token },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RtStrategy],
})
export class AuthModule {}
