import { GENERAL_GOODS_QUESTS_TIER1 } from '@/data/quests/general-goods/quests-general-goods-tier-1.ts';
import { GENERAL_GOODS_QUESTS_TIER2 } from '@/data/quests/general-goods/quests-general-goods-tier-2.ts';
import { GENERAL_GOODS_QUESTS_TIER3 } from '@/data/quests/general-goods/quests-general-goods-tier-3.ts';
import type { Quest } from '../quests.types.ts';

export const GENERAL_GOODS_QUESTS: Quest[] = [
    ...GENERAL_GOODS_QUESTS_TIER1,
    ...GENERAL_GOODS_QUESTS_TIER2,
    ...GENERAL_GOODS_QUESTS_TIER3,
];
