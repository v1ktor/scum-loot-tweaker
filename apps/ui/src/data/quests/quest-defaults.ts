import type { Quest } from './quests.types.ts';

export const TIME_LIMIT_HOURS_BY_TIER: Record<Quest['Tier'], number> = {
    1: 48,
    2: 72,
    3: 96,
};
