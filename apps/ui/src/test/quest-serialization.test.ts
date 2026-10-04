import { describe, expect, it } from 'vitest';
import type { Condition, Quest } from '@/data/quests/quests.types.ts';
import { stripUnsupportedRewards, toGameQuest } from '@/pages/quests/quest-serialization.ts';
import { parseQuestJson } from '@/utils/parse-quest.ts';

const quest = (overrides: Partial<Quest> = {}): Quest => ({
    id: 'T1_RH_Fetch_Test',
    AssociatedNPC: 'Hunter',
    Tier: 1,
    Title: 'Test quest',
    TimeLimitHours: 48,
    RewardPool: [{}],
    Conditions: [],
    ...overrides,
});

const fetchCondition = (accepted: string[]): Condition => ({
    Type: 'Fetch',
    SequenceIndex: 0,
    RequiredItems: [{ AcceptedItems: accepted, RequiredNum: 1 }],
});

describe('toGameQuest', () => {
    it('strips the UI-only id', () => {
        expect(toGameQuest(quest())).not.toHaveProperty('id');
    });

    it('strips the UI-only condition uid', () => {
        const withUid = { ...fetchCondition(['Rag']), uid: 'abc' };
        const result = toGameQuest(quest({ Conditions: [withUid] }));
        expect(result.Conditions[0]).not.toHaveProperty('uid');
    });

    describe('fields the game parser requires to be present', () => {
        const elimination = (): Condition => ({
            Type: 'Elimination',
            SequenceIndex: 0,
            TargetCharacters: ['Deer'],
            Amount: 1,
        });
        const interaction = (): Condition => ({
            Type: 'Interaction',
            SequenceIndex: 0,
            Locations: [{ AnchorMesh: 'BP_Switch' }],
            MinNeeded: 1,
            MaxNeeded: 1,
        });

        it('writes Description even when the quest has none', () => {
            const { Description, ...rest } = quest();
            expect(toGameQuest(rest as Quest).Description).toBe('');
        });

        it.each([
            ['Fetch', fetchCondition(['Rag'])],
            ['Elimination', elimination()],
            ['Interaction', interaction()],
        ])('writes TrackingCaption and CanBeAutoCompleted on a bare %s condition', (_type, condition) => {
            const [written] = toGameQuest(quest({ Conditions: [condition] })).Conditions;
            expect(written).toMatchObject({ TrackingCaption: '', CanBeAutoCompleted: false });
        });

        it('writes both Fetch booleans', () => {
            const [written] = toGameQuest(quest({ Conditions: [fetchCondition(['Rag'])] })).Conditions;
            expect(written).toMatchObject({ DisablePurchaseOfRequiredItems: false, PlayerKeepsItems: false });
        });

        it('writes SpawnOnlyNeeded on an Interaction condition', () => {
            const [written] = toGameQuest(quest({ Conditions: [interaction()] })).Conditions;
            expect(written).toMatchObject({ SpawnOnlyNeeded: false });
        });

        it('matches the key set of the shipped Example_Elimination condition', () => {
            const [written] = toGameQuest(quest({ Conditions: [elimination()] })).Conditions;
            expect(Object.keys(written).sort()).toEqual(
                ['TrackingCaption', 'SequenceIndex', 'CanBeAutoCompleted', 'Type', 'TargetCharacters', 'Amount'].sort(),
            );
        });

        it('keeps values the user actually set', () => {
            const condition = { ...fetchCondition(['Rag']), TrackingCaption: 'Bring rags', PlayerKeepsItems: true };
            const [written] = toGameQuest(quest({ Conditions: [condition] })).Conditions;
            expect(written).toMatchObject({ TrackingCaption: 'Bring rags', PlayerKeepsItems: true });
        });

        it('leaves genuinely optional keys out', () => {
            const [written] = toGameQuest(quest({ Conditions: [elimination()] })).Conditions;
            expect(written).not.toHaveProperty('AllowedWeapons');
            expect(written).not.toHaveProperty('LocationsShownOnMap');
        });
    });

    describe('item rewards', () => {
        it('writes RewardItems the way the shipped Example_Elimination does', () => {
            const result = toGameQuest(
                quest({ RewardPool: [{ RewardItems: ['Weapon_M9', 'Magazine_M9'], Fame: 10 }] }),
            );

            expect(result.RewardPool[0]).toEqual({ RewardItems: ['Weapon_M9', 'Magazine_M9'], Fame: 10 });
        });

        it('drops blank reward item rows', () => {
            const result = toGameQuest(quest({ RewardPool: [{ RewardItems: ['', 'Weapon_M9', '  '] }] }));

            expect(result.RewardPool[0]).toEqual({ RewardItems: ['Weapon_M9'] });
        });

        it('omits RewardItems entirely when every row is blank', () => {
            const result = toGameQuest(quest({ RewardPool: [{ RewardItems: [''] }] }));

            expect(result.RewardPool[0]).not.toHaveProperty('RewardItems');
        });

        it('round-trips RewardItems through parse', () => {
            const exported = JSON.stringify(toGameQuest(quest({ RewardPool: [{ RewardItems: ['Weapon_M9'] }] })));
            const reparsed = parseQuestJson(exported);
            expect(reparsed.ok && reparsed.quest.RewardPool[0].RewardItems).toEqual(['Weapon_M9']);
        });

        it('never writes Blueprints either', () => {
            const result = toGameQuest(quest({ RewardPool: [{ Blueprints: ['Deer Skull Trophy'], Fame: 10 }] }));

            expect(result.RewardPool[0]).toEqual({ Fame: 10 });
        });
    });

    describe('trade deals', () => {
        const deals = [{ Item: 'C4', Price: 420 }];

        it('writes the plural TradeDeals key the game reads', () => {
            const result = toGameQuest(quest({ RewardPool: [{ TradeDeals: deals }] }));
            expect(result.RewardPool[0]).toEqual({ TradeDeals: deals });
        });

        it('omits the key entirely when every deal is blank', () => {
            const result = toGameQuest(quest({ RewardPool: [{ TradeDeals: [{ Item: '  ' }] }] }));
            expect(result.RewardPool[0]).not.toHaveProperty('TradeDeals');
        });

        it('round-trips through parse without losing the deals', () => {
            const exported = JSON.stringify(toGameQuest(quest({ RewardPool: [{ TradeDeals: deals }] })));
            const reparsed = parseQuestJson(exported);
            expect(reparsed.ok && reparsed.quest.RewardPool[0].TradeDeals).toEqual(deals);
        });
    });

    describe('dropping half-filled editor rows', () => {
        it('removes blank skill rows', () => {
            const skills = [{ Skill: '' as never, Experience: 0 }];
            expect(toGameQuest(quest({ RewardPool: [{ Skills: skills }] })).RewardPool[0]).not.toHaveProperty('Skills');
        });

        it('drops blank accepted items', () => {
            const result = toGameQuest(quest({ Conditions: [fetchCondition(['', 'Rag'])] }));
            expect(result.Conditions[0]).toMatchObject({ RequiredItems: [{ AcceptedItems: ['Rag'] }] });
        });

        it('drops a condition left with no content at all', () => {
            const result = toGameQuest(quest({ Conditions: [fetchCondition(['', ''])] }));
            expect(result.Conditions).toEqual([]);
        });

        it('keeps other reward pools that the editor cannot reach', () => {
            const result = toGameQuest(quest({ RewardPool: [{ Fame: 10 }, { CurrencyGold: 1 }] }));
            expect(result.RewardPool).toHaveLength(2);
            expect(result.RewardPool[1]).toEqual({ CurrencyGold: 1 });
        });
    });
});

