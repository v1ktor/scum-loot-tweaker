import type { Quest } from '@/data/quests/quests.types.ts';

export const GENERAL_GOODS_QUESTS_TIER3: Quest[] = [
    {
        id: 'T3_GG_Fetch_ElectricGenerator',
        AssociatedNPC: 'GeneralGoods',
        Tier: 3,
        Title: 'Advanced Power',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2450,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Portable_Electric_Stove', Amount: 1, Price: 600, Fame: 0 },
                    { Item: 'Refrigerator_Portable_Small', Amount: 1, Price: 800, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['ElectricityGenerator'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_GG_Fetch_Banjo',
        AssociatedNPC: 'GeneralGoods',
        Tier: 3,
        Title: 'Life Goals',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2500,
                Fame: 20,
                TradeDeal: [{ Item: '1H_Crowbar', Amount: 5, Price: 500, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Banjo'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_GG_Fetch_Guitar',
        AssociatedNPC: 'GeneralGoods',
        Tier: 3,
        Title: 'Lucille',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2500,
                Fame: 20,
                TradeDeal: [
                    { Item: '2H_Metal_Baseball_Bat', Amount: 1, Price: 600, Fame: 0 },
                    { Item: '2H_Baseball_Bat_Blaze', Amount: 1, Price: 1500, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Guitar'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_GG_Fetch_HikingBackpack',
        AssociatedNPC: 'GeneralGoods',
        Tier: 3,
        Title: 'Modern Day Looters',
        Description:
            'Only Hiking backpacks the General trader sells are accepted, no Camo or Police backpacks accepted.',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2200,
                Fame: 20,
                TradeDeal: [{ Item: '1H_Traynors_Axe', Amount: 2, Price: 1500, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: [
                            'Hiking_Backpack_01_01',
                            'Hiking_Backpack_01_02',
                            'Hiking_Backpack_01_03',
                            'Hiking_Backpack_01_04',
                            'Hiking_Backpack_01_05',
                        ],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_GG_Fetch_MetalDetector',
        AssociatedNPC: 'GeneralGoods',
        Tier: 3,
        Title: 'The Sweet Sound of Beep Beep',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2350,
                Fame: 20,
                TradeDeal: [{ Item: 'BaseExpansionKit_Lvl1', Amount: 1, Price: 15000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['MetalDetector'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_GG_Fetch_AdvancedCompass',
        AssociatedNPC: 'GeneralGoods',
        Tier: 3,
        Title: 'Navigating The Island',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2500,
                Fame: 20,
                TradeDeal: [{ Item: 'BaseExpansionKit_Lvl2', Amount: 1, Price: 25000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Compass_Advanced'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_GG_Fetch_Chainsaw',
        AssociatedNPC: 'GeneralGoods',
        Tier: 3,
        Title: 'A Massacre',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2150,
                Fame: 20,
                TradeDeal: [{ Item: '1H_Crowbar', Amount: 3, Price: 600, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Chainsaw'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_GG_Fetch_Crowbar',
        AssociatedNPC: 'GeneralGoods',
        Tier: 3,
        Title: 'Professional Thief',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2100,
                Fame: 20,
                TradeDeal: [{ Item: 'Chainsaw', Amount: 1, Price: 2500, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['1H_Crowbar'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_GG_Fetch_CementBag',
        AssociatedNPC: 'GeneralGoods',
        Tier: 3,
        Title: 'Build To Last',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2100,
                Fame: 20,
                TradeDeal: [
                    { Item: '2H_Shovel_01', Amount: 3, Price: 150, Fame: 0 },
                    { Item: 'GravelBag', Amount: 10, Price: 20, Fame: 0 },
                    { Item: 'Tool_Box', Amount: 1, Price: 1000, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['CementBag'],
                        RequiredNum: 3,
                        MinAcceptedItemUses: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_GG_Fetch_PortableFridge',
        AssociatedNPC: 'GeneralGoods',
        Tier: 3,
        Title: "Cold'n'Fresh",
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2450,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Tool_Box', Amount: 5, Price: 600, Fame: 0 },
                    { Item: 'Tool_Box_Small', Amount: 10, Price: 500, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Refrigerator_Portable_Small'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_GG_Interact_DisableAntennaDrums',
        AssociatedNPC: 'GeneralGoods',
        Tier: 3,
        Title: 'Long Distance Relationship',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 5000,
                Fame: 35,
                TradeDeal: [{ Item: 'Compass_Advanced', Amount: 1, Price: 1500, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Disable Antenna Drums - At C2 Radio station',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 6,
                MaxNeeded: 6,
            },
        ],
    },
    {
        id: 'T3_GG_Interact_DLCellTowerData',
        AssociatedNPC: 'GeneralGoods',
        Tier: 3,
        Title: 'Reminiscence Of The Past',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 4000,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Chainsaw', Amount: 1, Price: 2000, Fame: 0 },
                    { Item: 'Tool_Box', Amount: 3, Price: 1000, Fame: 0 },
                    { Item: '2H_Axe', Amount: 3, Price: 900, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Extract Data from Comms Machines - At D0 Radar station',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 8,
                MaxNeeded: 8,
            },
        ],
    },
    {
        id: 'T3_GG_Interact_TamperFiles',
        AssociatedNPC: 'GeneralGoods',
        Tier: 3,
        Title: 'Strictly Confidential',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 6000,
                Fame: 30,
                TradeDeal: [
                    { Item: 'Electrician_Glove_01_01', Amount: 3, Price: 400, Fame: 0 },
                    { Item: 'Grinding_Stone_01', Amount: 5, Price: 500, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Tamper with TEC1 files - in ANY Bunker',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 10,
                MaxNeeded: 10,
            },
        ],
    },
    {
        id: 'T3_GG_Interact_ZeljavaListeningCenter',
        AssociatedNPC: 'GeneralGoods',
        Tier: 3,
        Title: 'Deep Underground',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 8000,
                Fame: 40,
                TradeDeal: [{ Item: 'BaseExpansionKit_Lvl2', Amount: 1, Price: 30000, Fame: 90 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Adjust listening devices - Devices found in mountain main loot room',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 6,
                MaxNeeded: 6,
            },
        ],
    },
];
