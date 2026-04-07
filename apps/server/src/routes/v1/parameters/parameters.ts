import * as fs from 'node:fs/promises';
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import type { FastifyInstance } from 'fastify';
import { GetParametersSchema } from '../../../schemas/v1/parameters';
import { VITE_CURRENT_SCUM_VERSION } from '../../../server.ts';

// biome-ignore lint/suspicious/useAwait: required by FastifyPluginAsyncTypebox
const parametersRoutes: FastifyPluginAsyncTypebox = async (fastify: FastifyInstance) => {
    const folderPathWithFilename = `../../public/data/${VITE_CURRENT_SCUM_VERSION}/parameters/Parameters.json`;

    fastify.get(
        '/',
        {
            schema: {
                tags: ['Parameters'],
                response: {
                    200: GetParametersSchema,
                    404: {
                        $ref: 'HttpError',
                        description: 'Parameters.json not found',
                        examples: [
                            {
                                statusCode: 404,
                                error: 'Not Found',
                                message: 'Parameters.json not found',
                            },
                        ],
                    },
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
