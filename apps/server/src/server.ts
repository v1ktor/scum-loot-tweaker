import { buildApp } from './app.ts';

const fastify = buildApp();

['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
        await fastify.close();
        process.exit(0);
    });
});

await fastify.listen({
    port: Number(process.env.PORT) || 3000,
    host: '0.0.0.0',
});
