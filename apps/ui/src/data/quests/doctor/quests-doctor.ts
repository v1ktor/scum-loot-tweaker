import { DOCTOR_QUESTS_TIER1 } from '@/data/quests/doctor/quests-doctor-tier-1.ts';
import { DOCTOR_QUESTS_TIER2 } from '@/data/quests/doctor/quests-doctor-tier-2.ts';
import { DOCTOR_QUESTS_TIER3 } from '@/data/quests/doctor/quests-doctor-tier-3.ts';
import type { Quest } from '../quests.types.ts';

export const DOCTOR_QUESTS: Quest[] = [...DOCTOR_QUESTS_TIER1, ...DOCTOR_QUESTS_TIER2, ...DOCTOR_QUESTS_TIER3];
