import type { Quest } from '@/data/quests/quests.types.ts';

export const MECHANIC_QUESTS_TIER1: Quest[] = [
    {
        id: 'T1_MC_Fetch_CarJack',
        AssociatedNPC: 'Mechanic',
        Tier: 1,
        Title: 'In Need Of A Jack',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 700,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Car_Jack'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_MC_Fetch_MetalScraps',
        AssociatedNPC: 'Mechanic',
        Tier: 1,
        Title: 'Full Metal Mechanic',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 500,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: [
                            'Metal_Scrap_01',
                            'Metal_Scrap_02',
                            'Metal_Scrap_03',
                            'Metal_Scrap_04',
                            'Metal_Scrap_05',
                        ],
                        RequiredNum: 20,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_MC_Fetch_CarBatteryCables',
        AssociatedNPC: 'Mechanic',
        Tier: 1,
        Title: 'Jump Start Me Gently',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 630,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Car_Battery_Cables'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_MC_Fetch_BrakeOil',
        AssociatedNPC: 'Mechanic',
        Tier: 1,
        Title: 'Road Sabotage',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 550,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Brake_Oil'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_MC_Fetch_CarRepairKit',
        AssociatedNPC: 'Mechanic',
        Tier: 1,
        Title: 'Car Tinker',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 660,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Car_Repair_Kit'],
                        RequiredNum: 1,
                        MinAcceptedItemUses: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_MC_Fetch_AeroplaneRepairKit',
        AssociatedNPC: 'Mechanic',
        Tier: 1,
        Title: 'Bottom Gun',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 3000,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Aeroplane_Repair_Kit'],
                        RequiredNum: 1,
                        MinAcceptedItemUses: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_MC_Fetch_WrenchPipe',
        AssociatedNPC: 'Mechanic',
        Tier: 1,
        Title: 'Torque Applier 9000',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 550,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['1H_Pipe_Wrench'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_MC_Fetch_GasolineCanisterSmall',
        AssociatedNPC: 'Mechanic',
        Tier: 1,
        Title: 'Driving On Reserve',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 700,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Gasoline_Canister_Small'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_MC_Fetch_OilFilter',
        AssociatedNPC: 'Mechanic',
        Tier: 1,
        Title: 'No Filter',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 650,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Oil_Filter'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_MC_Interact_DisableTVs',
        AssociatedNPC: 'Mechanic',
        Tier: 1,
        Title: 'Illegal Streaming',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 800,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: "Disable Tv's (scattered across Island)",
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 3,
                MaxNeeded: 5,
            },
        ],
    },
];
