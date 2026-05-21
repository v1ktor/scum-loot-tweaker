import { z } from 'zod';
import { RaritySchema } from '../common/index.ts';

export const GetNodesSchema = z.object({
    filenames: z.array(z.string()).meta({ examples: [['Airfield.json', 'Bar.json', 'Barn.json']] }),
});

export type LootNode = {
    Name: string;
    Rarity: z.infer<typeof RaritySchema>;
    Children?: LootNode[];
    Variations?: string[];
    PostSpawnActions?: string[];
};

export const GetNodeSchema: z.ZodType<LootNode> = z.lazy(() =>
    z.object({
        Name: z.string().meta({ examples: ['ItemLootTreeNodes'] }),
        Rarity: RaritySchema,
        Children: z
            .array(GetNodeSchema)
            .meta({
                examples: [
                    [
                        {
                            Name: 'Airfield',
                            Rarity: 'Uncommon',
                            Children: [
                                {
                                    Name: 'tools',
                                    Rarity: 'Uncommon',
                                    Children: [
                                        {
                                            Name: 'Car_Battery',
                                            Rarity: 'Rare',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                ],
            })
            .optional(),
        Variations: z
            .array(z.string())
            .meta({ examples: [['1H_MK5000_Metal']] })
            .optional(),
        PostSpawnActions: z
            .array(z.string())
            .meta({ examples: [['SetAmmoAmount_BigStash', 'SetClothesDirtiness_ResidentialClothes']] })
            .optional(),
    }),
);

export type LootChildrenNode = {
    Name: string;
    Rarity: z.infer<typeof RaritySchema>;
    Children?: LootChildrenNode[];
};

export const GetChildrenSchema: z.ZodType<LootChildrenNode> = z.lazy(() =>
    z.object({
        Name: z.string().meta({ examples: ['ItemLootTreeNodes'] }),
        Rarity: RaritySchema,
        Children: z
            .array(GetChildrenSchema)
            .meta({
                examples: [
                    [
                        {
                            Name: 'Airfield',
                            Rarity: 'Uncommon',
                            Children: [
                                {
                                    Name: 'tools',
                                    Rarity: 'Uncommon',
                                    Children: [
                                        {
                                            Name: 'Car_Battery',
                                            Rarity: 'Rare',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                ],
            })
            .optional(),
    }),
);
