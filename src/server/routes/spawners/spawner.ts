import { FastifyInstance, FastifyRequest } from "fastify";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import * as fs from "node:fs";
import { VITE_CURRENT_SCUM_VERSION } from "../../server.ts";
import path from "path";

const spawnerRoutes: FastifyPluginAsyncTypebox = async (fastify: FastifyInstance) => {
  const folderPath = `public/data/${VITE_CURRENT_SCUM_VERSION}/spawners`;

  fastify.get("/", {
      schema: {
        response: {
          200: Type.Object({
            filenames: Type.Array(Type.String())
          })
        }
      }
    },
    async () => {
      const isFile = (fileName: fs.PathLike) => {
        return fs.lstatSync(fileName).isFile();
      }

      const filenames = fs.readdirSync(folderPath)
        .filter(fileName => {
          const fileNameWithFullPath = path.join(folderPath, fileName);
          return isFile(fileNameWithFullPath);
        })

      return {
        filenames
      };
    }
  )

  fastify.get("/:spawner", {
      schema: {
        response: {},
        params: Type.Object({
          spawner: Type.String()
        })
      }
    },
    async (request: FastifyRequest<{ Params: { spawner: string } }>) => {
      const data = fs.readFileSync(`${folderPath}/${request.params.spawner}`, "utf8");
      const json = JSON.parse(data);

      return json;
    })
}

export default spawnerRoutes;