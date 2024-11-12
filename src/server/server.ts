import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import path from 'path';
import { fileURLToPath } from 'url';
import fastifyEnv from "@fastify/env";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type Envs = {
  VITE_CURRENT_SCUM_VERSION: string;
}

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty"
    }
  }
});

const envSchema = {
  type: "object",
  required: ["VITE_CURRENT_SCUM_VERSION"],
  properties: {
    VITE_CURRENT_SCUM_VERSION: { type: "string" }
  }
}

const envOptions = {
  confKey: "config",
  schema: envSchema,
  dotenv: true,
  data: process.env,
}

await fastify.register(fastifyEnv, envOptions);

fastify.register(fastifySwagger);
fastify.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
});

fastify.register(AutoLoad, {
  dir: `${__dirname}/routes`
})

export const { VITE_CURRENT_SCUM_VERSION } = fastify.getEnvs<Envs>();

async function server() {
  await fastify.listen({
    port: 3000,
    host: "0.0.0.0"
  });
}

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close();
    process.exit(0);
  });
});

server();