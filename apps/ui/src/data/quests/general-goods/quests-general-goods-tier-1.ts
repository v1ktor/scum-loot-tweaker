import type { Quest } from '@/data/quests/quests.types.ts';

export const GENERAL_GOODS_QUESTS_TIER1: Quest[] = [
    {
        id: 'T1_GG_Fetch_SexyShorts',
        AssociatedNPC: 'GeneralGoods',
        Tier: 1,
        Title: 'In need of Sexy and Short',
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
                        AcceptedItems: [
                            'Sexy_Jeans_Shorts_01',
                            'Sexy_Jeans_Shorts_02',
                            'Sexy_Jeans_Shorts_03',
                            'Sexy_Jeans_Shorts_04',
                            'Sexy_Jeans_Shorts_05',
                            'Sexy_Jeans_Shorts_06',
                            'Sexy_Jeans_Shorts_07',
                        ],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_GG_Fetch_GrindingStone',
        AssociatedNPC: 'GeneralGoods',
        Tier: 1,
        Title: 'Sharp as a Tack',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 740,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Grinding_Stone_01', 'Grinding_Stone_02'],
                        RequiredNum: 1,
                        MinAcceptedItemHealth: 30,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_GG_Fetch_BobbyPins',
        AssociatedNPC: 'GeneralGoods',
        Tier: 1,
        Title: 'Thief in the making',
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
                        AcceptedItems: ['Bobby_pin'],
                        RequiredNum: 10,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_GG_Fetch_Glue',
        AssociatedNPC: 'GeneralGoods',
        Tier: 1,
        Title: 'Glue Needed',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 680,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Glue'],
                        RequiredNum: 5,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_GG_Fetch_Batteries',
        AssociatedNPC: 'GeneralGoods',
        Tier: 1,
        Title: 'Basic Power',
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
                        AcceptedItems: ['Batteries', 'Smartphone_Battery'],
                        RequiredNum: 2,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_GG_Fetch_SmallToolbox',
        AssociatedNPC: 'GeneralGoods',
        Tier: 1,
        Title: 'Basic Repairs',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 790,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Tool_Box_Small'],
                        RequiredNum: 1,
                        MinAcceptedItemHealth: 25,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_GG_Fetch_Needle',
        AssociatedNPC: 'GeneralGoods',
        Tier: 1,
        Title: 'Searching Through A Haystack',
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
                        AcceptedItems: ['Needle'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_GG_Fetch_SewingKit',
        AssociatedNPC: 'GeneralGoods',
        Tier: 1,
        Title: 'Sewing Orders',
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
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Sewing_kit'],
                        RequiredNum: 1,
                        MinAcceptedItemUses: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_GG_Fetch_ChocolateCandy',
        AssociatedNPC: 'GeneralGoods',
        Tier: 1,
        Title: 'Sweet Tooth',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 580,
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
                            'ChocolateCandy_01',
                            'ChocolateCandy_03',
                            'ChocolateCandy_04',
                            'ChocolateCandy_05',
                            'ChocolateCandy_06',
                            'ChocolateCandy_07',
                            'ChocolateCandy_08',
                            'ChocolateCandy_09',
                            'ChocolateCandy_10',
                            'ChocolateCandy_11',
                        ],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_GG_Fetch_Soap',
        AssociatedNPC: 'GeneralGoods',
        Tier: 1,
        Title: 'Hygiene 101',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 620,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Soap'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_GG_Fetch_DuctTape',
        AssociatedNPC: 'GeneralGoods',
        Tier: 1,
        Title: 'Does it Move ?',
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
                        AcceptedItems: ['Duct_Tape'],
                        RequiredNum: 10,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_GG_Interact_SabotageACs',
        AssociatedNPC: 'GeneralGoods',
        Tier: 1,
        Title: 'Making A Buck',
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
                TrackingCaption: 'Sabotage Air conditioners (scattered on Island)',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 4,
                MaxNeeded: 9,
            },
        ],
    },
    {
        id: 'T1_GG_Interact_TelephoneBooths',
        AssociatedNPC: 'GeneralGoods',
        Tier: 1,
        Title: 'Safety First',
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
                TrackingCaption: 'Check Telephone booths (scattered on Island)',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 2,
                MaxNeeded: 4,
            },
        ],
    },
];
