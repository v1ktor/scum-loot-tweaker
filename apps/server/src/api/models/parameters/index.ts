import { z } from 'zod';
import { AllowedLocationsSchema } from '../common/index.ts';

export const GetParametersSchema = z
    .object({
        Parameters: z.array(
            z.object({
                Id: z.string(),
                IsDisabledForSpawning: z.boolean(),
                AllowedLocations: z.array(AllowedLocationsSchema),
                CooldownPerSquadMemberMin: z.number().int().min(0),
                CooldownPerSquadMemberMax: z.number().int().min(0),
                CooldownGroup: z.string(),
                Variations: z.array(z.string()),
                ShouldOverrideInitialAndRandomUsage: z.boolean(),
                InitialUsageOverride: z.number().int().min(0),
                RandomUsageOverride: z.number().int().min(0),
                ShouldOverrideInitialAndRandomStack: z.boolean(),
                InitialStackOverride: z.number().int().min(0),
                RandomStackOverride: z.number().int().min(0),
            }),
        ),
    })
    .meta({
        examples: [
            {
                Parameters: [
                    {
                        Id: '12_Gauge_Birdshot',
                        IsDisabledForSpawning: false,
                        AllowedLocations: ['Coastal', 'Continental', 'Mountain'],
                        CooldownPerSquadMemberMin: 0,
                        CooldownPerSquadMemberMax: 0,
                        CooldownGroup: 'CooldownGroup_Ammo',
                        Variations: [],
                        ShouldOverrideInitialAndRandomUsage: false,
                        InitialUsageOverride: 0,
                        RandomUsageOverride: 0,
                        ShouldOverrideInitialAndRandomStack: false,
                        InitialStackOverride: 0,
                        RandomStackOverride: 0,
                    },
                    {
                        Id: '12_Gauge_Birdshot_Ammobox',
                        IsDisabledForSpawning: false,
                        AllowedLocations: ['Coastal', 'Continental', 'Mountain'],
                        CooldownPerSquadMemberMin: 0,
                        CooldownPerSquadMemberMax: 0,
                        CooldownGroup: '',
                        Variations: [],
                        ShouldOverrideInitialAndRandomUsage: false,
                        InitialUsageOverride: 0,
                        RandomUsageOverride: 0,
                        ShouldOverrideInitialAndRandomStack: false,
                        InitialStackOverride: 0,
                        RandomStackOverride: 0,
                    },
                ],
            },
        ],
    });
