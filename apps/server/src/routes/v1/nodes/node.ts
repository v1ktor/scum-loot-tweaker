import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance, FastifyRequest } from "fastify";
import { VITE_CURRENT_SCUM_VERSION } from "../../../server.ts";
import { GetNodesSchema, LootNode } from "../../../schemas/v1/nodes";
import * as fs from "node:fs";
import { Type } from "@sinclair/typebox";
import { NotFoundSchema } from "../../../schemas/v1/common";

const nodesRoutes: FastifyPluginAsyncTypebox = async (fastify: FastifyInstance) => {
  const folderPath = `../../public/data/${VITE_CURRENT_SCUM_VERSION}/nodes`;

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
        404: {
          $ref: 'HttpError',
          description: "Node not found",
          examples: [{
            statusCode: 404,
            error: "Not Found",
            message: "Node Airfield.json not found"
          }]
        }
      },
      params: Type.Object({
        node: Type.String({ examples: ["Airfield.json"] })
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

  fastify.post("/:node/children", {
    schema: {
      tags: ["Nodes"],
      body: Type.Object({
        paths: Type.Array(Type.String())
      }, { examples: [{ paths: ["ItemLootTreeNodes.Airfield.Medical"] }] }),
      params: Type.Object({
        node: Type.String({ examples: ["Airfield.json"] })
      }),
      response: {
        404: NotFoundSchema("Airfield.json"),
        200: { $ref: 'GetChildrenSchema' }
      }
    }
  }, async (request: FastifyRequest<{ Params: { node: string }, Body: { paths: string[] } }>, reply) => {
    const { paths } = request.body;
    const pathArray = paths[0].split('.');

    let data;

    try {
      data = fs.readFileSync(`${folderPath}/${request.params.node}`, "utf8");
    } catch (error) {
      return reply.notFound(`Node ${request.params.node} not found`);
    }

    const node = JSON.parse(data);

    return getJsonByPath(node, pathArray);
  })
}

function getJsonByPath(node: LootNode, path: string[]): LootNode | null {
  const [current, ...remainingPath] = path;

  // If the current node does not match, return null
  if (node.Name !== current) return null;

  // If we've reached the last element in the path, return the current node
  if (remainingPath.length === 0) return node;

  // If there are remaining elements in the path, process the children
  if (node.Children) {
    const filteredChildren = node.Children
      .map(child => getJsonByPath(child, remainingPath))
      .filter((child): child is LootNode => child !== null); // Filter out nulls and enforce type

    // Return the current node with filtered children
    return {
      ...node,
      Children: filteredChildren.length > 0 ? filteredChildren : undefined
    };
  }

  return {
    ...node,
    Children: undefined // Ensure we return the correct structure
  };
}


export default nodesRoutes;
