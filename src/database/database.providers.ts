
import { createConnection } from "typeorm";
import { dbconfig } from "./database.config";

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection(dbconfig),
    }
];