 import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserModel } from "./models/_index"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT),
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [UserModel],
    migrations: ["src/database/migrations/**/*.ts"],
    subscribers: [],
})
