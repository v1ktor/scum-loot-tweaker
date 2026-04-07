import * as fs from 'node:fs/promises';
import path from 'node:path';
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { GetSpawnerSchema, GetSpawnersSchema } from '../../../schemas/v1/spawners';
import { VITE_CURRENT_SCUM_VERSION } from '../../../server.ts';
import { isFile } from '../../../utils/is-file.ts';

// biome-ignore lint/suspicious/useAwait: required by FastifyPluginAsyncTypebox
const spawnerRoutes: FastifyPluginAsyncTypebox = async (fastify: FastifyInstance) => {
    const folderPath = `../../public/data/${VITE_CURRENT_SCUM_VERSION}/spawners`;

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
                    404: {
                        $ref: 'HttpError',
                        description: 'Spawner not found',
                        examples: [
                            {
                                statusCode: 404,
                                error: 'Not Found',
                                message: 'Spawner MyCustomSpawner.json not found',
                            },
                        ],
                    },
                },
                params: Type.Object({
                    spawner: Type.String({ examples: ['Buildings-Airfield_Hangar-Examine_CardBox.json'] }),
                }),
            },
        },
        async (request: FastifyRequest<{ Params: { spawner: string } }>, reply) => {
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
