import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance, FastifyRequest } from "fastify";
import { VITE_CURRENT_SCUM_VERSION } from "../../../server.ts";
import { GetNodesSchema } from "../../../schemas/v1/nodes";
import * as fs from "node:fs";
import { Type } from "@sinclair/typebox";

const nodesRoutes: FastifyPluginAsyncTypebox = async (fastify: FastifyInstance) => {
  const folderPath = `public/data/${VITE_CURRENT_SCUM_VERSION}/nodes`;

  fastify.get("/", {
    schema: {
      tags: ["Nodes"],
      response: {
        200: GetNodesSchema
      }
    }
  }, async (request) => {
    let filenames = <string[]>[];

    try {
      filenames = fs.readdirSync(folderPath);
    } catch (error) {
      request.log.error(error);

      return { filenames };
    }

    return { filenames };
  });

  fastify.get("/:node", {
    schema: {
      tags: ["Nodes"],
      response: {
        200: { $ref: 'GetNodeSchema' },
        404: { $ref: 'HttpError' }
      },
      params: Type.Object({
        node: Type.String()
      })
    }
  }, async (request: FastifyRequest<{ Params: { node: string } }>, reply) => {
    let data;

    try {
      data = fs.readFileSync(`${folderPath}/${request.params.node}`, "utf8");
    } catch (error) {
      return reply.notFound(`Node ${request.params.node} not found`);
    }

    return JSON.parse(data);
  });
}

export default nodesRoutes;