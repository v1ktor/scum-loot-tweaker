import type { Quest } from '@/data/quests/quests.types.ts';

export const MECHANIC_QUESTS_TIER2: Quest[] = [
    {
        id: 'T2_MC_Fetch_MotorbikeBattery',
        AssociatedNPC: 'Mechanic',
        Tier: 2,
        Title: 'Motorbike Juice',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1600,
                Fame: 10,
                TradeDeal: [{ Item: 'Small_Vehicle_StorageRack', Amount: 1, Price: 1000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Motorbike_Battery'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_MC_Fetch_DirtbikeFender',
        AssociatedNPC: 'Mechanic',
        Tier: 2,
        Title: 'Riding Clean',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1450,
                Fame: 10,
                TradeDeal: [{ Item: 'Dirtbike_Headlight_Item', Amount: 1, Price: 150, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Dirtbike_Fender_Item'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_MC_Fetch_DirtbikeBody',
        AssociatedNPC: 'Mechanic',
        Tier: 2,
        Title: 'Made For Dirt',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1550,
                Fame: 10,
                TradeDeal: [{ Item: 'Car_Repair_Kit', Amount: 1, Price: 1200, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Dirtbike_Body_Item', 'Dirtbike_Body_Hellrider_Item'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_MC_Fetch_GasolineCanister',
        AssociatedNPC: 'Mechanic',
        Tier: 2,
        Title: 'Serious Refill',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1500,
                Fame: 10,
                TradeDeal: [{ Item: 'Gasoline_Canister_Small', Amount: 2, Price: 150, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Gasoline_Canister'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_MC_Fetch_CarBattery',
        AssociatedNPC: 'Mechanic',
        Tier: 2,
        Title: 'One Battery To Rule Them All',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1600,
                Fame: 10,
                TradeDeal: [{ Item: 'Car_Jack', Amount: 1, Price: 1500, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Car_Battery'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_MC_Fetch_DirtbikeHellriderSkull',
        AssociatedNPC: 'Mechanic',
        Tier: 2,
        Title: 'Hellriders Paradise',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1580,
                Fame: 10,
                TradeDeal: [{ Item: 'Dirtbike_Fender_Item', Amount: 1, Price: 200, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Dirtbike_Hellrider_Skull_Item'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_MC_Fetch_DirtbikeFrontShield',
        AssociatedNPC: 'Mechanic',
        Tier: 2,
        Title: 'Just A Bit Of Safety',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1480,
                Fame: 10,
                TradeDeal: [{ Item: 'Dirtbike_Hellrider_Skull_Item', Amount: 1, Price: 200, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Dirtbike_Front_Shield_Item'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_MC_Fetch_DirtbikeWheels',
        AssociatedNPC: 'Mechanic',
        Tier: 2,
        Title: 'Rolling Thunder',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1400,
                Fame: 10,
                TradeDeal: [
                    { Item: 'Dirtbike_Body_Hellrider_Item', Amount: 1, Price: 1000, Fame: 0 },
                    { Item: 'Dirtbike_Body_Item', Amount: 1, Price: 1000, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Dirtbike_Wheel_110_80_R19_Item', 'Dirtbike_Wheel_90_90_R21_Item'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_MC_Fetch_DirtbikeHeadlights',
        AssociatedNPC: 'Mechanic',
        Tier: 2,
        Title: 'A Speck Of Light',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1580,
                Fame: 10,
                TradeDeal: [{ Item: 'Dirtbike_Front_Shield_Item', Amount: 1, Price: 200, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Dirtbike_Headlight_Item'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_MC_Fetch_DirtbikeBrakelight',
        AssociatedNPC: 'Mechanic',
        Tier: 2,
        Title: 'Braking Good',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1200,
                Fame: 10,
                TradeDeal: [{ Item: 'Dirtbike_Front_Wheel_Cover_Item', Amount: 1, Price: 150, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Dirtbike_Brakelight_Item'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_MC_Interact_DisableGenerators',
        AssociatedNPC: 'Mechanic',
        Tier: 2,
        Title: 'No Power',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 2000,
                Fame: 20,
                TradeDeal: [{ Item: 'Car_Jack', Amount: 1, Price: 1000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Disable Generators',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 3,
                MaxNeeded: 3,
            },
        ],
    },
    {
        id: 'T2_MC_Interact_ResetCarLift',
        AssociatedNPC: 'Mechanic',
        Tier: 2,
        Title: 'Eliminating Competion',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 2000,
                Fame: 20,
                TradeDeal: [{ Item: 'Car_Repair_Kit', Amount: 2, Price: 800, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Sabotage Car lifts',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 3,
                MaxNeeded: 3,
            },
        ],
    },
];
