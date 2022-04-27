
import { createConnection } from "typeorm";
import { config } from "./database.config";

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection(config),
    }
];