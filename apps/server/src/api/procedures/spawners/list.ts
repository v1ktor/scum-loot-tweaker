import * as fs from 'node:fs';
import { SPAWNERS_DIR } from '../../../config/paths.ts';
import { publicProcedure } from '../../../connections/trpc/trpc.ts';

export const list = publicProcedure.query(() => {
    return fs.existsSync(SPAWNERS_DIR)
        ? fs
              .readdirSync(SPAWNERS_DIR)
              .filter((file) => file.endsWith('.json'))
              .sort()
        : [];
});
