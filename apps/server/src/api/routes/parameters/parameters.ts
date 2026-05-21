import * as fs from 'node:fs/promises';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { NotFoundSchema } from '../../models/common/index.ts';
import { GetParametersSchema } from '../../models/parameters/index.ts';

// biome-ignore lint/suspicious/useAwait: required by FastifyPluginAsyncZod
const parametersRoutes: FastifyPluginAsyncZod = async (fastify) => {
    const folderPathWithFilename = `../../public/data/Loot/Parameters/Default/Parameters.json`;

    fastify.get(
        '/',
        {
            schema: {
                tags: ['Parameters'],
                response: {
                    200: GetParametersSchema,
                    404: NotFoundSchema('Parameters.json not found'),
                },
            },
        },
        async (_, reply) => {
            let data;

            try {
                data = await fs.readFile(folderPathWithFilename, 'utf8');
            } catch (_error) {
                return reply.notFound(`Parameters.json not found`);
            }

            return JSON.parse(data);
        },
    );
};

export default parametersRoutes;
