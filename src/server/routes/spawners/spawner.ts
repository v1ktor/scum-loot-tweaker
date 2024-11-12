import { FastifyInstance, FastifyRequest } from "fastify";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import * as fs from "node:fs";
import { VITE_CURRENT_SCUM_VERSION } from "../../server.ts";
import path from "path";

const StringEnum = <T extends string[]>(items: [...T]) =>
  Type.Unsafe<T[number]>({ type: "string", enum: items });

const spawnerRoutes: FastifyPluginAsyncTypebox = async (fastify: FastifyInstance) => {
  const folderPath = `public/data/${VITE_CURRENT_SCUM_VERSION}/spawners`;

  fastify.get("/", {
      schema: {
        tags: ["Spawners"],
        response: {
          200: Type.Object({
            filenames: Type.Array(Type.String())
          })
        }
      }
    },
    async (request) => {
      const isFile = (fileName: fs.PathLike) => {
        return fs.lstatSync(fileName).isFile();
      }

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
          200: Type.Object({
            Nodes: Type.Optional(Type.Array(
              Type.Object({
                Rarity: StringEnum(["Abundant", "Common", "Uncommon", "Rare", "Very Rare", "Extremely Rare"]),
                Ids: Type.Array(Type.String())
              })
            )),
            Probability: Type.Optional(Type.Integer({ minimum: 0 })),
            QuantityMin: Type.Optional(Type.Integer({ minimum: 0 })),
            QuantityMax: Type.Optional(Type.Integer({ minimum: 0 })),
            AllowDuplicates: Type.Optional(Type.Boolean()),
            ShouldFilterItemsByZone: Type.Optional(Type.Boolean()),
            InitialDamage: Type.Optional(Type.Integer({ minimum: 0 })),
            RandomDamage: Type.Optional(Type.Integer({ minimum: 0 })),
            InitialUsage: Type.Optional(Type.Integer({ minimum: 0 })),
            RandomUsage: Type.Optional(Type.Integer({ minimum: 0 })),
            PostSpawnActions: Type.Optional(Type.Array(Type.String())),
            Subpresets: Type.Optional(Type.Array(
              Type.Object({
                Id: Type.String(),
                Rarity: StringEnum(["Abundant", "Common", "Uncommon", "Rare", "Very Rare", "Extremely Rare"])
              })
            ))
          })
        },
        params: Type.Object({
          spawner: Type.String()
        })
      }
    },
    async (request: FastifyRequest<{ Params: { spawner: string } }>) => {
      const data = fs.readFileSync(`${folderPath}/${request.params.spawner}`, "utf8");

      return JSON.parse(data);
    })
}

export default spawnerRoutes;