import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { VITE_CURRENT_SCUM_VERSION } from "../../../server.ts";
import * as fs from "node:fs";
import { GetCooldownGroupsSchema } from "../../../schemas/v1/cooldown-groups";

const cooldownGroupsRoutes: FastifyPluginAsyncTypebox = async (fastify: FastifyInstance) => {
  const folderPathWithFilename = `public/data/${VITE_CURRENT_SCUM_VERSION}/cooldown-groups/CooldownGroups.json`;

  fastify.get("/", {
    schema: {
      tags: ["Cooldown Groups"],
      response: {
        200: GetCooldownGroupsSchema,
        404: {
          $ref: 'HttpError',
          description: "CooldownGroups.json not found",
          examples: [{
            statusCode: 404,
            error: "Not Found",
            message: "CooldownGroups.json not found"
          }]
        }
      }
    }
  }, async (_, reply) => {
    let data;

    try {
      data = fs.readFileSync(folderPathWithFilename, "utf8");
    } catch (error) {
      return reply.notFound(`CooldownGroups.json not found`);
    }

    return JSON.parse(data);
  });
}

export default cooldownGroupsRoutes;