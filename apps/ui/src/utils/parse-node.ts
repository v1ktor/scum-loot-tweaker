import { z } from 'zod';
import type { LootNode } from '@/pages/spawners/spawners.types.ts';
import { GetNodeSchema } from '../../../server/src/api/models/nodes/index.ts';

export type ParseNodeResult = { ok: true; node: LootNode } | { ok: false; error: string };

export function parseNodeJson(text: string): ParseNodeResult {
    let raw: unknown;

    try {
        raw = JSON.parse(text);
    } catch {
        return { ok: false, error: 'The file is not valid JSON' };
    }

    if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
        return { ok: false, error: 'Expected a JSON object with a loot node tree' };
    }

    const result = GetNodeSchema.safeParse(raw);

    if (!result.success) {
        return { ok: false, error: z.prettifyError(result.error) };
    }

    return { ok: true, node: result.data as LootNode };
}
