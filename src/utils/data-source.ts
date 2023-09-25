import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from 'config';
import "dotenv/config"


export const AppDataSource = new DataSource({
  host: process.env.REACT_APP_POSTGRES_HOST,
    port: Number(`${process.env.REACT_APP_POSTGRES_PORT}`),
    username: process.env.REACT_APP_POSTGRES_USER,
    password: process.env.REACT_APP_POSTGRES_PASSWORD,
    database: process.env.REACT_APP_POSTGRES_DB,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.entity{.ts,.js}'],
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  }
  //migrations: ['src/migrations/**/*{.ts,.js}'],
  //subscribers: ['src/subscribers/**/*{.ts,.js}'],
});