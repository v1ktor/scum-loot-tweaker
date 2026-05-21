import path from 'node:path';
import { fileURLToPath } from 'node:url';
import AutoLoad from '@fastify/autoload';
import fastifyCors from '@fastify/cors';
import { fastifySensible } from '@fastify/sensible';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { type FastifyTRPCPluginOptions, fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import Fastify, { type FastifyServerOptions } from 'fastify';
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { type AppRouter, appRouter } from './api/procedures/router.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function buildApp(opts: FastifyServerOptions = {}) {
    const fastify = Fastify({
        routerOptions: {
            maxParamLength: 5000,
        },
        logger: {
            transport: {
                target: 'pino-pretty',
            },
        },
        ...opts,
    }).withTypeProvider<ZodTypeProvider>();

    fastify.setValidatorCompiler(validatorCompiler);
    fastify.setSerializerCompiler(serializerCompiler);

    fastify.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'SCUM Loot Tweaker API',
                version: '1.0.0',
            },
        },
        transform: jsonSchemaTransform,
    });
    fastify.register(fastifySwaggerUi, {
        routePrefix: '/documentation',
    });

    fastify.register(fastifyCors);
    fastify.register(fastifySensible);

    fastify.register(AutoLoad, {
        dir: `${__dirname}/api/routes`,
        options: {
            prefix: '/api',
        },
    });

    fastify.register(fastifyTRPCPlugin, {
        prefix: '/api',
        trpcOptions: {
            router: appRouter,
            onError({ path, error }) {
                fastify.log.error(error, `Error in tRPC handler on path '${path}'`);
            },
        } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
    });

    return fastify;
}
