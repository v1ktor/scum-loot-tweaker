import type { Quest } from '@/data/quests/quests.types.ts';

export const ARMORER_QUESTS_TIER3: Quest[] = [
    {
        id: 'T3_AR_Fetch_GoldDeagle',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Ultimate Freedom Fighter',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3000,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Weapon_MP5_SD', Amount: 1, Price: 6000, Fame: 0 },
                    { Item: 'Magazine_MP5', Amount: 3, Price: 400, Fame: 0 },
                    { Item: 'Cal_9mm_Ammobox', Amount: 5, Price: 350, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Weapon_DEagle_50Gold'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_AR_Fetch_GoldM1911',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Gold Fever',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3500,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Weapon_AKS_74U', Amount: 1, Price: 7500, Fame: 0 },
                    { Item: 'Magazine_AKS_74U', Amount: 3, Price: 400, Fame: 0 },
                    { Item: 'Cal_5_45x39mm_Ammobox', Amount: 5, Price: 750, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Weapon_M1911_Gold'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_AR_Fetch_M82',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'The Hole Maker',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 7200,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Weapon_SVD_Dragunov', Amount: 1, Price: 15000, Fame: 0 },
                    { Item: 'Magazine_SVD_Dragunov', Amount: 3, Price: 500, Fame: 0 },
                    { Item: 'WeaponScope_Dragunov', Amount: 1, Price: 2500, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Weapon_M82A1'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_AR_Fetch_SVD',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Stress Relief',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 6000,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Weapon_RPK-74', Amount: 1, Price: 10000, Fame: 0 },
                    { Item: 'Magazine_RPK', Amount: 3, Price: 600, Fame: 0 },
                    { Item: 'Cal_7_62x39mm_Ammobox', Amount: 5, Price: 600, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Weapon_SVD_Dragunov'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_AR_Fetch_VHS_BG',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Just A Blast',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 4000,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Mine_01', Amount: 2, Price: 3000, Fame: 0 },
                    { Item: 'Armor_Tactical_Vest_01_01', Amount: 1, Price: 1000, Fame: 0 },
                    { Item: 'K6-3_Helmet', Amount: 1, Price: 500, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Weapon_VHS_BG'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_AR_Fetch_PROMTrap',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Bloody PROM',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2000,
                Fame: 20,
                TradeDeal: [{ Item: 'Claymore', Amount: 2, Price: 3500, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['PromTrap'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_AR_Fetch_Mines',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Buried Treasure',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2500,
                Fame: 20,
                TradeDeal: [{ Item: 'PromTrap', Amount: 2, Price: 2500, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Mine_01', 'Mine_02'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_AR_Fetch_TNT',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Trinitrotoluene',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2400,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Weapon_SCAR_DMR', Amount: 1, Price: 14000, Fame: 0 },
                    { Item: 'Magazine_SCAR_DMR', Amount: 4, Price: 250, Fame: 0 },
                    { Item: 'Cal_308_Ammobox', Amount: 5, Price: 500, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['TNT'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_AR_Fetch_Uranium',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Atomic 92',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 6500,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Weapon_M82A1', Amount: 1, Price: 20000, Fame: 0 },
                    { Item: 'Magazine_M82A1', Amount: 2, Price: 1500, Fame: 0 },
                    { Item: 'Cal_50BMG_Ammobox', Amount: 3, Price: 2000, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Depleted_Uranium'],
                        RequiredNum: 1,
                        MinAcceptedItemResourceRatio: 0.1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_AR_Fetch_C4',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'The Big Bang',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 5000,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Frag_Grenade', Amount: 3, Price: 2500, Fame: 0 },
                    { Item: 'TNT', Amount: 2, Price: 4000, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [{ AcceptedItems: ['C4'], RequiredNum: 1 }],
            },
        ],
    },
    {
        id: 'T3_AR_Mix_NuclearCombo',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Nuclear Energy',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 6000,
                Fame: 30,
                TradeDeal: [{ Item: 'Gas_Mask_01', Amount: 2, Price: 1200, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Graphite'],
                        RequiredNum: 3,
                        MinAcceptedItemResourceRatio: 0.1,
                    },
                ],
            },
            {
                Type: 'Elimination',
                SequenceIndex: 1,
                TrackingCaption: 'Kill Nuclear Puppets',
                TargetCharacters: [
                    'BP_Zombie_Nuclear',
                    'BP_Zombie_Nuclear_Fat_Male',
                    'BP_Zombie_Nuclear_Fat_Female',
                    'BP_Zombie_Nuclear_Muscular_Male',
                    'BP_Zombie_Nuclear_Muscular_Female',
                ],
                Amount: 5,
            },
        ],
    },
    {
        id: 'T3_AR_Mix_NuclearCombo2',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Nuclear Energy',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 6000,
                Fame: 30,
                TradeDeal: [{ Item: 'Gas_Mask_01', Amount: 2, Price: 1200, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Depleted_Uranium'],
                        RequiredNum: 3,
                        MinAcceptedItemResourceRatio: 0.1,
                    },
                ],
            },
            {
                Type: 'Elimination',
                SequenceIndex: 1,
                TrackingCaption: 'Kill Nuclear Puppets',
                TargetCharacters: [
                    'BP_Zombie_Nuclear',
                    'BP_Zombie_Nuclear_Fat_Male',
                    'BP_Zombie_Nuclear_Fat_Female',
                    'BP_Zombie_Nuclear_Muscular_Male',
                    'BP_Zombie_Nuclear_Muscular_Female',
                ],
                Amount: 5,
            },
        ],
    },
    {
        id: 'T3_AR_Kill_RazorPuppetA1',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Abominations (A1)',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 7500,
                Fame: 30,
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TrackingCaption: 'Kill Razors',
                TargetCharacters: ['Razor'],
                Amount: 3,
            },
            {
                Type: 'Elimination',
                SequenceIndex: 1,
                TrackingCaption: 'Kill Puppets',
                TargetCharacters: ['Puppet'],
                Amount: 15,
            },
        ],
    },
    {
        id: 'T3_AR_Kill_RazorPuppetA3',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Abominations (A3)',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 7500,
                Fame: 30,
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TrackingCaption: 'Kill Razors',
                TargetCharacters: ['Razor'],
                Amount: 3,
            },
            {
                Type: 'Elimination',
                SequenceIndex: 1,
                TrackingCaption: 'Kill Puppets',
                TargetCharacters: ['Puppet'],
                Amount: 15,
            },
        ],
    },
    {
        id: 'T3_AR_Kill_RazorPuppetC4',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Abominations (C4)',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 7500,
                Fame: 30,
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TrackingCaption: 'Kill Razors',
                TargetCharacters: ['Razor'],
                Amount: 3,
            },
            {
                Type: 'Elimination',
                SequenceIndex: 1,
                TrackingCaption: 'Kill Puppets',
                TargetCharacters: ['Puppet'],
                Amount: 15,
            },
        ],
    },
    {
        id: 'T3_AR_Kill_RazorPuppetD1',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Abominations (D1)',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 7500,
                Fame: 30,
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TrackingCaption: 'Kill Razors',
                TargetCharacters: ['Razor'],
                Amount: 3,
            },
            {
                Type: 'Elimination',
                SequenceIndex: 1,
                TrackingCaption: 'Kill Puppets',
                TargetCharacters: ['Puppet'],
                Amount: 15,
            },
        ],
    },
    {
        id: 'T3_AR_Kill_Sentry',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Chunk Of Metal',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 8000,
                Fame: 50,
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TrackingCaption: 'Kill Sentry',
                TargetCharacters: ['Sentry'],
                Amount: 1,
            },
        ],
    },
    {
        id: 'T3_AR_Interact_SabotageSentriesA1',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Production Sabotage (A1)',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 6500,
                Fame: 15,
                TradeDeal: [{ Item: 'Weapon_VSS_VZ', Amount: 1, Price: 10000, Fame: 75 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Sabotage Sentry Parts',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 4,
                MaxNeeded: 4,
            },
        ],
    },
    {
        id: 'T3_AR_Interact_SabotageSentriesA3',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Production Sabotage (A3)',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 6500,
                Fame: 15,
                TradeDeal: [{ Item: 'Weapon_VSS_VZ', Amount: 1, Price: 10000, Fame: 75 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Sabotage Sentry Parts',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 4,
                MaxNeeded: 4,
            },
        ],
    },
    {
        id: 'T3_AR_Interact_SabotageSentriesC4',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Production Sabotage (C4)',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 6500,
                Fame: 15,
                TradeDeal: [{ Item: 'Weapon_VSS_VZ', Amount: 1, Price: 10000, Fame: 75 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Sabotage Sentry Parts',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 4,
                MaxNeeded: 4,
            },
        ],
    },
    {
        id: 'T3_AR_Interact_SabotageSentriesD1',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Production Sabotage (D1)',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 6500,
                Fame: 15,
                TradeDeal: [{ Item: 'Weapon_VSS_VZ', Amount: 1, Price: 10000, Fame: 75 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Sabotage Sentry Parts',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 4,
                MaxNeeded: 4,
            },
        ],
    },
    {
        id: 'T3_AR_Interact_ZeljavaJets',
        AssociatedNPC: 'Armorer',
        Tier: 3,
        Title: 'Zeljava Jets',
        Description: '',
        RewardPool: [],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                Locations: [],
                MinNeeded: 1,
                MaxNeeded: 1,
            },
        ],
    },
];
