import { router } from '../../connections/trpc/trpc.ts';
import { charactersRouter } from './characters/router.ts';
import { cooldownGroupsRouter } from './cooldown-groups/router.ts';
import { itemsRouter } from './items/router.ts';
import { nodesRouter } from './nodes/router.ts';
import { parametersRouter } from './parameters/router.ts';
import { spawnersRouter } from './spawners/router.ts';

export const appRouter = router({
    items: itemsRouter,
    characters: charactersRouter,
    spawners: spawnersRouter,
    nodes: nodesRouter,
    parameters: parametersRouter,
    cooldownGroups: cooldownGroupsRouter,
});

export type AppRouter = typeof appRouter;
