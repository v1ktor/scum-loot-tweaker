import { FastifyInstance, FastifyRequest } from "fastify";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import * as fs from "node:fs";
import { VITE_CURRENT_SCUM_VERSION } from "../../../server.ts";
import path from "path";
import { GetSpawnerSchema, GetSpawnersSchema } from "../../../schemas/v1/spawners";
import { isFile } from "../../../utils/is-file.ts";


const spawnerRoutes: FastifyPluginAsyncTypebox = async (fastify: FastifyInstance) => {
  const folderPath = `public/data/${VITE_CURRENT_SCUM_VERSION}/spawners`;

  fastify.get("/", {
      schema: {
        tags: ["Spawners"],
        response: {
          200: GetSpawnersSchema
        }
      }
    },
    async (request) => {
      let filenames = <string[]>[];

      try {
        filenames = fs.readdirSync(folderPath);
      } catch (error) {
        request.log.error(error);

        return { filenames };
      }

      filenames = filenames.filter(fileName => {
        const fileNameWithFullPath = path.join(folderPath, fileName);
        return isFile(fileNameWithFullPath);
      });


      return {
        filenames
      };
    }
  )

  fastify.get("/:spawner", {
      schema: {
        tags: ["Spawners"],
        response: {
          200: GetSpawnerSchema,
          404: {
            $ref: 'HttpError',
            description: "Spawner not found",
            examples: [{
              statusCode: 404,
              error: "Not Found",
              message: "Spawner MyCustomSpawner.json not found"
            }]
          }
        },
        params: Type.Object({
          spawner: Type.String()
        })
      }
    },
    async (request: FastifyRequest<{ Params: { spawner: string } }>, reply) => {
      let data;

      try {
        data = fs.readFileSync(`${folderPath}/${request.params.spawner}`, "utf8");
      } catch (error) {
        return reply.notFound(`Spawner ${request.params.spawner} not found`);
      }

      return JSON.parse(data);
    })
}

export default spawnerRoutes;