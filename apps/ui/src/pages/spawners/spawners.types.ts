import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../../../../server/src/api/procedures/router.ts';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type Option = { label: string; value: string };

export type Spawner = RouterOutputs['spawners']['get'];

export type SpawnerItem = NonNullable<Spawner['Items']>[number];
export type SpawnerNode = NonNullable<Spawner['Nodes']>[number];

export type LootNode = RouterOutputs['nodes']['get'];

export type DataTableMeta = {
    onDelete?: (rowIndex: number) => void;
    onUpdateRarity?: (rowIndex: number, rarity: SpawnerItem['Rarity']) => void;
    onUpdateItem?: (rowIndex: number, itemId: string) => void;
};
