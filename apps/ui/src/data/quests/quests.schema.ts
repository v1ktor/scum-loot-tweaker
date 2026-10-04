import { z } from 'zod';

export const AssociatedNPCSchema = z.enum([
    'Hunter',
    'MasterHunter',
    'GeneralGoods',
    'Armorer',
    'Mechanic',
    'Doctor',
    'Banker',
    'Barber',
    'Bartender',
    'Fisherman',
]);

export const QuestTypeSchema = z.enum(['Fetch', 'Elimination', 'Interaction']);

export const SkillSchema = z.enum([
    'Archery',
    'Aviation',
    'Awareness',
    'Boxing',
    'Camouflage',
    'Cooking',
    'Demolition',
    'Driving',
    'Endurance',
    'Engineering',
    'Farming',
    'Handgun',
    'Medical',
    'MeleeWeapons',
    'Motorcycle',
    'Rifles',
    'Running',
    'Sniping',
    'Stealth',
    'Survival',
    'Tactics',
    'Thievery',
]);

export const CookLevelSchema = z.enum(['Raw', 'Undercooked', 'Cooked', 'Overcooked', 'Burned']);
export const CookQualitySchema = z.enum(['Ruined', 'Bad', 'Poor', 'Good', 'Excellent', 'Perfect']);

export const TierSchema = z.literal([1, 2, 3, 4]).catch(1);

export const SkillRewardSchema = z.object({
    Skill: SkillSchema,
    Experience: z.number(),
});

export const TradeDealSchema = z.object({
    Item: z.string(),
    Price: z.number().optional(),
    Amount: z.number().optional(),
    AllowExcluded: z.boolean().optional(),
    Fame: z.number().optional(),
});

export const RewardSchema = z.object({
    CurrencyNormal: z.number().optional(),
    CurrencyGold: z.number().optional(),
    Fame: z.number().optional(),
    Skills: z.array(SkillRewardSchema).optional(),
    TradeDeals: z.array(TradeDealSchema).optional(),
    // TODO: some quests have items as rewards, but there is no official documentation on how to structure reward pool
    Items: z.array(z.string()).optional(),
    // TODO: Some quests unlock blueprints as rewards, but there is no official documentation on how to structure reward pool
    Blueprints: z.array(z.string()).optional(),
});

export const MapLocationSchema = z.object({
    Location: z.union([z.object({ X: z.number(), Y: z.number(), Z: z.number() }), z.string()]),
    SizeFactor: z.number(),
});

const conditionBase = {
    uid: z.string().optional(),
    CanBeAutoCompleted: z.boolean().optional(),
    TrackingCaption: z.string().optional(),
    SequenceIndex: z.number().default(0),
    LocationsShownOnMap: z.array(MapLocationSchema).optional(),
};

export const EliminationConditionSchema = z.object({
    ...conditionBase,
    Type: z.literal('Elimination'),
    TargetCharacters: z.array(z.string()).default([]),
    Amount: z.number().default(1),
    AllowedWeapons: z.array(z.string()).optional(),
});

export const RequiredItemSchema = z.object({
    AcceptedItems: z.array(z.string()).default([]),
    RequiredNum: z.number().default(1),
    RandomAdditionalRequiredNum: z.number().optional(),
    MinAcceptedItemUses: z.number().optional(),
    MinAcceptedCookLevel: CookLevelSchema.optional(),
    MaxAcceptedCookLevel: CookLevelSchema.optional(),
    MinAcceptedCookQuality: CookQualitySchema.optional(),
    MinAcceptedItemMass: z.number().optional(),
    MinAcceptedItemHealth: z.number().optional(),
    MinAcceptedItemResourceRatio: z.number().optional(),
    MinAcceptedItemResourceAmount: z.number().optional(),
});

export const FetchConditionSchema = z.object({
    ...conditionBase,
    Type: z.literal('Fetch'),
    DisablePurchaseOfRequiredItems: z.boolean().optional(),
    PlayerKeepsItems: z.boolean().optional(),
    RequiredItems: z.array(RequiredItemSchema).default([]),
});

export const InteractionLocationSchema = z.object({
    AnchorMesh: z.string().default(''),
    Instance: z.number().optional(),
    FallbackTransform: z.string().optional(),
    VisibleMesh: z.string().optional(),
});

export const InteractionConditionSchema = z
    .object({
        ...conditionBase,
        Type: z.literal('Interaction'),
        Locations: z.array(InteractionLocationSchema).default([]),
        MinNeeded: z.number().default(1),
        MaxNeeded: z.number().optional(),
        SpawnOnlyNeeded: z.boolean().optional(),
        WorldMarkerShowDistance: z.number().optional(),
    })
    .transform((condition) => ({
        ...condition,
        MaxNeeded: condition.MaxNeeded ?? Math.max(1, condition.Locations.length),
    }));

export const ConditionSchema = z.discriminatedUnion(
    'Type',
    [FetchConditionSchema, EliminationConditionSchema, InteractionConditionSchema],
    {
        error: (issue) => {
            const type = (issue.input as { Type?: unknown } | undefined)?.Type;
            const seen = typeof type === 'string' ? `"${type}"` : 'nothing';
            return `Unsupported "Type" (${seen}), expected ${QuestTypeSchema.options.join(', ')}`;
        },
    },
);

export const QuestBodySchema = z.object({
    AssociatedNPC: AssociatedNPCSchema,
    Tier: TierSchema,
    Title: z.string(),
    Description: z.string().optional(),
    TimeLimitHours: z.number(),
    RewardPool: z.array(RewardSchema).default([]),
    Conditions: z.array(ConditionSchema).default([]),
});

export const QuestSchema = QuestBodySchema.extend({ id: z.string() });
