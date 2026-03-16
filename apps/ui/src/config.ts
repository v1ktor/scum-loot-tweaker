interface Config {
  DATA_PATH: string;
  APP_VERSION: string;
}

export const config: Config = {
  DATA_PATH: import.meta.env.VITE_DATA_PATH,
  APP_VERSION: import.meta.env.VITE_APP_VERSION,
}
