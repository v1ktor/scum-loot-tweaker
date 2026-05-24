import { router } from '../../connections/trpc/trpc.ts';
import { itemsRouter } from './items/router.ts';
import { nodesRouter } from './nodes/router.ts';
import { spawnersRouter } from './spawners/router.ts';

export const appRouter = router({
    items: itemsRouter,
    spawners: spawnersRouter,
    nodes: nodesRouter,
});

export type AppRouter = typeof appRouter;
