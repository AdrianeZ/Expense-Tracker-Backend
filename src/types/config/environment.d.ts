declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'test' | 'development' | 'production';
            APP_PORT: string;
            DB_PROVIDED: string;
            DB_HOST: string;
            DB_DATABASE: string;
            DB_PORT: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
            JWT_SECRET: string;
            JWT_EXPIRES: string
        }
    }
}

export {};
