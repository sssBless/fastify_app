import fastify from "fastify";
import * as dotenv from "dotenv";
import routes from "./routes";
import DbConnector from "./db/DbConnector";

dotenv.config();

const server = fastify();

server.register(routes);

server.addHook("onClose", (instance, done) => {
  console.log("Server is shutting down...");
  DbConnector.getInstance().disconnect();
  done();
});

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
