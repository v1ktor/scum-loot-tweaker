import * as fs from 'node:fs/promises';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { NotFoundSchema } from '../../models/common/index.ts';
import { GetChildrenSchema, GetNodeSchema, GetNodesSchema, type LootNode } from '../../models/nodes/index.ts';

// biome-ignore lint/suspicious/useAwait: required by FastifyPluginAsyncZod
const nodesRoutes: FastifyPluginAsyncZod = async (fastify) => {
    const folderPath = '../../public/data/Loot/Nodes/Default';

    fastify.get(
        '/',
        {
            schema: {
                tags: ['Nodes'],
                response: {
                    200: GetNodesSchema,
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

            return { filenames };
        },
    );

    fastify.get(
        '/:node',
        {
            schema: {
                tags: ['Nodes'],
                response: {
                    200: GetNodeSchema,
                    404: NotFoundSchema('Node Airfield.json not found'),
                },
                params: z.object({
                    node: z.string().meta({ examples: ['Airfield.json'] }),
                }),
            },
        },
        async (request, reply) => {
            let data;

            try {
                data = await fs.readFile(`${folderPath}/${request.params.node}`, 'utf8');
            } catch (_error) {
                return reply.notFound(`Node ${request.params.node} not found`);
            }

            return JSON.parse(data);
        },
    );

    fastify.post(
        '/:node/children',
        {
            schema: {
                tags: ['Nodes'],
                body: z
                    .object({
                        paths: z.array(z.string()),
                    })
                    .meta({ examples: [{ paths: ['ItemLootTreeNodes.Airfield.Medical'] }] }),
                params: z.object({
                    node: z.string().meta({ examples: ['Airfield.json'] }),
                }),
                response: {
                    404: NotFoundSchema('Node Airfield.json not found'),
                    200: GetChildrenSchema,
                },
            },
        },
        async (request, reply) => {
            const { paths } = request.body;
            const pathArray = paths[0].split('.');

            let data;

            try {
                data = await fs.readFile(`${folderPath}/${request.params.node}`, 'utf8');
            } catch (_error) {
                return reply.notFound(`Node ${request.params.node} not found`);
            }

            const node = JSON.parse(data);

            return getJsonByPath(node, pathArray);
        },
    );
};

function getJsonByPath(node: LootNode, path: string[]): LootNode | null {
    const [current, ...remainingPath] = path;

    if (node.Name !== current) return null;

    if (remainingPath.length === 0) return node;

    if (node.Children) {
        const filteredChildren = node.Children.map((child) => getJsonByPath(child, remainingPath)).filter(
            (child): child is LootNode => child !== null,
        );

        return {
            ...node,
            Children: filteredChildren.length > 0 ? filteredChildren : undefined,
        };
    }

    return {
        ...node,
        Children: undefined,
    };
}

export default nodesRoutes;
