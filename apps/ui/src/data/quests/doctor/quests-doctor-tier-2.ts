import type { Quest } from '@/data/quests/quests.types.ts';

export const DOCTOR_QUESTS_TIER2: Quest[] = [
    {
        id: 'T2_DC_Fetch_MedicalSet',
        AssociatedNPC: 'Doctor',
        Tier: 2,
        Title: 'The Beauty Doctor',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1450,
                Fame: 10,
                TradeDeal: [
                    { Item: 'Emergency_bandage', Amount: 3, Price: 300, Fame: 0 },
                    { Item: 'Antibiotics_01', Amount: 1, Price: 1500, Fame: 0 },
                    { Item: 'PotassiumIodide_Pills_01', Amount: 1, Price: 250, Fame: 0 },
                ],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    { AcceptedItems: ['Hospital_Shirt_01'], RequiredNum: 1 },
                    { AcceptedItems: ['Hospital_Pants'], RequiredNum: 1 },
                    { AcceptedItems: ['Disposable_Mask'], RequiredNum: 1 },
                    { AcceptedItems: ['Medical_Glove_01'], RequiredNum: 1 },
                ],
            },
        ],
    },
    {
        id: 'T2_DC_Fetch_Crutch',
        AssociatedNPC: 'Doctor',
        Tier: 2,
        Title: 'All-terrain Crutches',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1450,
                Fame: 10,
                TradeDeal: [{ Item: 'Painkillers_01', Amount: 2, Price: 1500, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Crutch'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_DC_Fetch_HemostaticDressing',
        AssociatedNPC: 'Doctor',
        Tier: 2,
        Title: 'To Bleed Or Not to Bleed',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1600,
                Fame: 10,
                TradeDeal: [{ Item: 'Emergency_bandage', Amount: 3, Price: 300, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Hemostatic_Dressing'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_DC_Fetch_EmergencyBandagePack',
        AssociatedNPC: 'Doctor',
        Tier: 2,
        Title: 'When Bad Gets Worse',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1550,
                Fame: 10,
                TradeDeal: [{ Item: 'Antibiotics_01', Amount: 5, Price: 100, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Emergency_bandage_Big'],
                        RequiredNum: 1,
                        MinAcceptedItemUses: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_DC_Fetch_AntiPain',
        AssociatedNPC: 'Doctor',
        Tier: 2,
        Title: 'Dangerous Surroundings',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1500,
                Fame: 10,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
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
                ],
            },
        ],
    },
    {
        id: 'T2_DC_Fetch_AntiPoison',
        AssociatedNPC: 'Doctor',
        Tier: 2,
        Title: 'Painless',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1500,
                Fame: 10,
                TradeDeal: [
                    { Item: 'Emergency_bandage', Amount: 3, Price: 350, Fame: 0 },
                    { Item: 'Emergency_bandage_Big', Amount: 1, Price: 1550, Fame: 0 },
                ],
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
                ],
            },
        ],
    },
    {
        id: 'T2_DC_Fetch_PressureDressing',
        AssociatedNPC: 'Doctor',
        Tier: 2,
        Title: 'Under Pressure',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1520,
                Fame: 10,
                TradeDeal: [{ Item: 'Hemostatic_Dressing', Amount: 3, Price: 650, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Pressure_Dressing'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T2_DC_Fetch_VitaminPills02',
        AssociatedNPC: 'Doctor',
        Tier: 2,
        Title: 'Vitamin Overdose',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1500,
                Fame: 10,
                TradeDeal: [{ Item: 'Isopropyl_alcohol', Amount: 1, Price: 700, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
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
        id: 'T2_DC_Fetch_IsopropylAlcohol',
        AssociatedNPC: 'Doctor',
        Tier: 2,
        Title: 'A Perfect Sterilizer',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1480,
                Fame: 10,
                TradeDeal: [{ Item: 'Emergency_bandage_Big', Amount: 2, Price: 1200, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Isopropyl_alcohol'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_DC_Fetch_MultiplePuppetParts',
        AssociatedNPC: 'Doctor',
        Tier: 2,
        Title: 'The Living Dead',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 1400,
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
                ],
            },
        ],
    },
    {
        id: 'T2_DC_Interact_CheckGraves',
        AssociatedNPC: 'Doctor',
        Tier: 2,
        Title: 'Dead People Talking',
        Description: '',
        TimeLimitHours: 72,
        RewardPool: [
            {
                CurrencyNormal: 2000,
                Fame: 15,
                TradeDeal: [{ Item: 'Cigarettes', Amount: 3, Price: 100, Fame: 0 }],
            },
        ],
        Conditions: [
            {
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: 'Check Graves for signs of abnormalities',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 12,
                MaxNeeded: 12,
            },
        ],
    },
];
