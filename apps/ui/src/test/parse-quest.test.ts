import { describe, expect, it } from 'vitest';
import { parseQuestJson } from '@/utils/parse-quest.ts';

const questFile = (overrides: Record<string, unknown> = {}) =>
    JSON.stringify({
        AssociatedNPC: 'Armorer',
        Tier: 1,
        Title: 'Test quest',
        RewardPool: [{ CurrencyNormal: 100 }],
        Conditions: [],
        ...overrides,
    });

describe('parseQuestJson', () => {
    it('rejects text that is not JSON', () => {
        expect(parseQuestJson('not json')).toEqual({ ok: false, error: 'The file is not valid JSON' });
    });

    it('rejects a JSON array', () => {
        const result = parseQuestJson('[]');
        expect(result).toMatchObject({ ok: false, error: expect.stringContaining('JSON object') });
    });

    it.each([
        ['Title', { Title: 1 }],
        ['AssociatedNPC', { AssociatedNPC: undefined }],
    ])('rejects a file with no %s', (field, overrides) => {
        const result = parseQuestJson(questFile(overrides));
        expect(result.ok).toBe(false);
        if (!result.ok) expect(result.error).toContain(field);
    });

    it('drops a stray id so the caller assigns the storage key', () => {
        const result = parseQuestJson(questFile({ id: 'from-the-file' }));
        expect(result.ok).toBe(true);
        if (result.ok) expect(result.quest).not.toHaveProperty('id');
    });

    it('falls back to tier 1 for an out-of-range tier', () => {
        const result = parseQuestJson(questFile({ Tier: 9 }));
        expect(result.ok && result.quest.Tier).toBe(1);
    });

    describe('conditions', () => {
        it('backfills the arrays a Fetch condition is assumed to have', () => {
            const result = parseQuestJson(questFile({ Conditions: [{ Type: 'Fetch', SequenceIndex: 0 }] }));
            expect(result.ok).toBe(true);
            if (result.ok) expect(result.quest.Conditions[0]).toMatchObject({ Type: 'Fetch', RequiredItems: [] });
        });

        it('backfills the arrays an Elimination condition is assumed to have', () => {
            const result = parseQuestJson(questFile({ Conditions: [{ Type: 'Elimination' }] }));
            expect(result.ok && result.quest.Conditions[0]).toMatchObject({
                Type: 'Elimination',
                TargetCharacters: [],
                Amount: 1,
            });
        });

        it('backfills the arrays an Interaction condition is assumed to have', () => {
            const result = parseQuestJson(questFile({ Conditions: [{ Type: 'Interaction' }] }));
            expect(result.ok && result.quest.Conditions[0]).toMatchObject({ Type: 'Interaction', Locations: [] });
        });

        it('backfills a missing AcceptedItems inside an item group', () => {
            const file = questFile({ Conditions: [{ Type: 'Fetch', RequiredItems: [{ RequiredNum: 2 }] }] });
            const result = parseQuestJson(file);
            expect(result.ok).toBe(true);
            if (result.ok && result.quest.Conditions[0].Type === 'Fetch') {
                expect(result.quest.Conditions[0].RequiredItems[0]).toEqual({ AcceptedItems: [], RequiredNum: 2 });
            }
        });

        it('rejects a condition type the editor cannot model', () => {
            const result = parseQuestJson(questFile({ Conditions: [{ Type: 'Delivery' }] }));
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toContain('Condition #1');
                expect(result.error).toContain('"Delivery"');
            }
        });

        it('rejects a condition with no type at all', () => {
            const result = parseQuestJson(questFile({ Conditions: [{ SequenceIndex: 0 }] }));
            expect(result.ok).toBe(false);
            if (!result.ok) expect(result.error).toContain('nothing');
        });

        it('preserves fields it does not normalize', () => {
            const file = questFile({
                Conditions: [{ Type: 'Elimination', TargetCharacters: ['Deer'], TrackingCaption: 'Hunt' }],
            });
            const result = parseQuestJson(file);
            expect(result.ok && result.quest.Conditions[0].TrackingCaption).toBe('Hunt');
        });
    });

    it('reads the plural TradeDeals key the game writes', () => {
        const deals = [{ Item: 'C4', Price: 420 }];
        const result = parseQuestJson(questFile({ RewardPool: [{ TradeDeals: deals }] }));

        expect(result.ok && result.quest.RewardPool[0].TradeDeals).toEqual(deals);
    });

    describe('time limit', () => {
        it('keeps the value the file supplies', () => {
            const result = parseQuestJson(questFile({ TimeLimitHours: 12.5 }));
            expect(result.ok && result.quest.TimeLimitHours).toBe(12.5);
        });

        it.each([
            [1, 48],
            [2, 72],
            [3, 96],
        ])('backfills tier %s with %s hours when the file omits it', (Tier, expected) => {
            const result = parseQuestJson(questFile({ Tier, TimeLimitHours: undefined }));
            expect(result.ok && result.quest.TimeLimitHours).toBe(expected);
        });

        it('backfills from the corrected tier when the file tier is out of range', () => {
            const result = parseQuestJson(questFile({ Tier: 9, TimeLimitHours: undefined }));
            expect(result.ok && result.quest.TimeLimitHours).toBe(48);
        });
    });

    it('defaults an absent reward pool to a single empty reward', () => {
        const result = parseQuestJson(questFile({ RewardPool: undefined }));
        expect(result.ok && result.quest.RewardPool).toEqual([{}]);
    });
});
