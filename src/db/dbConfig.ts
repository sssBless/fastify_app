import * as dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const dbConfig = {
  host: DB_HOST || "localhost",
  port: Number(DB_PORT) || 5432,
  user: DB_USER || "sssbless",
  password: DB_PASSWORD || "newpassword",
  database: DB_NAME || "fastify_app",
};

export default dbConfig;
