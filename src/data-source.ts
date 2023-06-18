import "dotenv/config";
import { DataSource } from "typeorm";

import "reflect-metadata";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: !!process.env.POSTGRES_SYNC, // i set this to false because i setup a migration scritp
  logging: !!process.env.POSTGRES_LOGGING,
  entities: ["build/entities/*.js", "build/entities/**/*.js"],
  migrations: ["build/migrations/*.js"],
  subscribers: ["build/subscriber/**/*.js"],
  ssl: !!process.env.POSTGRES_SSL,
});
