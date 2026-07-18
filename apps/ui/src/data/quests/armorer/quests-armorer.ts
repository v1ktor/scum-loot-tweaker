import { ARMORER_QUESTS_TIER1 } from '@/data/quests/armorer/quests-armorer-tier-1.ts';
import { ARMORER_QUESTS_TIER2 } from '@/data/quests/armorer/quests-armorer-tier-2.ts';
import { ARMORER_QUESTS_TIER3 } from '@/data/quests/armorer/quests-armorer-tier-3.ts';
import type { Quest } from '../quests.types.ts';

export const ARMORER_QUESTS: Quest[] = [...ARMORER_QUESTS_TIER1, ...ARMORER_QUESTS_TIER2, ...ARMORER_QUESTS_TIER3];
