import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: String(process.env.TYPEORM_PASSWORD),
  database: process.env.TYPEORM_DATABASE,
  entities: ['./src/app/**/entities/*.ts'],
  migrationsTableName: 'Migration',
  migrations: ['./src/database/migrations/*.ts'],
});
