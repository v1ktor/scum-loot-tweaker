import type { Condition, Quest, QuestType, Reward } from '@/data/quests/quests.types.ts';

export type QuestBody = Omit<Quest, 'id'>;

export type ParseQuestResult = { ok: true; quest: QuestBody } | { ok: false; error: string };

const QUEST_TYPES: readonly QuestType[] = ['Fetch', 'Elimination', 'Interaction'];

const isObject = (value: unknown): value is Record<string, unknown> =>
    value !== null && typeof value === 'object' && !Array.isArray(value);

const asArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

function normalizeCondition(raw: Record<string, unknown>, type: QuestType): Condition {
    const base = {
        ...raw,
        Type: type,
        SequenceIndex: typeof raw.SequenceIndex === 'number' ? raw.SequenceIndex : 0,
        LocationsShownOnMap: Array.isArray(raw.LocationsShownOnMap)
            ? (raw.LocationsShownOnMap as Condition['LocationsShownOnMap'])
            : undefined,
    };

    if (type === 'Fetch') {
        const groups = asArray(raw.RequiredItems)
            .filter(isObject)
            .map((group) => ({
                ...group,
                AcceptedItems: asArray(group.AcceptedItems).filter((item): item is string => typeof item === 'string'),
                RequiredNum: typeof group.RequiredNum === 'number' ? group.RequiredNum : 1,
            }));
        return { ...base, Type: 'Fetch', RequiredItems: groups } as Condition;
    }

    if (type === 'Elimination') {
        return {
            ...base,
            Type: 'Elimination',
            TargetCharacters: asArray(raw.TargetCharacters).filter((t): t is string => typeof t === 'string'),
            Amount: typeof raw.Amount === 'number' ? raw.Amount : 1,
        } as Condition;
    }

    const locations = asArray(raw.Locations)
        .filter(isObject)
        .map((location) => ({
            ...location,
            AnchorMesh: typeof location.AnchorMesh === 'string' ? location.AnchorMesh : '',
        }));
    return {
        ...base,
        Type: 'Interaction',
        Locations: locations,
        MinNeeded: typeof raw.MinNeeded === 'number' ? raw.MinNeeded : 1,
        MaxNeeded: typeof raw.MaxNeeded === 'number' ? raw.MaxNeeded : Math.max(1, locations.length),
    } as Condition;
}

const normalizeReward = (raw: unknown): Reward => (isObject(raw) ? (raw as Reward) : {});

export function parseQuestJson(text: string): ParseQuestResult {
    let raw: unknown;

    try {
        raw = JSON.parse(text);
    } catch {
        return { ok: false, error: 'The file is not valid JSON' };
    }

    if (!isObject(raw)) {
        return { ok: false, error: 'Expected a JSON object with a quest' };
    }

    const { id: _id, ...obj } = raw;

    if (typeof obj.Title !== 'string') {
        return { ok: false, error: 'Missing "Title" — this does not look like a quest file' };
    }
    if (typeof obj.AssociatedNPC !== 'string') {
        return { ok: false, error: 'Missing "AssociatedNPC"' };
    }

    const rawConditions = asArray(obj.Conditions);
    const conditions: Condition[] = [];
    for (const [index, entry] of rawConditions.entries()) {
        if (!isObject(entry)) {
            return { ok: false, error: `Condition #${index + 1} is not an object` };
        }
        const type = QUEST_TYPES.find((t) => t === entry.Type);
        if (!type) {
            const seen = typeof entry.Type === 'string' ? `"${entry.Type}"` : 'nothing';
            return {
                ok: false,
                error: `Condition #${index + 1} has an unsupported "Type" (${seen}) — expected Fetch, Elimination, or Interaction`,
            };
        }
        conditions.push(normalizeCondition(entry, type));
    }

    const rewardPool = asArray(obj.RewardPool).map(normalizeReward);

    const quest: QuestBody = {
        ...(obj as Omit<QuestBody, 'Tier' | 'RewardPool' | 'Conditions'>),
        Tier: obj.Tier === 2 || obj.Tier === 3 ? obj.Tier : 1,
        RewardPool: rewardPool.length > 0 ? rewardPool : [{}],
        Conditions: conditions,
    };

    return { ok: true, quest };
}
