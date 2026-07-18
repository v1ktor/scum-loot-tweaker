import type { Quest } from '@/data/quests/quests.types.ts';

export const GENERAL_GOODS_QUESTS_TIER2: Quest[] = [
    {
        id: 'T2_GG_Fetch_Pickaxe',
        AssociatedNPC: 'GeneralGoods',
        Tier: 2,
        Title: 'Local Miners',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1600,
                Fame: 10,
                TradeDeal: [{ Item: '1H_Little_Spade', Amount: 1, Price: 100, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['2H_Pickaxe'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_GG_Fetch_Bedroll',
        AssociatedNPC: 'GeneralGoods',
        Tier: 2,
        Title: 'Rest Easy',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1300,
                Fame: 10,
                TradeDeal: [{ Item: 'Barbed_Wire', Amount: 5, Price: 150, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Bedroll'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_GG_Fetch_Dildo',
        AssociatedNPC: 'GeneralGoods',
        Tier: 2,
        Title: 'The Jackhammer',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1600,
                Fame: 10,
                TradeDeal: [{ Item: 'Tool_Box', Amount: 3, Price: 800, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['1H_Dildo'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_GG_Fetch_Backpack',
        AssociatedNPC: 'GeneralGoods',
        Tier: 2,
        Title: 'Travel Gear',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1200,
                Fame: 10,
                TradeDeal: [{ Item: 'Padlock', Amount: 5, Price: 50, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: [
                            'Backpack_02_01',
                            'Backpack_02_02',
                            'Backpack_02_03',
                            'Backpack_02_04',
                            'Backpack_02_05',
                        ],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_GG_Fetch_Drill',
        AssociatedNPC: 'GeneralGoods',
        Tier: 2,
        Title: 'Home Improvement',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1550,
                Fame: 10,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Drill'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_GG_Fetch_RebarCutter',
        AssociatedNPC: 'GeneralGoods',
        Tier: 2,
        Title: 'Heavy Duty Tools',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1500,
                Fame: 10,
                TradeDeal: [{ Item: 'MetalDetector', Amount: 1, Price: 3000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Rebar_Cutter'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_GG_Fetch_RedGhoul',
        AssociatedNPC: 'GeneralGoods',
        Tier: 2,
        Title: 'Energy Spectacle',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1600,
                Fame: 10,
                TradeDeal: [{ Item: 'Canteen', Amount: 3, Price: 200, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Energy_Drink_Red_Ghoul'],
                        RequiredNum: 2,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_GG_Fetch_Radio',
        AssociatedNPC: 'GeneralGoods',
        Tier: 2,
        Title: 'Sounds of The Island',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1400,
                Fame: 10,
                TradeDeal: [{ Item: 'Smartphone_Battery', Amount: 3, Price: 400, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Radio'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_GG_Fetch_PaintCans',
        AssociatedNPC: 'GeneralGoods',
        Tier: 2,
        Title: "Everyone's Artist",
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1600,
                Fame: 10,
                TradeDeal: [{ Item: 'Soap', Amount: 10, Price: 50, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: [
                            'ColorCan_AmberYellow',
                            'ColorCan_BaronBrown',
                            'ColorCan_Black',
                            'ColorCan_CherryRed',
                            'ColorCan_ColdCyan',
                            'ColorCan_ColdGrey',
                            'ColorCan_CottonCandy',
                            'ColorCan_DarkBrown',
                            'ColorCan_DarkGreen',
                            'ColorCan_DarkGrey',
                            'ColorCan_DarkUrban',
                            'ColorCan_DeepOrange',
                            'ColorCan_EarthGreen',
                            'ColorCan_EarthGrey',
                            'ColorCan_EarthRed',
                            'ColorCan_EarthYellow',
                            'ColorCan_FireEngineRed',
                            'ColorCan_FlatBrown',
                            'ColorCan_FlatGrey',
                            'ColorCan_FlatWhite',
                            'ColorCan_ForestGreen',
                            'ColorCan_GalaxyBlue',
                            'ColorCan_GalaxyGrey',
                            'ColorCan_HazyPurple',
                            'ColorCan_LightBrown',
                            'ColorCan_LightUrban',
                            'ColorCan_LimeGreen',
                            'ColorCan_NavyBlue',
                            'ColorCan_NavyGrey',
                            'ColorCan_PoliceBlue',
                            'ColorCan_RedChocolate',
                            'ColorCan_SnowWhite',
                            'ColorCan_VelvetBrown',
                            'ColorCan_WarmGrey',
                        ],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_GG_Fetch_PortableElectricStove',
        AssociatedNPC: 'GeneralGoods',
        Tier: 2,
        Title: 'Cooking Appliance',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1200,
                Fame: 10,
                TradeDeal: [{ Item: 'Grinding_Stone_01', Amount: 1, Price: 1200, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Portable_Electric_Stove'],
                        RequiredNum: 1,
                        RandomAdditionalRequiredNum: 4,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_GG_Interact_Ads',
        AssociatedNPC: 'GeneralGoods',
        Tier: 2,
        Title: 'Marketing Specialist',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1700,
                Fame: 15,
                TradeDeal: [
                    { Item: 'PETBottle01', Amount: 3, Price: 50, Fame: 0 },
                    { Item: 'PETBottle03', Amount: 3, Price: 50, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Locate and mark advertisement boards (scattered on Island)',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 1,
                MaxNeeded: 5,
            },
        ],
    },
    {
        id: 'T3_GG_Interact_AirportCommunications',
        AssociatedNPC: 'GeneralGoods',
        Tier: 2,
        Title: 'Island Comms',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 8000,
                Fame: 40,
                TradeDeal: [{ Item: 'BaseExpansionKit_Lvl1', Amount: 1, Price: 15000, Fame: 90 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Perform maintenance check on airfield generator at B2 airfield',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 1,
                MaxNeeded: 1,
            },
            {
                Type: 'Interaction',
                SequenceIndex: 1,
                TrackingCaption: 'Perform maintenance check on satellite dish at B2 airfield',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 1,
                MaxNeeded: 1,
            },
        ],
    },
    {
        id: 'T2_GG_Interact_FaxMachines',
        AssociatedNPC: 'GeneralGoods',
        Tier: 2,
        Title: 'Data Wipe',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1700,
                Fame: 15,
                TradeDeal: [{ Item: 'Rebar_Cutter', Amount: 1, Price: 2000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Erase data from fax machines - At B0 Junkyard or Z1 Trainyard',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 1,
                MaxNeeded: 1,
            },
        ],
    },
    {
        id: 'T2_GG_Interact_AnalyzeFiles',
        AssociatedNPC: 'GeneralGoods',
        Tier: 2,
        Title: 'Deep Underground',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1700,
                Fame: 15,
                TradeDeal: [{ Item: 'Drill', Amount: 1, Price: 1500, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Locate files and folders around the Island - D4 airfield Main hangar offices',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 1,
                MaxNeeded: 1,
            },
        ],
    },
];
