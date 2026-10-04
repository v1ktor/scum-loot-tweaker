import type { Quest } from '@/data/quests/quests.types.ts';

// TODO: 'T4_MH_ApexHunt' was added to DefaultQuestList.json in the August update, but the game ships only the quest
// id — everything below is scaffolding built from the id and needs verifying in-game.
export const MASTER_HUNTER_QUESTS_TIER4: Quest[] = [
    {
        id: 'T4_MH_ApexHunt',
        AssociatedNPC: 'MasterHunter',
        Tier: 4,
        Title: 'Apex Hunt',
        Description:
            'Every mutant out there answers to something. Take all four of them and there is nothing left on this island that outranks you.',
        // TODO: tier 4 time limit is unverified — 120h continues the 48/72/96 progression
        TimeLimitHours: 120,
        // TODO: reward pool unverified. 'KeyCardApex' was added to Parameters.json in the same update, so it is a
        // plausible reward for this quest, but that link is a guess.
        RewardPool: [{ CurrencyNormal: 5000, Fame: 30, RewardItems: ['KeyCardApex'] }],
        // TODO: the real objective structure is unknown — this scaffolds it as one kill per mutant, in sequence
        Conditions: [
            { Type: 'Elimination', SequenceIndex: 0, TargetCharacters: ['BP_Deer_Mutant'], Amount: 1 },
            { Type: 'Elimination', SequenceIndex: 1, TargetCharacters: ['BP_Boar_Mutant'], Amount: 1 },
            { Type: 'Elimination', SequenceIndex: 2, TargetCharacters: ['BP_Wolf_Mutant'], Amount: 1 },
            { Type: 'Elimination', SequenceIndex: 3, TargetCharacters: ['BP_Bear_Mutant'], Amount: 1 },
        ],
    },
];
