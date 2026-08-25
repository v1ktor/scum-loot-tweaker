import type { Quest } from './quests.types.ts';

export const QUEST_TIERS = [1, 2, 3, 4] as const satisfies readonly Quest['Tier'][];

export const TIME_LIMIT_HOURS_BY_TIER: Record<Quest['Tier'], number> = {
    1: 48,
    2: 72,
    3: 96,
    4: 120,
};
