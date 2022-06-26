declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'test' | 'development' | 'production';
            APP_PORT: string;
            DB_HOST: string;
            DB_DATABASE: string;
            DB_PORT: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
        }
    }
}

export {};
