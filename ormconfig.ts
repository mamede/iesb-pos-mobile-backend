import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configs: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/app/**/entities/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};

module.exports = configs;
