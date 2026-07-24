import type { Quest } from '@/data/quests/quests.types.ts';

export const HUNTER_TRADER_QUESTS_TIER3: Quest[] = [
    {
        id: 'T3_RH_Fetch_AnimalFat',
        AssociatedNPC: 'Hunter',
        Tier: 3,
        Title: 'The Fat of the Land',
        Description: "Fortune flows from ugly work. Bring me more fat and think on the reward while you're at it.",
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3500,
                Fame: 20,
                TradeDeal: [
                    {
                        Item: 'WeaponSuppressor_30_06',
                        Amount: 1,
                        Fame: 0,
                        Price: 850,
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
                        RequiredNum: 8,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_RH_Fetch_AnimalGuts',
        AssociatedNPC: 'Hunter',
        Tier: 3,
        Title: 'No Guts, No Glory',
        Description:
            "Guts smell like regret, but they're still worth something. Bring me a load and earn your reward the repulsive way.",
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3500,
                Fame: 20,
                TradeDeal: [
                    {
                        Item: 'Military_Quiver_01',
                        Amount: 1,
                        Fame: 0,
                        Price: 3000,
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
                        RequiredNum: 5,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_RH_Fetch_AnimalSkin',
        AssociatedNPC: 'Hunter',
        Tier: 3,
        Title: 'Skin-Deep',
        Description:
            'Taking the hide is what marks us different from the rest. Bring me a proper stack and earn your place in the food chain.',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3500,
                Fame: 20,
                TradeDeal: [
                    {
                        Item: 'WeaponScope_HuntingScope',
                        Amount: 1,
                        Fame: 0,
                        Price: 750,
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
                        RequiredNum: 5,
                        MinAcceptedItemHealth: 80,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_RH_Fetch_BearHead',
        AssociatedNPC: 'Hunter',
        Tier: 3,
        Title: 'A Head Above',
        Description: 'Bring me a bear head worth keeping. Remember: the meaner the beast, the sweeter the prize.',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 4500,
                Fame: 20,
                TradeDeal: [
                    {
                        Item: 'Weapon_CarbonHunter',
                        Amount: 1,
                        Fame: 0,
                        Price: 4250,
                    },
                    {
                        Item: 'Magazine_CarbonHunter',
                        Amount: 2,
                        Fame: 0,
                        Price: 300,
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
                        AcceptedItems: ['Bear_Head'],
                        RequiredNum: 1,
                        MinAcceptedItemHealth: 80,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_RH_Fetch_BoarHead',
        AssociatedNPC: 'Hunter',
        Tier: 3,
        Title: 'Tusks for Trouble',
        Description:
            'I want a boar head with the tusks still worth looking at. Bring one back before the woods chew on it.',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3500,
                Fame: 20,
                TradeDeal: [
                    {
                        Item: 'Weapon_BlackHawk_Crossbow',
                        Amount: 1,
                        Fame: 0,
                        Price: 4250,
                    },
                    {
                        Item: 'Ammo_Crossbow_Bolt_Carbon',
                        Amount: 10,
                        Fame: 0,
                        Price: 10,
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
                        AcceptedItems: ['Boar_Head'],
                        RequiredNum: 1,
                        MinAcceptedItemHealth: 80,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_RH_Fetch_Bone',
        AssociatedNPC: 'Hunter',
        Tier: 3,
        Title: 'Boneheaded',
        Description:
            "A bunch of weird folks I know always need bones for some cursed reason. Help me keep them quiet and I'll pay you for it.",
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3000,
                Fame: 20,
                TradeDeal: [
                    {
                        Item: 'WeaponSuppressor_Hunter',
                        Amount: 1,
                        Fame: 0,
                        Price: 750,
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
                        AcceptedItems: ['Bone'],
                        RequiredNum: 20,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_RH_Fetch_WolfHead',
        AssociatedNPC: 'Hunter',
        Tier: 3,
        Title: 'Muzzle Memory',
        Description:
            'Bring me a wolf head clean enough to keep as proof, warning, or decoration. Always goes in that order.',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 4000,
                Fame: 20,
                TradeDeal: [
                    {
                        Item: 'Weapon_DT11B',
                        Amount: 1,
                        Fame: 0,
                        Price: 1200,
                    },
                    {
                        Item: '12_Gauge_Slug_Ammobox',
                        Amount: 1,
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
                        AcceptedItems: ['Wolf_Head'],
                        RequiredNum: 1,
                        MinAcceptedItemHealth: 80,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_RH_Kill_Bear',
        AssociatedNPC: 'Hunter',
        Tier: 3,
        Title: 'Stand Your Ground',
        Description:
            'Real hunting starts when the job can hit back hard. Put a bear down and earn yourself a place close to my fire.',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 4500,
                Fame: 20,
                TradeDeal: [
                    {
                        Item: 'Weapon_Hunter85_V2',
                        Amount: 1,
                        Price: 1100,
                    },
                    {
                        Item: 'Magazine_Hunter85_V2',
                        Amount: 2,
                        Price: 175,
                    },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TargetCharacters: ['BP_Bear2'],
                Amount: 1,
            },
        ],
    },
    {
        id: 'T3_RH_Kill_Boar',
        AssociatedNPC: 'Hunter',
        Tier: 3,
        Title: 'Pork Business',
        Description:
            "Boars are stubborn and built like a bad idea. Put one in the dirt and I'll call that an honest day's work.",
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3500,
                Fame: 20,
                TradeDeal: [
                    {
                        Item: 'Compound_Bow',
                        Amount: 1,
                        Price: 950,
                    },
                    {
                        Item: 'Metal_BroadHead_Arrow',
                        Amount: 10,
                        Price: 16,
                    },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TargetCharacters: ['BP_Boar'],
                Amount: 1,
            },
        ],
    },
    {
        id: 'T3_RH_Kill_Wolf',
        AssociatedNPC: 'Hunter',
        Tier: 3,
        Title: 'Hunting the Hunter',
        Description: 'A wolf knows how to stalk, same as you. In the end, only one gets to walk away.\n',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3500,
                Fame: 20,
                TradeDeal: [
                    {
                        Item: 'Recurve_Bow_90',
                        Amount: 1,
                        Price: 950,
                    },
                    {
                        Item: 'Carbon_BroadHead_Arrow',
                        Amount: 10,
                        Price: 17,
                    },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TargetCharacters: ['BP_Wolf3'],
                Amount: 1,
            },
        ],
    },
];
