import { router } from '../../connections/trpc/trpc.ts';
import { itemsRouter } from './items/router.ts';
import { spawnersRouter } from './spawners/router.ts';

export const appRouter = router({
    items: itemsRouter,
    spawners: spawnersRouter,
});

export type AppRouter = typeof appRouter;
