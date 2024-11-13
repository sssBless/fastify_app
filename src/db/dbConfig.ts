import * as dotenv from "dotenv";

dotenv.config();

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

const dbConfig = {
  host: DATABASE_HOST || "localhost",
  port: Number(DATABASE_PORT) || 5432,
  user: DATABASE_USER || "sssbless",
  password: DATABASE_PASSWORD || "newpassword",
  database: DATABASE_NAME || "fastify_app",
};

export default dbConfig;
