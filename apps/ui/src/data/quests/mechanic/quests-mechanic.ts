import { MECHANIC_QUESTS_TIER1 } from '@/data/quests/mechanic/quests-mechanic-tier-1.ts';
import { MECHANIC_QUESTS_TIER2 } from '@/data/quests/mechanic/quests-mechanic-tier-2.ts';
import { MECHANIC_QUESTS_TIER3 } from '@/data/quests/mechanic/quests-mechanic-tier-3.ts';
import type { Quest } from '../quests.types.ts';

export const MECHANIC_QUESTS: Quest[] = [...MECHANIC_QUESTS_TIER1, ...MECHANIC_QUESTS_TIER2, ...MECHANIC_QUESTS_TIER3];
