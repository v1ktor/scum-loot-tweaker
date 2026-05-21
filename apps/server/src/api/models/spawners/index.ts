import { z } from 'zod';
import { RaritySchema } from '../common/index.ts';

export const GetSpawnersSchema = z.object({
    filenames: z.array(z.string()).meta({
        examples: [
            [
                'Special_Packages-Killbox-Examine_MP5_KillBox_Pack.json',
                'Special_Packages-Killbox-Examine_Ninja_KillBox_Pack.json',
                'Special_Packages-Killbox-Examine_Pink_KillBox_Pack.json',
                'Special_Packages-Killbox-Examine_RPG_KillBox_Pack.json',
            ],
        ],
    }),
});

export const GetSpawnerSchema = z.object({
    Nodes: z
        .array(
            z.object({
                Rarity: RaritySchema,
                Ids: z.array(z.string()),
            }),
        )
        .meta({
            examples: [
                [
                    {
                        Rarity: 'Uncommon',
                        Ids: ['ItemLootTreeNodes.Airfield.Misc', 'ItemLootTreeNodes.Airfield.Medical'],
                    },
                ],
            ],
        })
        .optional(),
    Probability: z
        .number()
        .int()
        .min(0)
        .meta({ examples: [15] })
        .optional(),
    QuantityMin: z
        .number()
        .int()
        .min(0)
        .meta({ examples: [1] })
        .optional(),
    QuantityMax: z
        .number()
        .int()
        .min(0)
        .meta({ examples: [2] })
        .optional(),
    AllowDuplicates: z
        .boolean()
        .meta({ examples: [false] })
        .optional(),
    ShouldFilterItemsByZone: z
        .boolean()
        .meta({ examples: [true] })
        .optional(),
    InitialDamage: z
        .number()
        .int()
        .min(0)
        .meta({ examples: [20] })
        .optional(),
    RandomDamage: z
        .number()
        .int()
        .min(0)
        .meta({ examples: [20] })
        .optional(),
    InitialUsage: z
        .number()
        .int()
        .min(0)
        .meta({ examples: [20] })
        .optional(),
    RandomUsage: z
        .number()
        .int()
        .min(0)
        .meta({ examples: [20] })
        .optional(),
    ShouldApplyLocationSpecificDamageModifier: z.boolean().optional(),
    ShouldApplyLocationSpecificProbabilityModifier: z.boolean().optional(),
    PostSpawnActions: z
        .array(z.string())
        .meta({ examples: [['SetAmmoAmount_BigStash', 'SetClothesDirtiness_ResidentialClothes']] })
        .optional(),
    Items: z
        .array(
            z.object({
                Id: z.string(),
                Rarity: RaritySchema,
            }),
        )
        .optional(),
    FixedItems: z.array(z.string()).optional(),
    Subpresets: z
        .array(
            z.object({
                Id: z.string(),
                Rarity: RaritySchema,
            }),
        )
        .meta({
            examples: [
                [
                    {
                        Rarity: 'Uncommon',
                        Id: 'Special_Packages-Vault-Examine_Pistols_Deagle_Judge_Vault_Pack',
                    },
                ],
            ],
        })
        .optional(),
});

export type GetSpawner = z.infer<typeof GetSpawnerSchema>;
