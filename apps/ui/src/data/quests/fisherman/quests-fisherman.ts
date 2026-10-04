import { FISHERMAN_QUESTS_TIER1 } from '@/data/quests/fisherman/quests-fisherman-tier-1.ts';
import { FISHERMAN_QUESTS_TIER2 } from '@/data/quests/fisherman/quests-fisherman-tier-2.ts';
import { FISHERMAN_QUESTS_TIER3 } from '@/data/quests/fisherman/quests-fisherman-tier-3.ts';
import type { Quest } from '../quests.types.ts';

export const FISHERMAN_QUESTS: Quest[] = [
    ...FISHERMAN_QUESTS_TIER1,
    ...FISHERMAN_QUESTS_TIER2,
    ...FISHERMAN_QUESTS_TIER3,
];
