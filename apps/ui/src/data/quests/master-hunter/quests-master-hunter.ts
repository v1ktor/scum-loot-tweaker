import { MASTER_HUNTER_QUESTS_TIER1 } from '@/data/quests/master-hunter/quests-master-hunter-tier-1.ts';
import { MASTER_HUNTER_QUESTS_TIER2 } from '@/data/quests/master-hunter/quests-master-hunter-tier-2.ts';
import { MASTER_HUNTER_QUESTS_TIER3 } from '@/data/quests/master-hunter/quests-master-hunter-tier-3.ts';
import type { Quest } from '../quests.types.ts';

export const MASTER_HUNTER_QUESTS: Quest[] = [
    ...MASTER_HUNTER_QUESTS_TIER1,
    ...MASTER_HUNTER_QUESTS_TIER2,
    ...MASTER_HUNTER_QUESTS_TIER3,
];
