import fastify from "fastify";
import * as dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const server = fastify();

server.register(routes);

const start = async () => {
  try {
    await server.listen({ port: 3000 });

    console.log("Server listening on http://localhost:3000");
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
