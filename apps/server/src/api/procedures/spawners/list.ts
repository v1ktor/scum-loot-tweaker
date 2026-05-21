import * as fs from 'node:fs';
import path from 'node:path';
import { DATA_DIR } from '../../../config/paths.ts';
import { publicProcedure } from '../../../connections/trpc/trpc.ts';

export const list = publicProcedure.query(() => {
    const spawnersDir = path.join(DATA_DIR, 'Loot/Spawners/Presets/Default');

    return fs.existsSync(spawnersDir)
        ? fs
              .readdirSync(spawnersDir)
              .filter((file) => file.endsWith('.json'))
              .sort()
        : [];
});
