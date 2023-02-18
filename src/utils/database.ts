import { createConnection } from 'mysql';
import { DatabaseTables, DefaultQueryResult, QueryResult } from '../typings/database';
import { config } from 'dotenv';
config();

export const database = createConnection({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB
});

export const query = <T = DefaultQueryResult>(request: string): Promise<QueryResult<T>> => {
    return new Promise((resolve, reject) => {
        database.query(request, (error, response) => {
            if (error) return reject(error);
            resolve(response);
        });
    });
};
export const checkDatabase = async () => {
    await query(`SHOW TABLES`);

    await query(
        `CREATE TABLE IF NOT EXISTS ${DatabaseTables.Accounts} ( user_id VARCHAR(255) NOT NULL PRIMARY KEY, username VARCHAR(255) NOT NULL, cycle INTEGER(5) NOT NULL DEFAULT '1' , book INTEGER(5) NOT NULL DEFAULT '1', chapter INTEGER(5) NOT NULL DEFAULT '1', stats LONGTEXT, objectifs LONGTEXT, inventory LONGTEXT )`
    );
};
export const sqlise = (str: string) => {
    return str.replace(/"/g, '\\"').replace(/;/g, '\\;');
};
