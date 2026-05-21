import * as fs from 'node:fs/promises';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { NotFoundSchema } from '../../models/common/index.ts';
import { GetCooldownGroupsSchema } from '../../models/cooldown-groups/index.ts';

// biome-ignore lint/suspicious/useAwait: required by FastifyPluginAsyncZod
const cooldownGroupsRoutes: FastifyPluginAsyncZod = async (fastify) => {
    const folderPathWithFilename = `../../public/data/Loot/CooldownGroups/Default/CooldownGroups.json`;

    fastify.get(
        '/',
        {
            schema: {
                tags: ['Cooldown Groups'],
                response: {
                    200: GetCooldownGroupsSchema,
                    404: NotFoundSchema('CooldownGroups.json not found'),
                },
            },
        },
        async (_, reply) => {
            let data;

            try {
                data = await fs.readFile(folderPathWithFilename, 'utf8');
            } catch (_error) {
                return reply.notFound(`CooldownGroups.json not found`);
            }

            return JSON.parse(data);
        },
    );
};

export default cooldownGroupsRoutes;
