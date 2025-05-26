import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    // type: "mssql",
    // host: "localhost",
    // username: "sa",
    // password: "Admin12345",
    // database: "tempdb",
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts"],
    // migrations: ["../migration/*.ts"],
    subscribers: [],
})
