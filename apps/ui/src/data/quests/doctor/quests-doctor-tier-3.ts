import type { Quest } from '@/data/quests/quests.types.ts';

export const DOCTOR_QUESTS_TIER3: Quest[] = [
    {
        id: 'T3_DC_Fetch_BurnGel',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'Zero Chill',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2500,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Painkillers_01', Amount: 3, Price: 1800, Fame: 30 },
                    { Item: 'Painkillers_01', Amount: 2, Price: 3000, Fame: 35 },
                    { Item: 'Painkillers_01', Amount: 1, Price: 4400, Fame: 40 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['AntiburnGel'],
                        RequiredNum: 1,
                        MinAcceptedItemResourceRatio: 0.1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Fetch_PhoenixTears',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'Corporation Technology',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2500,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Tourniquet', Amount: 10, Price: 500, Fame: 0 },
                    { Item: 'Painkillers_01', Amount: 3, Price: 2800, Fame: 0 },
                    { Item: 'AntiburnGel', Amount: 5, Price: 500, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Phoenix_Tears'],
                        RequiredNum: 1,
                        // sheet's "1/3" durability reads as a resource ratio, not MinAcceptedItemUses
                        MinAcceptedItemResourceRatio: 0.333,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Mix_KillRazorBringStimPacksA1',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'Technology Renaissance (A1)',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 7500,
                Fame: 35,
                TradeDeal: [{ Item: 'Tourniquet', Amount: 3, Price: 1200, Fame: 0 }],
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
                Type: 'Fetch',
                SequenceIndex: 1,
                RequiredItems: [
                    {
                        AcceptedItems: ['IntEA_Level1', 'IntEA_Level2', 'IntEA_Level3'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Mix_KillRazorBringStimPacksA3',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'Technology Renaissance (A3)',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 7500,
                Fame: 35,
                TradeDeal: [{ Item: 'Tourniquet', Amount: 3, Price: 1200, Fame: 0 }],
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
                Type: 'Fetch',
                SequenceIndex: 1,
                RequiredItems: [
                    {
                        AcceptedItems: ['IntEA_Level1', 'IntEA_Level2', 'IntEA_Level3'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Mix_KillRazorBringStimPacksC4',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'Technology Renaissance (C4)',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 7500,
                Fame: 35,
                TradeDeal: [{ Item: 'Tourniquet', Amount: 3, Price: 1200, Fame: 0 }],
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
                Type: 'Fetch',
                SequenceIndex: 1,
                RequiredItems: [
                    {
                        AcceptedItems: ['IntEA_Level1', 'IntEA_Level2', 'IntEA_Level3'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Mix_KillRazorBringStimPacksD1',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'Technology Renaissance (D1)',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 7500,
                Fame: 35,
                TradeDeal: [{ Item: 'Tourniquet', Amount: 3, Price: 1200, Fame: 0 }],
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
                Type: 'Fetch',
                SequenceIndex: 1,
                RequiredItems: [
                    {
                        AcceptedItems: ['IntEA_Level1', 'IntEA_Level2', 'IntEA_Level3'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Fetch_MemoryModule',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'No Shame In Stupidity',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2350,
                Fame: 20,
                TradeDeal: [
                    { Item: 'Emergency_bandage', Amount: 10, Price: 150, Fame: 0 },
                    { Item: 'Pressure_Dressing', Amount: 3, Price: 600, Fame: 0 },
                    { Item: 'Tourniquet', Amount: 2, Price: 1400, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: [
                            'MemoryModule_Level1',
                            'MemoryModule_Level2',
                            'MemoryModule_Level3',
                            'MemoryModule_Level4',
                        ],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Fetch_SmallPhoenixTears',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'The Hot Boss',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2400,
                Fame: 20,
                TradeDeal: [{ Item: 'PotassiumIodide_Pills_01', Amount: 2, Price: 500, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Phoenix_Tears_Small'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Mix_KillPuppetsNuclearBringContainer',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'Scientists Of The Past',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 5000,
                Fame: 40,
                TradeDeal: [{ Item: 'Tourniquet', Amount: 3, Price: 1000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TrackingCaption: 'Kill Nuclear Puppets',
                TargetCharacters: [
                    'BP_Zombie_Nuclear',
                    'BP_Zombie_Nuclear_Fat_Male',
                    'BP_Zombie_Nuclear_Fat_Female',
                    'BP_Zombie_Nuclear_Muscular_Male',
                    'BP_Zombie_Nuclear_Muscular_Female',
                ],
                Amount: 10,
            },
            {
                Type: 'Fetch',
                SequenceIndex: 1,
                RequiredItems: [
                    {
                        AcceptedItems: ['Depleted_Uranium_Container'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Fetch_AllMedicalJars',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'Magic Pills',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2500,
                Fame: 20,
                TradeDeal: [{ Item: 'Tourniquet', Amount: 3, Price: 1000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['ActivatedCharcoal_01', 'ActivatedCharcoal_02', 'ActivatedCharcoal_03'],
                        RequiredNum: 1,
                        MinAcceptedItemResourceRatio: 0.625,
                    },
                    {
                        AcceptedItems: [
                            'PotassiumIodide_Pills_01',
                            'PotassiumIodide_Pills_02',
                            'PotassiumIodide_Pills_03',
                        ],
                        RequiredNum: 1,
                        MinAcceptedItemResourceRatio: 0.625,
                    },
                    {
                        AcceptedItems: ['Antibiotics_01', 'Antibiotics_02', 'Antibiotics_03'],
                        RequiredNum: 1,
                        MinAcceptedItemResourceRatio: 0.625,
                    },
                    {
                        AcceptedItems: ['Painkillers_01', 'Painkillers_02', 'PainKillers_03'],
                        RequiredNum: 1,
                        MinAcceptedItemResourceRatio: 0.625,
                    },
                    {
                        AcceptedItems: ['Vitamins_01', 'Vitamins_02', 'Vitamins_03'],
                        RequiredNum: 1,
                        MinAcceptedItemResourceRatio: 0.625,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Fetch_PlasticSurgerySet',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'Transformation Genius',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2400,
                Fame: 20,
                TradeDeal: [{ Item: 'Tourniquet', Amount: 5, Price: 1000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    { AcceptedItems: ['1H_Scalpel'], RequiredNum: 1 },
                    { AcceptedItems: ['Scissors_01', 'Scissors_Plastic'], RequiredNum: 1 },
                    { AcceptedItems: ['Syringe'], RequiredNum: 1 },
                    { AcceptedItems: ['Rags'], RequiredNum: 1 },
                    { AcceptedItems: ['Isopropyl_alcohol'], RequiredNum: 1 },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Fetch_MedicalEquipmentSet',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'A Professional Butcher',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2200,
                Fame: 20,
                TradeDeal: [{ Item: 'Tourniquet', Amount: 5, Price: 1000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    { AcceptedItems: ['Hospital_Shirt_01'], RequiredNum: 1 },
                    { AcceptedItems: ['Hospital_Pants'], RequiredNum: 1 },
                    { AcceptedItems: ['Medical_Glove_01'], RequiredNum: 1 },
                    { AcceptedItems: ['Syringe'], RequiredNum: 1 },
                    { AcceptedItems: ['Chainsaw'], RequiredNum: 1 },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Fetch_EmergencySet',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'Dire Situations',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2450,
                Fame: 20,
                TradeDeal: [{ Item: 'Tourniquet', Amount: 5, Price: 1000, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    { AcceptedItems: ['Tourniquet'], RequiredNum: 1 },
                    { AcceptedItems: ['Pressure_Dressing'], RequiredNum: 1 },
                    { AcceptedItems: ['Hemostatic_Dressing'], RequiredNum: 1 },
                    { AcceptedItems: ['Emergency_bandage'], RequiredNum: 1 },
                    { AcceptedItems: ['Isopropyl_alcohol'], RequiredNum: 1 },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Fetch_MultiplePuppetParts',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'To Chop A Puppet',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2250,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    { AcceptedItems: ['Zombie_01_Left_Arm', 'Zombie_01_Right_Arm'], RequiredNum: 3 },
                    { AcceptedItems: ['Zombie_01_Left_Leg', 'Zombie_01_Right_Leg'], RequiredNum: 3 },
                    { AcceptedItems: ['Zombie_Guts'], RequiredNum: 3 },
                    { AcceptedItems: ['Zombie_01_Head', 'Zombie_01_Head_No_teeth'], RequiredNum: 3 },
                    { AcceptedItems: ['Puppet_Eye'], RequiredNum: 3 },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Fetch_GoldMemoryModule',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'A Golden Nugget',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 2450,
                Fame: 25,
                TradeDeal: [
                    { Item: 'Emergency_bandage_Big', Amount: 5, Price: 1000, Fame: 0 },
                    { Item: 'Tourniquet', Amount: 2, Price: 1400, Fame: 0 },
                    { Item: 'Hemostatic_Dressing', Amount: 4, Price: 750, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['MemoryModule_Level4'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T3_DC_Interact_ScanAbandonedCity',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: 'Nuclear Mysteries',
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 4000,
                Fame: 30,
                TradeDeal: [{ Item: 'PotassiumIodide_Pills_01', Amount: 2, Price: 200, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Check air conditioners - C0',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 6,
                MaxNeeded: 6,
            },
            {
                Type: 'Interaction',
                SequenceIndex: 1,
                TrackingCaption: 'Check fountains - C0',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 1,
                MaxNeeded: 1,
            },
            {
                Type: 'Interaction',
                SequenceIndex: 2,
                TrackingCaption: 'Check playgrounds - C0',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 5,
                MaxNeeded: 5,
            },
        ],
    },
    {
        id: 'T3_DC_Mix_PsychWardMedPuppets',
        AssociatedNPC: 'Doctor',
        Tier: 3,
        Title: "We Don't need No Education",
        Description: '',
        TimeLimitHours: 96,
        RewardPool: [
            {
                CurrencyNormal: 6000,
                Fame: 20,
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Tamper with books',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 1,
                MaxNeeded: 1,
            },
            {
                Type: 'Interaction',
                SequenceIndex: 1,
                TrackingCaption: 'Tamper with body bags',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 1,
                MaxNeeded: 1,
            },
            {
                Type: 'Elimination',
                SequenceIndex: 2,
                TrackingCaption: 'Kill medical puppets',
                TargetCharacters: [
                    'BP_Zombie_Hospital_Fat',
                    'BP_Zombie_Hospital_Female',
                    'BP_Zombie_Hospital_Muscle',
                    'BP_Zombie_Hospital_Normal',
                ],
                Amount: 5,
            },
        ],
    },
];