describe('stripUnsupportedRewards', () => {
    it('drops Blueprints from every reward pool', () => {
        const stripped = stripUnsupportedRewards(
            quest({ RewardPool: [{ Fame: 5, Blueprints: ['Deer Skull Trophy'] }, { Blueprints: ['Hunter Bed'] }] }),
        );

        expect(stripped.RewardPool).toEqual([{ Fame: 5 }, {}]);
    });

    it('keeps RewardItems, which the game supports', () => {
        const stripped = stripUnsupportedRewards(
            quest({
                RewardPool: [{ RewardItems: ['Hunting_Quiver_01'], Blueprints: ['Hunter Bed'], CurrencyNormal: 100 }],
            }),
        );

        expect(stripped.RewardPool).toEqual([{ RewardItems: ['Hunting_Quiver_01'], CurrencyNormal: 100 }]);
    });

    it('leaves the rest of the quest alone', () => {
        const original = quest({ RewardPool: [{ Fame: 5, Blueprints: ['Deer Skull Trophy'] }] });
        const stripped = stripUnsupportedRewards(original);

        expect(stripped).toMatchObject({ id: original.id, Title: original.Title, Tier: original.Tier });
        expect(stripped.Conditions).toEqual(original.Conditions);
    });

    it('does not mutate the quest it is given', () => {
        const original = quest({ RewardPool: [{ Blueprints: ['Deer Skull Trophy'] }] });
        stripUnsupportedRewards(original);

        expect(original.RewardPool[0].Blueprints).toEqual(['Deer Skull Trophy']);
    });

    it('is a no-op for a quest without blueprint rewards', () => {
        const original = quest({ RewardPool: [{ Fame: 5 }] });

        expect(stripUnsupportedRewards(original).RewardPool).toEqual([{ Fame: 5 }]);
    });
});
