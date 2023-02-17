import { createConnection } from 'mysql';
import { DefaultQueryResult, QueryResult } from '../typings/database';

const database = createConnection({
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

    await query(``);
};
