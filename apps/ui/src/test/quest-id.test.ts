import { describe, expect, it } from 'vitest';
import type { Condition, Quest } from '@/data/quests/quests.types.ts';
import { buildQuestId } from '@/pages/quests/quest-id.ts';

const fetch = (): Condition => ({ Type: 'Fetch', SequenceIndex: 0, RequiredItems: [] });
const kill = (): Condition => ({ Type: 'Elimination', SequenceIndex: 0, TargetCharacters: [], Amount: 1 });
const interact = (): Condition => ({
    Type: 'Interaction',
    SequenceIndex: 0,
    Locations: [],
    MinNeeded: 1,
    MaxNeeded: 1,
});

const quest = (overrides: Partial<Quest> = {}) =>
    ({
        Tier: 1,
        AssociatedNPC: 'Hunter',
        Title: 'Animal fat',
        Conditions: [fetch()],
        ...overrides,
    }) as Quest;

describe('buildQuestId', () => {
    it('matches the shape of a real vanilla id', () => {
        expect(buildQuestId(quest())).toBe('T1_RH_Fetch_AnimalFat');
    });

    describe('giver codes, as used by the game', () => {
        it.each([
            ['Armorer', 'AR'],
            ['Doctor', 'DC'],
            ['GeneralGoods', 'GG'],
            ['Mechanic', 'MC'],
            ['Hunter', 'RH'],
            ['MasterHunter', 'MH'],
        ] as const)('abbreviates %s to %s', (npc, code) => {
            expect(buildQuestId(quest({ AssociatedNPC: npc }))).toBe(`T1_${code}_Fetch_AnimalFat`);
        });

        it.each([
            'Banker',
            'Barber',
            'Bartender',
            'Fisherman',
        ] as const)('falls back to the full name for %s, which has no vanilla code', (npc) => {
            expect(buildQuestId(quest({ AssociatedNPC: npc }))).toBe(`T1_${npc}_Fetch_AnimalFat`);
        });
    });

    describe('condition verb', () => {
        it.each([
            ['Fetch', [fetch()]],
            ['Kill', [kill()]],
            ['Interact', [interact()]],
        ] as const)('uses %s', (verb, conditions) => {
            expect(buildQuestId(quest({ Conditions: [...conditions] }))).toBe(`T1_RH_${verb}_AnimalFat`);
        });

        it('collapses repeats of one type to that single verb', () => {
            expect(buildQuestId(quest({ Conditions: [fetch(), fetch(), fetch()] }))).toBe('T1_RH_Fetch_AnimalFat');
        });

        it('uses Mix when the types differ', () => {
            expect(buildQuestId(quest({ Conditions: [fetch(), kill()] }))).toBe('T1_RH_Mix_AnimalFat');
        });

        it('omits the verb entirely when there are no conditions yet', () => {
            expect(buildQuestId(quest({ Conditions: [] }))).toBe('T1_RH_AnimalFat');
        });
    });

    describe('tier', () => {
        it.each([1, 2, 3, 4] as const)('prefixes tier %s', (Tier) => {
            expect(buildQuestId(quest({ Tier }))).toBe(`T${Tier}_RH_Fetch_AnimalFat`);
        });
    });

    describe('title', () => {
        it('condenses words into PascalCase', () => {
            expect(buildQuestId(quest({ Title: 'night vision goggles' }))).toBe('T1_RH_Fetch_NightVisionGoggles');
        });

        it('keeps leading digits, as vanilla ids do', () => {
            expect(buildQuestId(quest({ Title: '12 gauge ammobox' }))).toBe('T1_RH_Fetch_12GaugeAmmobox');
        });

        it('drops punctuation the filesystem would not want', () => {
            expect(buildQuestId(quest({ Title: 'Bring me 5 pelts!' }))).toBe('T1_RH_Fetch_BringMe5Pelts');
        });

        it('preserves casing already in the title', () => {
            expect(buildQuestId(quest({ Title: 'gold M1911' }))).toBe('T1_RH_Fetch_GoldM1911');
        });

        it('strips accents rather than emitting them', () => {
            expect(buildQuestId(quest({ Title: 'Café run' }))).toBe('T1_RH_Fetch_CafeRun');
        });

        it.each(['', '   ', '!!!'])('returns nothing for a title of %j', (Title) => {
            expect(buildQuestId(quest({ Title }))).toBe('');
        });
    });

    it('always produces an id the validator accepts', () => {
        const id = buildQuestId(quest({ Title: 'Bring me 5 pelts!', AssociatedNPC: 'Doctor', Tier: 3 }));
        expect(id).toMatch(/^[A-Za-z0-9_-]+$/);
    });
});
