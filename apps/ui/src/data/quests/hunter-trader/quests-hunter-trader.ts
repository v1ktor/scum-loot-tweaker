import { HUNTER_TRADER_QUESTS_TIER1 } from '@/data/quests/hunter-trader/quests-hunter-trader-tier-1.ts';
import { HUNTER_TRADER_QUESTS_TIER2 } from '@/data/quests/hunter-trader/quests-hunter-trader-tier-2.ts';
import { HUNTER_TRADER_QUESTS_TIER3 } from '@/data/quests/hunter-trader/quests-hunter-trader-tier-3.ts';
import type { Quest } from '../quests.types.ts';

export const HUNTER_TRADER_QUESTS: Quest[] = [
    ...HUNTER_TRADER_QUESTS_TIER1,
    ...HUNTER_TRADER_QUESTS_TIER2,
    ...HUNTER_TRADER_QUESTS_TIER3,
];
