import { router } from '../../connections/trpc/trpc.ts';
import { itemsRouter } from './items/router.ts';
import { nodesRouter } from './nodes/router.ts';
import { parametersRouter } from './parameters/router.ts';
import { spawnersRouter } from './spawners/router.ts';

export const appRouter = router({
    items: itemsRouter,
    spawners: spawnersRouter,
    nodes: nodesRouter,
    parameters: parametersRouter,
});

export type AppRouter = typeof appRouter;
