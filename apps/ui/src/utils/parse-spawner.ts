import { z } from 'zod';
import type { Spawner } from '@/pages/spawners/spawners.types.ts';
import { GetSpawnerSchema } from '../../../server/src/api/models/spawners/index.ts';

const ImportedSpawnerSchema = z.looseObject(GetSpawnerSchema.shape);

export type ParseSpawnerResult = { ok: true; spawner: Spawner } | { ok: false; error: string };

export function parseSpawnerJson(text: string): ParseSpawnerResult {
    let raw: unknown;

    try {
        raw = JSON.parse(text);
    } catch {
        return { ok: false, error: 'The file is not valid JSON' };
    }

    if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
        return { ok: false, error: 'Expected a JSON object with spawner settings' };
    }

    const result = ImportedSpawnerSchema.safeParse(raw);

    if (!result.success) {
        return { ok: false, error: z.prettifyError(result.error) };
    }

    return { ok: true, spawner: result.data as Spawner };
}
