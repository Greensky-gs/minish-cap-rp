declare global {
    namespace NodeJS {
        interface ProcessEnv {
            token: string;
            DB: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_HOST: string;
        }
    }
}

export {};
