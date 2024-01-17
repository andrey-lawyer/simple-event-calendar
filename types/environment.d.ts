export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      SECRET_KEY: string;
    }
  }
}
