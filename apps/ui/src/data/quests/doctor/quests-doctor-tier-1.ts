import type { Quest } from '@/data/quests/quests.types.ts';

export const DOCTOR_QUESTS_TIER1: Quest[] = [
    {
        id: 'T1_DC_Fetch_MedicalClothes',
        AssociatedNPC: 'Doctor',
        Tier: 1,
        Title: 'Improvised Doctor',
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
                    { AcceptedItems: ['Hospital_Shirt_01'], RequiredNum: 1 },
                    { AcceptedItems: ['Hospital_Pants'], RequiredNum: 1 },
                ],
            },
        ],
    },
    {
        id: 'T1_DC_Fetch_DisposableMasks',
        AssociatedNPC: 'Doctor',
        Tier: 1,
        Title: 'Smelly Prisoners',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 650,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Disposable_Mask'],
                        RequiredNum: 5,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_DC_Fetch_MedicalGloves',
        AssociatedNPC: 'Doctor',
        Tier: 1,
        Title: 'Nasty Germs',
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
                        AcceptedItems: ['Medical_Glove_01'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_DC_Fetch_EmergencyBandage',
        AssociatedNPC: 'Doctor',
        Tier: 1,
        Title: 'Filling The Holes',
        Description: '',
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
                        AcceptedItems: ['Emergency_bandage'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_DC_Fetch_Antibiotics01',
        AssociatedNPC: 'Doctor',
        Tier: 1,
        Title: 'Just A Scratch',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 600,
                Fame: 5,
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
                        MinAcceptedItemUses: 5,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_DC_Fetch_Painkillers01',
        AssociatedNPC: 'Doctor',
        Tier: 1,
        Title: 'Numb',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 600,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
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
        id: 'T1_DC_Fetch_PotassiumIodide01',
        AssociatedNPC: 'Doctor',
        Tier: 1,
        Title: 'Skyshine',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 600,
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
        id: 'T1_DC_Fetch_VitaminPills01',
        AssociatedNPC: 'Doctor',
        Tier: 1,
        Title: 'A, B, C, D',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 600,
                Fame: 5,
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
        id: 'T1_DC_Fetch_ActivatedCharcoal01',
        AssociatedNPC: 'Doctor',
        Tier: 1,
        Title: 'Little Poisons',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 600,
                Fame: 5,
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
                ],
            },
        ],
    },
    {
        id: 'T1_DC_Fetch_TongueDepressors',
        AssociatedNPC: 'Doctor',
        Tier: 1,
        Title: 'Say "Ahhh"',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 650,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    { AcceptedItems: ['Rags'], RequiredNum: 3 },
                    { AcceptedItems: ['Long_wooden_stick'], RequiredNum: 4 },
                    { AcceptedItems: ['Isopropyl_alcohol'], RequiredNum: 1 },
                ],
            },
        ],
    },
    {
        id: 'T1_DC_Interact_Fountains',
        AssociatedNPC: 'Doctor',
        Tier: 1,
        Title: 'Dirty Secrets',
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
                TrackingCaption: 'Check Fountain for suspicious materials',
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 1,
                MaxNeeded: 1,
            },
        ],
    },
    {
        id: 'T1_DC_Interact_Churches',
        AssociatedNPC: 'Doctor',
        Tier: 1,
        Title: 'Just a Conspiracy',
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
                Type: 'Interaction',
                SequenceIndex: 0,
                TrackingCaption: "Swab Chalices at church's altars (and church)",
                // TODO: AnchorMesh/Instance/FallbackTransform locations needed
                Locations: [],
                MinNeeded: 2,
                MaxNeeded: 2,
            },
        ],
    },
];
