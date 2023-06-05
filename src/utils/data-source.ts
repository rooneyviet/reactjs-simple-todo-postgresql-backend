import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from 'config';
import "dotenv/config"


export const AppDataSource = new DataSource({
  host: process.env.POSTGRES_HOST,
    port: Number(`${process.env.POSTGRES_PORT}`),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.entity{.ts,.js}'],
  //migrations: ['src/migrations/**/*{.ts,.js}'],
  //subscribers: ['src/subscribers/**/*{.ts,.js}'],
});