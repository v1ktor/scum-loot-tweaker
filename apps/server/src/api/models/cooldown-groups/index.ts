import { z } from 'zod';

export const GetCooldownGroupsSchema = z.object({
    DeleteAllDefaultCooldownGroups: z.boolean().meta({ examples: [false] }),
    DefaultCooldownGroupsToDelete: z.array(z.string()).meta({ examples: [[]] }),
    CooldownGroups: z
        .array(
            z.object({
                Name: z.string().meta({ examples: ['Weapons.Handguns.Tier.Low'] }),
                _comment: z
                    .string()
                    .meta({ examples: ['1min-2hours'] })
                    .optional(),
                CooldownMin: z
                    .number()
                    .min(0)
                    .meta({ examples: [0.5] }),
                CooldownMax: z
                    .number()
                    .min(0)
                    .meta({ examples: [1] }),
                IsAffectedByLowerGroups: z.boolean().meta({ examples: [true] }),
            }),
        )
        .meta({
            examples: [
                [
                    {
                        Name: 'Weapons.Handguns.Tier.Low',
                        _comment: '30min-1hours',
                        CooldownMin: 0.5,
                        CooldownMax: 1,
                        IsAffectedByLowerGroups: true,
                    },
                    {
                        Name: 'Weapons.Handguns.Tier.Medium',
                        _comment: '30min-2hours',
                        CooldownMin: 0.5,
                        CooldownMax: 2,
                        IsAffectedByLowerGroups: true,
                    },
                ],
            ],
        }),
});
