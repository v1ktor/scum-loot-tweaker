interface Config {
    DATA_PATH: string;
    APP_VERSION: string;
    API_URL: string;
}

export const config: Config = {
    DATA_PATH: import.meta.env.VITE_DATA_PATH,
    APP_VERSION: import.meta.env.VITE_APP_VERSION,
    API_URL: import.meta.env.VITE_API_URL,
};
