import type { Quest } from '@/data/quests/quests.types.ts';

export const HUNTER_TRADER_QUESTS_TIER1: Quest[] = [
    {
        id: 'T1_RH_Fetch_AnimalFat',
        AssociatedNPC: 'Hunter',
        Tier: 1,
        Title: 'Fat Chance',
        Description:
            "Fat is filthy work, and I'd like you to realize that. Bring some in and try not to slick up my floor.",
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 750,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Big_Animal_Fat', 'Small_Animal_Fat'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_RH_Fetch_AnimalSkin',
        AssociatedNPC: 'Hunter',
        Tier: 1,
        Title: 'Save Your Skin',
        Description:
            "Folks keep asking for leather like it's hanging on hooks already. Show me you can work a clean skin and you'll get something in return.",
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 850,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Animal_skin'],
                        RequiredNum: 1,
                        MinAcceptedItemHealth: 80,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_RH_Fetch_Bone',
        AssociatedNPC: 'Hunter',
        Tier: 1,
        Title: 'Bones to Pick',
        Description:
            "Bones are useful to more people than you'd think. Bring me a handful and I'll make the trouble worth it.",
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 750,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Bone'],
                        RequiredNum: 5,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_RH_Fetch_DonkeyHead',
        AssociatedNPC: 'Hunter',
        Tier: 1,
        Title: 'Proof of Mule',
        Description: "I need the head off a donkey, clean and brought back in one piece. Don't ask why.",
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 1200,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Donkey_Head'],
                        RequiredNum: 1,
                        MinAcceptedItemHealth: 80,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_RH_Fetch_PluckedChicken',
        AssociatedNPC: 'Hunter',
        Tier: 1,
        Title: 'Plucked It',
        Description:
            "Botching a good bird is easier than you'd think. I want one cleaned proper, feathers off and pride swallowed.",
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 1000,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Hen_Torso'],
                        RequiredNum: 1,
                        MinAcceptedItemHealth: 80,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_RH_Fetch_SkinnedRabbit',
        AssociatedNPC: 'Hunter',
        Tier: 1,
        Title: 'Clean Cut',
        Description:
            'Anybody can make a mess of small game. I wanna see what you do after the kill, so bring back a flawless, naked bunny.',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 1000,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Rabbit_Skinned'],
                        RequiredNum: 1,
                        MinAcceptedItemHealth: 80,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_RH_Kill_Chicken',
        AssociatedNPC: 'Hunter',
        Tier: 1,
        Title: 'Dinner Runs',
        Description: "I need fresh poultry that hasn't gone sour in the sun. Go fetch it before it flaps off on you.",
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 1000,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TargetCharacters: ['BP_Chicken'],
                Amount: 1,
            },
        ],
    },
    {
        id: 'T1_RH_Kill_Donkey',
        AssociatedNPC: 'Hunter',
        Tier: 1,
        Title: 'Long Ears Down',
        Description:
            "Don't take this as a grand hunt. It ain't. Kill a donkey and show me you can do work without a story to dress it up.\n",
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 1200,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TargetCharacters: ['BP_Donkey2'],
                Amount: 1,
            },
        ],
    },
    {
        id: 'T1_RH_Kill_Rabbit',
        AssociatedNPC: 'Hunter',
        Tier: 1,
        Title: 'No Second Chances',
        Description:
            "Small game's got a way of disappearing the second you think you've got it cornered. Let's hope you won't let that happen.",
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 1000,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TargetCharacters: ['BP_Rabbit'],
                Amount: 1,
            },
        ],
    },
];
