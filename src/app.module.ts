import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@health/health.module';
import { UsersModule } from '@app/users/users.module';
import { UsersTokenModule } from '@app/users/users-token.module';
import { AuthModule } from '@auth/auth.module';
import { ExamsModule } from '@app/exams/exams.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity.js'],
      options: { trustServerCertificate: true },
      autoLoadEntities: false,
      synchronize: false,
      logging: false,
    } as TypeOrmModuleOptions),
    AuthModule,
    HealthModule,
    UsersModule,
    UsersTokenModule,
    ExamsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
