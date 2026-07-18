import type { Quest } from '@/data/quests/quests.types.ts';

export const ARMORER_QUESTS_TIER2: Quest[] = [
    {
        id: 'T2_AR_Fetch_Kar98k',
        AssociatedNPC: 'Armorer',
        Tier: 2,
        Title: 'Blue Pill Bolt Action',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 3700,
                Fame: 10,
                TradeDeal: [{ Item: 'WeaponGhillie_Woodland', Amount: 1, Price: 1800, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Weapon_98k_Karabiner'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_AR_Fetch_Mosin',
        AssociatedNPC: 'Armorer',
        Tier: 2,
        Title: 'Red Pill Bolt Action',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 3500,
                Fame: 10,
                TradeDeal: [
                    { Item: 'Ghillie_Suit_Jacket_01', Amount: 1, Price: 2000, Fame: 0 },
                    { Item: 'Ghillie_Suit_Pants_01', Amount: 1, Price: 2000, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Weapon_MosinNagant'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_AR_Fetch_AKS-74U',
        AssociatedNPC: 'Armorer',
        Tier: 2,
        Title: 'Pocket Size AK',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 2200,
                Fame: 10,
                TradeDeal: [
                    { Item: 'Weapon_Krueger', Amount: 1, Price: 1000, Fame: 0 },
                    { Item: 'Magazine_Krueger', Amount: 3, Price: 200, Fame: 0 },
                    { Item: 'Cal_22_Ammobox', Amount: 5, Price: 100, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Weapon_AKS_74U'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_AR_Fetch_RPK',
        AssociatedNPC: 'Armorer',
        Tier: 2,
        Title: 'Rudimental Fun',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 4150,
                Fame: 10,
                TradeDeal: [{ Item: 'Weapon_MK18', Amount: 1, Price: 7000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Weapon_RPK-74'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_AR_Fetch_AKM',
        AssociatedNPC: 'Armorer',
        Tier: 2,
        Title: 'When Good Gets Better',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 2600,
                Fame: 10,
                TradeDeal: [
                    { Item: 'Magazine_VHS2', Amount: 3, Price: 800, Fame: 0 },
                    { Item: 'Magazine_AK15', Amount: 3, Price: 400, Fame: 0 },
                    { Item: 'Magazine_AK47', Amount: 5, Price: 500, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Weapon_AKM'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_AR_Fetch_M249',
        AssociatedNPC: 'Armorer',
        Tier: 2,
        Title: 'Horde Mower 9000',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 4600,
                Fame: 10,
                TradeDeal: [{ Item: 'Weapon_VHS2', Amount: 1, Price: 8000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Weapon_M249'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_AR_Fetch_NightVisionGoggles',
        AssociatedNPC: 'Armorer',
        Tier: 2,
        Title: 'Night Time Story',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 2150,
                Fame: 10,
                TradeDeal: [{ Item: '1H_Bushman', Amount: 1, Price: 1200, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Night_Vision_Goggles_01'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_AR_Kill_Puppets',
        AssociatedNPC: 'Armorer',
        Tier: 2,
        Title: 'A Proper Shootout',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 2500,
                Fame: 15,
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TrackingCaption: 'Kill puppets (cannot kill with vehicle)',
                TargetCharacters: ['Puppet'],
                Amount: 25,
            },
        ],
    },
    {
        id: 'T2_AR_Fetch_AK47Rail',
        AssociatedNPC: 'Armorer',
        Tier: 2,
        Title: 'RIS Adapters',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1200,
                Fame: 10,
                TradeDeal: [{ Item: 'WeaponSights_RedDot_CA401B', Amount: 1, Price: 1200, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['ScopeRail_AK47'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_AR_Fetch_M82Scope',
        AssociatedNPC: 'Armorer',
        Tier: 2,
        Title: 'M82 Scopes',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 2500,
                Fame: 10,
                TradeDeal: [{ Item: 'WeaponScope_ACOG_01', Amount: 1, Price: 1700, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: [
                            'WeaponScope_M82A1',
                            'WeaponScope_M82A1_Black',
                            'WeaponScope_M82A1_Desert',
                            'WeaponScope_M82A1_Snow',
                        ],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_AR_Fetch_ScopeM1',
        AssociatedNPC: 'Armorer',
        Tier: 2,
        Title: 'M1 Scopes',
        Description: 'M1 Experimental scope is not accepted.',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1800,
                Fame: 10,
                TradeDeal: [{ Item: 'WeaponSights_V3_Holographic', Amount: 1, Price: 1200, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['WeaponSights_M1_ScopeAndSights'],
                        RequiredNum: 2,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_AR_Fetch_WeaponCleaningKit',
        AssociatedNPC: 'Armorer',
        Tier: 2,
        Title: 'Neat And Tidy',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1700,
                Fame: 10,
                TradeDeal: [{ Item: 'WeaponSuppressor_AK15', Amount: 1, Price: 1800, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Weapon_Cleaning_Kit'],
                        RequiredNum: 1,
                        MinAcceptedItemUses: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_AR_Interact_PoliceStationData',
        AssociatedNPC: 'Armorer',
        Tier: 2,
        Title: 'The Blues',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 3000,
                Fame: 10,
                TradeDeal: [{ Item: 'WeaponSuppressor_Handgun', Amount: 1, Price: 1000, Fame: 30 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Disable Satellite',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 3,
                MaxNeeded: 3,
            },
            {
                Type: 'Interaction',
                SequenceIndex: 1,
                TrackingCaption: 'Erase Data from Cameras',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 7,
                MaxNeeded: 9,
            },
        ],
    },
];
