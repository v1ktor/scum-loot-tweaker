import { z } from 'zod';
import { TIME_LIMIT_HOURS_BY_TIER } from '@/data/quests/quest-defaults.ts';
import { QuestBodySchema } from '@/data/quests/quests.schema.ts';
import type { Quest } from '@/data/quests/quests.types.ts';

export type QuestBody = Omit<Quest, 'id'>;

export type ParseQuestResult = { ok: true; quest: QuestBody } | { ok: false; error: string };

const ImportedQuestSchema = QuestBodySchema.extend({ TimeLimitHours: z.number().optional() });

const isObject = (value: unknown): value is Record<string, unknown> =>
    value !== null && typeof value === 'object' && !Array.isArray(value);

type Spellings = { keys: Map<string, string>; values: Map<string, Map<string, string>> };

function collectSpellings(schema: z.core.$ZodType, spellings: Spellings, key?: string): Spellings {
    const def = schema._zod.def;
    switch (def.type) {
        case 'object':
            for (const [name, inner] of Object.entries((def as z.core.$ZodObjectDef).shape)) {
                spellings.keys.set(name.toLowerCase(), name);
                collectSpellings(inner, spellings, name);
            }
            break;
        case 'array':
            collectSpellings((def as z.core.$ZodArrayDef).element, spellings, key);
            break;
        case 'optional':
        case 'default':
        case 'catch':
            collectSpellings((def as z.core.$ZodOptionalDef).innerType, spellings, key);
            break;
        case 'pipe':
            collectSpellings((def as z.core.$ZodPipeDef).in, spellings, key);
            break;
        case 'union':
            for (const option of (def as z.core.$ZodUnionDef).options) collectSpellings(option, spellings, key);
            break;
        case 'enum':
        case 'literal': {
            if (!key) break;
            const allowed =
                def.type === 'enum'
                    ? Object.values((def as z.core.$ZodEnumDef).entries)
                    : (def as z.core.$ZodLiteralDef<z.core.util.Literal>).values;
            const lookup = spellings.values.get(key) ?? new Map<string, string>();
            for (const value of allowed) {
                if (typeof value === 'string') lookup.set(value.toLowerCase(), value);
            }
            spellings.values.set(key, lookup);
            break;
        }
    }
    return spellings;
}

const SPELLINGS = collectSpellings(QuestBodySchema, { keys: new Map(), values: new Map() });

function canonicalize(value: unknown): unknown {
    if (Array.isArray(value)) {
        return value.map(canonicalize);
    }
    if (!isObject(value)) {
        return value;
    }
    return Object.fromEntries(
        Object.entries(value).map(([rawKey, inner]) => {
            const key = SPELLINGS.keys.get(rawKey.toLowerCase()) ?? rawKey;
            const values = SPELLINGS.values.get(key);
            if (values && typeof inner === 'string') {
                return [key, values.get(inner.toLowerCase()) ?? inner];
            }
            return [key, canonicalize(inner)];
        }),
    );
}

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

    const result = ImportedQuestSchema.safeParse(canonicalize(raw));

    if (!result.success) {
        return { ok: false, error: z.prettifyError(result.error) };
    }

    const { TimeLimitHours, RewardPool, ...quest } = result.data;

    return {
        ok: true,
        quest: {
            ...quest,
            TimeLimitHours: TimeLimitHours ?? TIME_LIMIT_HOURS_BY_TIER[quest.Tier],
            RewardPool: RewardPool.length > 0 ? RewardPool : [{}],
        },
    };
}
