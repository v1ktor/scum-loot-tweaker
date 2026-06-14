import * as fs from 'node:fs';
import { NODES_DIR } from '../../../config/paths.ts';
import { publicProcedure } from '../../../connections/trpc/trpc.ts';

export const list = publicProcedure.query(() => {
    return fs.existsSync(NODES_DIR)
        ? fs
              .readdirSync(NODES_DIR)
              .filter((file) => file.endsWith('.json'))
              .sort()
        : [];
});
