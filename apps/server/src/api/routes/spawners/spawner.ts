import * as fs from 'node:fs/promises';
import path from 'node:path';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { isFile } from '../../../utils/is-file.ts';
import { NotFoundSchema } from '../../models/common/index.ts';
import { GetSpawnerSchema, GetSpawnersSchema } from '../../models/spawners/index.ts';

// biome-ignore lint/suspicious/useAwait: required by FastifyPluginAsyncZod
const spawnerRoutes: FastifyPluginAsyncZod = async (fastify) => {
    const folderPath = `../../public/data/Loot/Spawners/Default`;

    fastify.get(
        '/',
        {
            schema: {
                tags: ['Spawners'],
                response: {
                    200: GetSpawnersSchema,
                },
            },
        },
        async (request) => {
            let filenames = <string[]>[];

            try {
                filenames = await fs.readdir(folderPath);
            } catch (error) {
                request.log.error(error);

                return { filenames };
            }

            const checks = await Promise.all(
                filenames.map((fileName) => {
                    const fileNameWithFullPath = path.join(folderPath, fileName);
                    return isFile(fileNameWithFullPath);
                }),
            );
            filenames = filenames.filter((_, i) => checks[i]);

            return {
                filenames,
            };
        },
    );

    fastify.get(
        '/:spawner',
        {
            schema: {
                tags: ['Spawners'],
                response: {
                    200: GetSpawnerSchema,
                    404: NotFoundSchema('Spawner MyCustomSpawner.json not found'),
                },
                params: z.object({
                    spawner: z.string().meta({ examples: ['Buildings-Airfield_Hangar-Examine_CardBox.json'] }),
                }),
            },
        },
        async (request, reply) => {
            let data;

            try {
                data = await fs.readFile(`${folderPath}/${request.params.spawner}`, 'utf8');
            } catch (_error) {
                return reply.notFound(`Spawner ${request.params.spawner} not found`);
            }

            return JSON.parse(data);
        },
    );
};

export default spawnerRoutes;
