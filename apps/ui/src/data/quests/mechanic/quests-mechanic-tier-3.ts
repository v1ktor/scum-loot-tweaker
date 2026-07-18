import type { Quest } from '@/data/quests/quests.types.ts';

export const MECHANIC_QUESTS_TIER3: Quest[] = [
    {
        id: 'T3_MC_Fetch_RagerAlternator',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'More Passion, More Energy',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 5000,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Wheel_265_60_R18_Item', Amount: 4, Price: 2000, Fame: 0 },
                    { Item: 'Rager_Seat_FrontLeft_Item', Amount: 2, Price: 2500, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Rager_Engine_Alternator_Item'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_MC_Fetch_WWAlternator',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'Alternator Of The Forbidden One',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 4000,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Wheel_155_R65_Item', Amount: 4, Price: 800, Fame: 0 },
                    { Item: 'WW_Seat_FrontLeft_Item', Amount: 2, Price: 600, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['WW_Engine_Alternator_Item'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_MC_Fetch_LaikaAlternator',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'Serious Energy',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 4000,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Wheel_255_55_R16_Item', Amount: 4, Price: 800, Fame: 0 },
                    { Item: 'Laika_Seat_FrontLeft_Item', Amount: 2, Price: 600, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Laika_Engine_Alternator_Item'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_MC_Fetch_RagerBumper',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'To Bump Or Not To Bump',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3500,
                Fame: 20,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Rager_Bumper_Front_Item', 'Rager_Bumper_Back_Item'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_MC_Fetch_WWBumper',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'Bumper Of The Forbidden One',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3500,
                Fame: 20,
                TradeDeal: [{ Item: 'Car_Repair_Kit', Amount: 3, Price: 900, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['WW_Bumper_Front_Item', 'WW_Bumper_Back_Item'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_MC_Fetch_LaikaBumper',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'Bump In The Road',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3500,
                Fame: 20,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Laika_Bumper_Front_Item', 'Laika_Bumper_Back_Item'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_MC_Fetch_RagerWheels',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'Ground Destroyers',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3600,
                Fame: 20,
                TradeDeal: [{ Item: 'Big_Vehicle_StorageRack', Amount: 1, Price: 2000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Wheel_265_60_R18_Item'],
                        RequiredNum: 2,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_MC_Fetch_LaikaWheels',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'Mud Grippers',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3600,
                Fame: 20,
                TradeDeal: [{ Item: 'Big_Vehicle_StorageRack', Amount: 1, Price: 2000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Wheel_255_55_R16_Item'],
                        RequiredNum: 2,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_MC_Fetch_WWWheels',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'Wheels Of The Forbidden One',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3000,
                Fame: 20,
                TradeDeal: [{ Item: 'Big_Vehicle_StorageRack', Amount: 1, Price: 2000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Wheel_155_R65_Item'],
                        RequiredNum: 2,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_MC_Fetch_CarLights',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'Life Of A Car Light',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3050,
                Fame: 20,
                TradeDeal: [{ Item: 'Gasoline_Canister', Amount: 5, Price: 300, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: [
                            'WW_Lights_FrontLeft',
                            'WW_Lights_FrontRight',
                            'WW_Lights_RearLeft',
                            'WW_Lights_RearRight',
                        ],
                        RequiredNum: 1,
                    },
                    {
                        AcceptedItems: [
                            'Laika_Lights_FrontLeft',
                            'Laika_Lights_FrontRight',
                            'Laika_Lights_RearLeft',
                            'Laika_Lights_RearRight',
                        ],
                        RequiredNum: 1,
                    },
                    {
                        AcceptedItems: [
                            'Rager_Lights_FrontLeft',
                            'Rager_Lights_FrontRight',
                            'Rager_Lights_RearLeft',
                            'Rager_Lights_RearRight',
                            'Rager_Lights_RearTop',
                        ],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_MC_Interact_UnplugSentries',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'Modern Tuning',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 4000,
                Fame: 30,
                TradeDeal: [
                    { Item: 'WW_Bumper_Front_Item', Amount: 4, Price: 600, Fame: 0 },
                    { Item: 'Wheel_255_55_R16_Item', Amount: 4, Price: 600, Fame: 0 },
                    { Item: 'Wheel_265_60_R18_Item', Amount: 4, Price: 2000, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Unplug Sentry Cables - Z1 Weapon factory',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 3,
                MaxNeeded: 5,
            },
        ],
    },
    {
        id: 'T3_MC_Interact_MaintainLightsRadioStation',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'Near Miss',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3000,
                Fame: 20,
                TradeDeal: [{ Item: 'Big_Vehicle_StorageRack', Amount: 1, Price: 1000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Maintain Signal Lights - C2 Radio Station',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 3,
                MaxNeeded: 5,
            },
        ],
    },
    {
        id: 'T3_MC_Interact_TamperRacewayControls',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'Street Racing',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 3000,
                Fame: 20,
                TradeDeal: [{ Item: 'Wheel_205_80_R12_Item', Amount: 4, Price: 800, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Tamper with raceway controls - Z3 Motorcycle track',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 1,
                MaxNeeded: 1,
            },
        ],
    },
    {
        id: 'T3_MC_Interact_TrainControlPanel',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'A Railfan',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 4000,
                Fame: 25,
                TradeDeal: [
                    { Item: 'WW_Engine_Alternator_Item', Amount: 1, Price: 1500, Fame: 0 },
                    { Item: 'Laika_Engine_Alternator_Item', Amount: 1, Price: 1200, Fame: 0 },
                    { Item: 'Rager_Engine_Alternator_Item', Amount: 1, Price: 2500, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Unplug the control panel cables - In locomotive cabs',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 3,
                MaxNeeded: 5,
            },
        ],
    },
    {
        id: 'T3_MC_Interact_InvestigateSnowCarWrecks',
        AssociatedNPC: 'Mechanic',
        Tier: 3,
        Title: 'Ice Cream Vehicles',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 5000,
                Fame: 35,
                TradeDeal: [
                    { Item: 'WW_Seat_FrontLeft_Item', Amount: 1, Price: 500, Fame: 0 },
                    { Item: 'Laika_Seat_FrontLeft_Item', Amount: 1, Price: 500, Fame: 0 },
                    { Item: 'Rager_Seat_FrontLeft_Item', Amount: 1, Price: 2000, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Investigate car wrecks - Inside D0 Military base',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 12,
                MaxNeeded: 12,
            },
        ],
    },
];
