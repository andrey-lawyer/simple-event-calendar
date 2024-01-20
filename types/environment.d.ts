export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      SECRET_KEY: string;
      NEXT_PUBLIC_BACKEND_API: string;
      BACKEND_API: string;
      SESSION_SECRET: string;
    }
  }
}
