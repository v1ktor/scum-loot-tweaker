interface Config {
  DATA_PATH: string;
}

export const config: Config = {
  DATA_PATH: import.meta.env.VITE_DATA_PATH,
}
