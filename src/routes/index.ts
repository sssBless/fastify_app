import { FastifyInstance } from "fastify";
import dataRoutes from "./dataRoutes";

export default async function routes(server: FastifyInstance) {
  await server.register(dataRoutes);
}
