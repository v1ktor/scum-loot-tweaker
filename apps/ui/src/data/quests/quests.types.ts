import type { z } from 'zod';
import type {
    AssociatedNPCSchema,
    CookLevelSchema,
    CookQualitySchema,
    EliminationConditionSchema,
    FetchConditionSchema,
    InteractionConditionSchema,
    InteractionLocationSchema,
    MapLocationSchema,
    QuestSchema,
    QuestTypeSchema,
    RequiredItemSchema,
    RewardSchema,
    SkillRewardSchema,
    SkillSchema,
    TradeDealSchema,
} from './quests.schema.ts';

export type AssociatedNPC = z.infer<typeof AssociatedNPCSchema>;
export type QuestType = z.infer<typeof QuestTypeSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type SkillReward = z.infer<typeof SkillRewardSchema>;
export type TradeDeal = z.infer<typeof TradeDealSchema>;
export type Reward = z.infer<typeof RewardSchema>;
export type MapLocation = z.infer<typeof MapLocationSchema>;
export type EliminationCondition = z.infer<typeof EliminationConditionSchema>;
export type CookLevel = z.infer<typeof CookLevelSchema>;
export type CookQuality = z.infer<typeof CookQualitySchema>;
export type RequiredItem = z.infer<typeof RequiredItemSchema>;
export type FetchCondition = z.infer<typeof FetchConditionSchema>;
export type InteractionLocation = z.infer<typeof InteractionLocationSchema>;
export type InteractionCondition = z.infer<typeof InteractionConditionSchema>;
export type Condition = EliminationCondition | FetchCondition | InteractionCondition;
export type Quest = z.infer<typeof QuestSchema>;
