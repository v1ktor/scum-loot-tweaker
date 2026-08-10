import { describe, expect, it } from 'vitest';
import type { Condition, Quest } from '@/data/quests/quests.types.ts';
import { conditionHasContent, validateQuest } from '@/pages/quests/quest-validation.ts';

const quest = (overrides: Partial<Quest> = {}): Quest => ({
    id: 'T1_RH_Fetch_Test',
    AssociatedNPC: 'Hunter',
    Tier: 1,
    Title: 'Test quest',
    TimeLimitHours: 48,
    RewardPool: [{}],
    Conditions: [{ Type: 'Elimination', SequenceIndex: 0, TargetCharacters: ['Deer'], Amount: 1 }],
    ...overrides,
});

const messagesFor = (q: Quest, field?: string) =>
    validateQuest(q)
        .filter((e) => (field ? e.field === field : true))
        .map((e) => e.message);

const fetchWith = (group: Record<string, unknown>): Condition =>
    ({
        Type: 'Fetch',
        SequenceIndex: 0,
        RequiredItems: [{ AcceptedItems: ['Rag'], RequiredNum: 1, ...group }],
    }) as Condition;

describe('conditionHasContent', () => {
    it.each([
        ['Elimination', { Type: 'Elimination', SequenceIndex: 0 }],
        ['Fetch', { Type: 'Fetch', SequenceIndex: 0 }],
        ['Interaction', { Type: 'Interaction', SequenceIndex: 0 }],
    ])('treats a %s condition with no arrays as empty instead of throwing', (_type, condition) => {
        expect(() => conditionHasContent(condition as Condition)).not.toThrow();
        expect(conditionHasContent(condition as Condition)).toBe(false);
    });

    it('ignores whitespace-only entries', () => {
        const condition = { Type: 'Elimination', SequenceIndex: 0, TargetCharacters: ['  '], Amount: 1 } as Condition;
        expect(conditionHasContent(condition)).toBe(false);
    });
});

describe('validateQuest', () => {
    it('accepts a minimal valid quest', () => {
        expect(validateQuest(quest())).toEqual([]);
    });

    describe('quest id', () => {
        it('requires one', () => {
            expect(messagesFor(quest({ id: '' }), 'id')).toContain(
                'Quest ID is required — it names the downloaded file',
            );
        });

        it('flags an empty id as a "missing" nag, not a correctness error', () => {
            const error = validateQuest(quest({ id: '' })).find((e) => e.field === 'id');
            expect(error?.missing).toBe(true);
        });

        it.each(['has spaces', 'slash/es', 'dots.json', 'colon:s'])('rejects %j', (id) => {
            expect(messagesFor(quest({ id }), 'id')).toHaveLength(1);
        });

        it.each(['T1_RH_Fetch_AnimalFat', 'custom-quest-1', 'ABC123'])('accepts %j', (id) => {
            expect(messagesFor(quest({ id }), 'id')).toEqual([]);
        });
    });

    describe('time limit', () => {
        it('requires one', () => {
            const missing = { ...quest(), TimeLimitHours: undefined } as unknown as Quest;
            expect(messagesFor(missing, 'TimeLimitHours')).toContain('Time limit is required');
        });

        it('flags an absent limit as a "missing" nag, not a correctness error', () => {
            const missing = { ...quest(), TimeLimitHours: undefined } as unknown as Quest;
            expect(validateQuest(missing).find((e) => e.field === 'TimeLimitHours')?.missing).toBe(true);
        });

        it.each([0, -1])('rejects %s', (TimeLimitHours) => {
            expect(messagesFor(quest({ TimeLimitHours }), 'TimeLimitHours')).toContain(
                'Time limit must be greater than 0',
            );
        });

        it.each([0.5, 48, 72, 96])('accepts %s', (TimeLimitHours) => {
            expect(messagesFor(quest({ TimeLimitHours }), 'TimeLimitHours')).toEqual([]);
        });
    });

    describe('required item ranges', () => {
        it.each([0, 0.333, 1])('accepts a resource ratio of %s', (value) => {
            expect(validateQuest(quest({ Conditions: [fetchWith({ MinAcceptedItemResourceRatio: value })] }))).toEqual(
                [],
            );
        });

        it.each([-0.1, 1.5, 50])('rejects a resource ratio of %s', (value) => {
            const errors = validateQuest(quest({ Conditions: [fetchWith({ MinAcceptedItemResourceRatio: value })] }));
            expect(errors.map((e) => e.message)).toContainEqual(
                expect.stringContaining('min resource ratio must be between 0 and 1'),
            );
        });

        it('still treats durability as a 0-100 percentage', () => {
            expect(validateQuest(quest({ Conditions: [fetchWith({ MinAcceptedItemHealth: 75 })] }))).toEqual([]);
            const errors = validateQuest(quest({ Conditions: [fetchWith({ MinAcceptedItemHealth: 101 })] }));
            expect(errors.map((e) => e.message)).toContainEqual(expect.stringContaining('min durability'));
        });

        it('rejects a min cook level above the max', () => {
            const condition = fetchWith({ MinAcceptedCookLevel: 'Burned', MaxAcceptedCookLevel: 'Raw' });
            const errors = validateQuest(quest({ Conditions: [condition] }));
            expect(errors.map((e) => e.message)).toContainEqual(expect.stringContaining('must not exceed'));
        });
    });

    describe('reward slot budget', () => {
        const skills = (n: number) => Array.from({ length: n }, () => ({ Skill: 'Survival' as const, Experience: 1 }));

        it('allows exactly five slots', () => {
            expect(validateQuest(quest({ RewardPool: [{ Fame: 1, Skills: skills(4) }] }))).toEqual([]);
        });

        it('rejects a sixth', () => {
            const errors = validateQuest(quest({ RewardPool: [{ Fame: 1, Skills: skills(5) }] }));
            expect(errors.map((e) => e.message)).toContainEqual(expect.stringContaining('6 of 5 slots'));
        });

        it('counts a currency of 0 as a used slot', () => {
            const errors = validateQuest(quest({ RewardPool: [{ CurrencyNormal: 0, Skills: skills(5) }] }));
            expect(errors.map((e) => e.message)).toContainEqual(expect.stringContaining('6 of 5 slots'));
        });

        it('ignores blank skill rows, which are dropped on export', () => {
            const padded = [...skills(5), { Skill: '' as never, Experience: 0 }];
            expect(validateQuest(quest({ RewardPool: [{ Skills: padded }] }))).toEqual([]);
        });
    });

    describe('conditions', () => {
        it('nags when there are none', () => {
            expect(messagesFor(quest({ Conditions: [] }))).toContain('Add at least one condition');
        });

        it('flags an empty condition so it cannot vanish silently on export', () => {
            const empty = { Type: 'Fetch', SequenceIndex: 0, RequiredItems: [] } as Condition;
            const errors = validateQuest(quest({ Conditions: [empty] }));
            expect(errors[0]).toMatchObject({ conditionIndex: 0, missing: true });
        });

        it('rejects an interaction needing more points than exist', () => {
            const condition = {
                Type: 'Interaction',
                SequenceIndex: 0,
                Locations: [{ AnchorMesh: 'BP_Switch' }],
                MinNeeded: 1,
                MaxNeeded: 3,
            } as Condition;
            const errors = validateQuest(quest({ Conditions: [condition] }));
            expect(errors.map((e) => e.message)).toContainEqual(expect.stringContaining('cannot exceed the number'));
        });
    });
});
