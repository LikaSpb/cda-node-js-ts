export interface EnvConfig {
  PORT: number;
  FRONTEND_URL: string,
  JWT_SECRET: string;
  REFRESH_SECRET: string;
  NODE_ENV: "development" | "production" | "test";
  DATABASE_URL: string; 
}
