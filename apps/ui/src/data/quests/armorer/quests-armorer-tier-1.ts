import type { Quest } from '@/data/quests/quests.types.ts';

export const ARMORER_QUESTS_TIER1: Quest[] = [
    {
        id: 'T1_AR_Fetch_357Ammobox',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: '0.357 Ammobox',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 1500,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Cal_357_Ammobox', 'Cal_357_Ammobox_AP', 'Cal_357_Ammobox_TR'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_AR_Fetch_50AEAmmobox',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: '50 AE Ammobox',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 3000,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Cal_50_AE_Ammobox', 'Cal_50_AE_AP_Ammobox', 'Cal_50_AE_Ammobox_TR'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_AR_Fetch_22CalAmmobox',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: 'Cal .22 Ammobox',
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
                        AcceptedItems: ['Cal_22_Ammobox', 'Cal_22_Ammobox_TR'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_AR_Fetch_12GaugeAmmobox',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: '12 Gauge Ammobox',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 1300,
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
                            '12_Gauge_Birdshot_Ammobox',
                            '12_Gauge_Buckshot_Ammobox',
                            '12_Gauge_Slug_Ammobox',
                        ],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_AR_Fetch_9x39Ammobox',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: '9x39mm Ammobox',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 3000,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Cal_9x39mm_Ammobox', 'Cal_9x39mm_AP_Ammobox', 'Cal_9x39mm_Ammobox_TR'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_AR_Fetch_44Ammobox',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: '0.44 Ammobox',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 1800,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Cal_44_Viper_Ammobox', 'Cal_44_Viper_Ammobox_AP', 'Cal_44_Viper_Ammobox_TR'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_AR_Fetch_38Ammobox',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: '0.38 Ammobox',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 1350,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Cal_38_Ammobox', 'Cal_38_Ammobox_AP', 'Cal_38_Ammobox_TR'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_AR_Fetch_45ACPAmmobox',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: '45 ACP Ammobox',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 2600,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Cal_45_Ammobox', 'Cal_45_AP_Ammobox', 'Cal_45_Ammobox_TR'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_AR_Fetch_Block21',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: 'Block 21 Pistol',
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
                        AcceptedItems: ['Weapon_Block21'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_AR_Fetch_9mmAmmobox',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: '9mm Ammobox',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 1500,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Fetch',
                SequenceIndex: 0,
                RequiredItems: [
                    {
                        AcceptedItems: ['Cal_9mm_Ammobox', 'Cal_9mm_AP_Ammobox', 'Cal_9mm_Ammobox_TR'],
                        RequiredNum: 3,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_AR_Fetch_M9',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: 'M9 Pistol',
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
                        AcceptedItems: ['Weapon_M9'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_AR_Fetch_WeaponFlashlightM9',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: 'M9 Flashlight',
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
                        AcceptedItems: ['WeaponFlashlight_M9'],
                        RequiredNum: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 'T1_AR_Kill_PuppetsSharp',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: 'Sharp Practice Runs',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 1500,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TrackingCaption: 'Kill puppets with sharp tools',
                TargetCharacters: ['Puppet'],
                Amount: 7,
                AllowedWeapons: [
                    '1H_Bushman',
                    '1H_Cleaver',
                    '1H_EMpossible_Knife',
                    '1H_Hatchet',
                    '1H_Hunter',
                    '1H_Improvised_Tomahawk',
                    '1H_KitchenKnife',
                    '1H_Kunai',
                    '1H_Medieval_Sword',
                    '1H_Metal_Sword',
                    '1H_Military_Survival_Knife',
                    '1H_Military_Tomahawk',
                    '1H_MK5000_Black',
                    '1H_N9_Black',
                    '1H_N9_White',
                    '1H_Scalpel',
                    '1H_Scout_Black',
                    '1H_Shuriken',
                    '1H_Small_Axe',
                    '1H_Traynors_Axe',
                    '2H_Axe',
                    '2H_Katana',
                    '2H_Katana1',
                    '2H_Metal_Axe',
                    '2H_Stone_Axe',
                    '2H_Tang_Dao',
                    '2H_ZhanMaDao_Sword',
                ],
            },
        ],
    },
    {
        // TODO: not present in the canonical quest id list — verify this quest actually exists in-game
        id: 'T1_AR_Kill_PuppetsBow',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: 'Medieval Sniper',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 1500,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TrackingCaption: 'Kill puppets with bows',
                TargetCharacters: ['Puppet'],
                Amount: 7,
                AllowedWeapons: [
                    'Compound_Bow',
                    'Compound_Bow_Desert',
                    'Compound_Bow_Snow',
                    'Manchu_Bow_50',
                    'Recurve_Bow',
                    'Recurve_Bow_50',
                    'Recurve_Bow_60',
                    'Recurve_Bow_70',
                    'Recurve_Bow_80',
                    'Recurve_Bow_90',
                    'Recurve_Bow_100',
                    'Takedown_Bow',
                ],
            },
        ],
    },
    {
        id: 'T1_AR_Kill_PuppetsBlunt',
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: 'Blunt Practice Runs',
        Description: '',
        TimeLimitHours: 48,
        RewardPool: [
            {
                CurrencyNormal: 1500,
                Fame: 5,
            },
        ],
        Conditions: [
            {
                Type: 'Elimination',
                SequenceIndex: 0,
                TrackingCaption: 'Kill puppets with blunt tools',
                TargetCharacters: ['Puppet'],
                Amount: 7,
                AllowedWeapons: [
                    '1H_Beam_Dildo',
                    '1H_Brass_knuckles',
                    '1H_Crowbar',
                    '1H_Dildo',
                    '1H_Metal_Pipe',
                    '1H_Pipe_Wrench',
                    '1H_Police_Baton',
                    '2H_Baseball_Bat',
                    '2H_Baseball_Bat_Blaze',
                    '2H_Metal_Baseball_Bat',
                    '2H_Shovel_01',
                ],
            },
        ],
    },
];
