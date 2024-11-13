import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { VITE_CURRENT_SCUM_VERSION } from "../../../server.ts";
import { GetParametersSchema } from "../../../schemas/v1/parameters";
import * as fs from "node:fs";

const parametersRoutes: FastifyPluginAsyncTypebox = async (fastify: FastifyInstance) => {
  const folderPathWithFilename = `public/data/${VITE_CURRENT_SCUM_VERSION}/parameters/Parameters.json`;

  fastify.get("/", {
    schema: {
      tags: ["Parameters"],
      response: {
        200: GetParametersSchema,
        404: {
          $ref: 'HttpError',
          description: "Parameters.json not found",
          examples: [{
            statusCode: 404,
            error: "Not Found",
            message: "Parameters.json not found"
          }]
        }
      }
    }
  }, async (_, reply) => {
    let data;

    try {
      data = fs.readFileSync(folderPathWithFilename, "utf8");
    } catch (error) {
      return reply.notFound(`Parameters.json not found`);
    }

    return JSON.parse(data);
  });
}

export default parametersRoutes;