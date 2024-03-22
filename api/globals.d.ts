declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_HOST: string;
      DATABASE_USER: string;
      DATABASE_NAME: string;
      DATABASE_PASSWORD: string;
      PORT: string;
    }
  }
}

export { };
