import type { Quest } from '@/data/quests/quests.types.ts';

export const HUNTER_TRADER_QUESTS_TIER2: Quest[] = [
    {
        id: 'T2_RH_Fetch_AnimalFat',
        AssociatedNPC: 'HunterTrader',
        Tier: 2,
        Title: 'Work Some Fat Off',
        Description:
            "This island runs on ugly materials, and fat's near the top of the pile. Go get filthy for a decent cause.",
        RewardPool: [
            {
                CurrencyNormal: 1750,
                Fame: 10,
                TradeDeal: [
                    {
                        Item: 'Binoculars',
                        Amount: 1,
                        Fame: 0,
                        Price: 1000,
                    },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Big_Animal_Fat', 'Small_Animal_Fat'],
                        RequiredNum: 5,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_RH_Fetch_AnimalGuts',
        AssociatedNPC: 'HunterTrader',
        Tier: 2,
        Title: 'Gut Reaction',
        Description:
            "No pretty way to say it: guts are useful. Bring some and I'll try not to judge the smell following you in.",
        RewardPool: [
            {
                CurrencyNormal: 1750,
                Fame: 10,
                TradeDeal: [
                    {
                        Item: '1H_Bushman',
                        Amount: 1,
                        Fame: 0,
                        Price: 700,
                    },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Big_Animal_guts', 'Small_Animal_guts'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_RH_Fetch_AnimalSkin',
        AssociatedNPC: 'HunterTrader',
        Tier: 2,
        Title: 'Skin in the Game',
        Description:
            "Leather keeps moving fast round here. Bring me a few good skins and I'll know you are good for more than making noise.",
        RewardPool: [
            {
                CurrencyNormal: 1750,
                Fame: 10,
                TradeDeal: [
                    {
                        Item: 'Compass_Advanced',
                        Amount: 1,
                        Fame: 0,
                        Price: 1250,
                    },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Animal_skin'],
                        RequiredNum: 3,
                        MinAcceptedItemHealth: 80,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_RH_Fetch_Bone',
        AssociatedNPC: 'HunterTrader',
        Tier: 2,
        Title: 'Feel It in Your Bones',
        Description:
            "Bones keep finding uses, and I keep running short. Bring me a proper pile and you'll get a good trade for 'em.",
        RewardPool: [
            {
                CurrencyNormal: 1500,
                Fame: 10,
                Items: ['Utility_Belt_01'],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Bone'],
                        RequiredNum: 10,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_RH_Fetch_DeerHead',
        AssociatedNPC: 'HunterTrader',
        Tier: 2,
        Title: 'Head of the Herd',
        Description: "Bring me a deer head in a good enough shape. I like it better when it's still staring.",
        RewardPool: [
            {
                CurrencyNormal: 2000,
                Fame: 10,
                Items: ['BowSilencer_SlipOn'],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Doe_Head'],
                        RequiredNum: 1,
                        MinAcceptedItemHealth: 80,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_RH_Fetch_GoatHead',
        AssociatedNPC: 'HunterTrader',
        Tier: 2,
        Title: 'Horns First',
        Description: "I want a goat's head, not some tale about where it ran off to. Bring it intact.",
        RewardPool: [
            {
                CurrencyNormal: 2000,
                Fame: 10,
                Items: ['Bow_MicroStabilizer'],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Goat_Head'],
                        RequiredNum: 1,
                        MinAcceptedItemHealth: 80,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_RH_Fetch_HorseHead',
        AssociatedNPC: 'HunterTrader',
        Tier: 2,
        Title: 'Why the Long Face?',
        Description:
            "Most trophies are for pride, but this one is about grit. Bring me a horse's head, and I'll put something worth having aside for you.",
        RewardPool: [
            {
                CurrencyNormal: 2000,
                Fame: 10,
                TradeDeal: [
                    {
                        Item: 'Weapon_DT11B_Sawed_Off',
                        Amount: 1,
                        Fame: 0,
                        Price: 1700,
                    },
                    {
                        Item: '12_Gauge_Buckshot_Ammobox',
                        Amount: 3,
                        Fame: 0,
                        Price: 200,
                    },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Horse_Head'],
                        RequiredNum: 1,
                        MinAcceptedItemHealth: 80,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_HT_Kill_Deer',
        AssociatedNPC: 'HunterTrader',
        Tier: 2,
        Title: 'Buck Stops Here',
        Description:
            "Bring down proper game and do it clean. I want proof you can handle it when the target doesn't sit still for you.",
        RewardPool: [
            {
                CurrencyNormal: 2000,
                Fame: 10,
                TradeDeal: [
                    {
                        Item: 'Manchu_Bow_50',
                        Amount: 1,
                        Price: 800,
                    },
                    {
                        Item: 'Metal_BroadHead_Arrow',
                        Amount: 10,
                        Price: 5,
                    },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TargetCharacters: ['BP_Deer2'],
                Amount: 1,
            },
        ],
    },
    {
        id: 'T2_HT_Kill_Goat',
        AssociatedNPC: 'HunterTrader',
        Tier: 2,
        Title: 'Climb and Fall',
        Description:
            "Pesky target, bad temper, good practice. Keep your footing and I'll have a reward waiting for you.",
        RewardPool: [
            {
                CurrencyNormal: 2000,
                Fame: 10,
                TradeDeal: [
                    {
                        Item: '1H_Traynors_Axe',
                        Amount: 1,
                        Price: 800,
                    },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TargetCharacters: ['BP_Goat2'],
                Amount: 1,
            },
        ],
    },
    {
        id: 'T2_HT_Kill_Horse',
        AssociatedNPC: 'HunterTrader',
        Tier: 2,
        Title: 'Break the Gallop',
        Description:
            "This one takes reach, nerve, and a steady hand. Put it down and I'll know you are ready for harder country.",
        RewardPool: [
            {
                CurrencyNormal: 2000,
                Fame: 10,
                TradeDeal: [
                    {
                        Item: '2H_Axe',
                        Amount: 1,
                        Price: 750,
                    },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TargetCharacters: ['BP_Horse2'],
                Amount: 1,
            },
        ],
    },
];
