export interface EnvConfig {
  PORT: number;
  JWT_SECRET: string;
  REFRESH_SECRET: string;
  NODE_ENV: "development" | "production" | "test";
}
