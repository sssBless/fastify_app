import { FastifyInstance } from "fastify";
import { dataQuerySchema } from "../schemas/dataSchemas";
import { getDataHandler } from "../handlers/dataHandler";

export default async function dataRoutes(server: FastifyInstance) {
  server.get(
    "/data",
    {
      schema: {
        querystring: dataQuerySchema,
      },
    },

    getDataHandler
  );
}
